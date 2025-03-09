import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { StreamingEvent, StreamingOptions, EventSourceListener } from './types';

// API 응답 타입 정의
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// 에러 타입 정의
interface ApiError {
  response?: {
    status?: number;
  };
}

// 인증 방식 타입
export enum AuthType {
  JWT = 'jwt',
  LDAP = 'ldap',
  NONE = 'none',
}

// 스트리밍 연결을 관리하는 클래스
class StreamingConnection<T> {
  private eventSource: EventSource | null = null;
  private listeners: Array<EventSourceListener<T>> = [];
  private url: string;
  private options: StreamingOptions;

  constructor(url: string, options: StreamingOptions = {}) {
    this.url = url;
    this.options = options;
  }

  connect(): void {
    // 기존 연결이 있으면 종료
    this.disconnect();

    // 인증 토큰이 있으면 URL에 추가 (EventSource는 헤더를 직접 설정할 수 없음)
    const token = localStorage.getItem('auth_token');
    const urlWithAuth = token
      ? `${this.url}${this.url.includes('?') ? '&' : '?'}token=${token}`
      : this.url;

    // 새 EventSource 생성
    this.eventSource = new EventSource(urlWithAuth);

    // 이벤트 핸들러 등록
    this.eventSource.onopen = () => {
      if (this.options.onOpen) {
        this.options.onOpen();
      }
    };

    this.eventSource.onerror = (error) => {
      if (this.options.onError) {
        this.options.onError(error);
      }
    };

    // 이벤트 리스너 등록
    this.eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const streamEvent: StreamingEvent<T> = {
          type: 'message',
          data: parsedData,
          id: event.lastEventId || undefined,
        };

        // 모든 리스너에게 이벤트 전달
        this.listeners.forEach((listener) => listener(streamEvent));
      } catch (error) {
        console.error('Failed to parse SSE data', error);
      }
    };

    // 사용자 정의 이벤트 리스너 설정
    this.eventSource.addEventListener('complete', () => {
      if (this.options.onComplete) {
        this.options.onComplete();
      }
      this.disconnect();
    });
  }

  addListener(listener: EventSourceListener<T>): () => void {
    this.listeners.push(listener);

    // 구독 취소용 함수 반환
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

class ApiClient {
  private client: AxiosInstance;
  private authType: AuthType = AuthType.NONE;
  private tokenKey: string = 'auth_token';
  private refreshTokenKey: string = 'refresh_token';
  private sessionIdKey: string = 'session_id';
  private activeStreams: Map<string, StreamingConnection<any>> = new Map();

  constructor(baseURL: string = import.meta.env.VITE_API_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(this.tokenKey);
        const sessionId = localStorage.getItem(this.sessionIdKey);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else if (sessionId) {
          config.headers['X-Session-ID'] = sessionId;
        }
        return config;
      },
      (error: unknown) => Promise.reject(error),
    );

    // 응답 인터셉터
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: unknown) => {
        const apiError = error as ApiError;

        // 토큰 만료 처리
        if (apiError.response?.status === 401 && this.authType === AuthType.JWT) {
          // JWT 토큰 갱신 시도
          const refreshToken = localStorage.getItem(this.refreshTokenKey);
          if (refreshToken) {
            try {
              const response = await this.refreshJwtToken(refreshToken);
              if (response.token) {
                localStorage.setItem(this.tokenKey, response.token);
                localStorage.setItem(this.refreshTokenKey, response.refreshToken);

                // 원래 요청 재시도
                const originalRequest = (error as any).config;
                originalRequest.headers.Authorization = `Bearer ${response.token}`;
                return this.client(originalRequest);
              }
            } catch (_refreshError) {
              // 리프레시 토큰도 만료됨 - 로그아웃 처리
              this.clearAuthData();
              window.location.href = '/login';
            }
          } else {
            // 리프레시 토큰 없음 - 로그아웃 처리
            this.clearAuthData();
            window.location.href = '/login';
          }
        } else if (apiError.response?.status === 401 && this.authType === AuthType.LDAP) {
          // LDAP 세션 만료 - 로그아웃 처리
          this.clearAuthData();
          window.location.href = '/login';
        } else if (apiError.response?.status === 403) {
          // 권한 에러 처리
          console.error('권한이 없습니다');
        } else if (apiError.response?.status === 500) {
          // 서버 에러 처리
          console.error('서버 에러가 발생했습니다');
        }

        return Promise.reject(error);
      },
    );
  }

  // JWT 토큰 설정
  setJwtAuth(token: string, refreshToken: string): void {
    this.authType = AuthType.JWT;
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  // LDAP 세션 설정
  setLdapAuth(token: string, sessionId: string): void {
    this.authType = AuthType.LDAP;
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.sessionIdKey, sessionId);
  }

  // 인증 정보 초기화
  clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.sessionIdKey);
    this.authType = AuthType.NONE;
  }

  // JWT 토큰 갱신 (내부용)
  private async refreshJwtToken(
    refreshToken: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const response = await this.client.post('/auth/refresh-token', { refreshToken });
    return response.data.data;
  }

  // GET 요청
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url, config);
    return response.data.data;
  }

  // POST 요청
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data, config);
    return response.data.data;
  }

  // PUT 요청
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data, config);
    return response.data.data;
  }

  // PATCH 요청
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.patch(url, data, config);
    return response.data.data;
  }

  // DELETE 요청
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(url, config);
    return response.data.data;
  }

  // 파일 업로드 요청
  async uploadFile<T>(url: string, file: File, config?: AxiosRequestConfig): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const uploadConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    };

    const response: AxiosResponse<ApiResponse<T>> = await this.client.post(
      url,
      formData,
      uploadConfig,
    );
    return response.data.data;
  }

  // 스트리밍 API 연결 (SSE)
  stream<T>(
    url: string,
    options: StreamingOptions = {},
  ): {
    addListener: (listener: EventSourceListener<T>) => () => void;
    disconnect: () => void;
  } {
    const fullUrl = this.getFullUrl(url);

    // 기존 스트림이 있는지 확인
    let connection = this.activeStreams.get(fullUrl) as StreamingConnection<T>;

    if (!connection) {
      // 새 스트림 연결 생성
      connection = new StreamingConnection<T>(fullUrl, options);
      this.activeStreams.set(fullUrl, connection);
      connection.connect();
    }

    // 리스너 추가 및 구독 취소 함수 반환
    return {
      addListener: (listener: EventSourceListener<T>) => {
        return connection.addListener(listener);
      },
      disconnect: () => {
        connection.disconnect();
        this.activeStreams.delete(fullUrl);
      },
    };
  }

  // 모든 스트리밍 연결 종료
  disconnectAllStreams(): void {
    this.activeStreams.forEach((connection) => {
      connection.disconnect();
    });
    this.activeStreams.clear();
  }

  // 전체 URL 생성
  private getFullUrl(url: string): string {
    if (url.startsWith('http')) {
      return url;
    }

    const baseUrl = this.client.defaults.baseURL || '';
    return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  }
}

// API 클라이언트 인스턴스 생성 및 내보내기
export const apiClient = new ApiClient();
