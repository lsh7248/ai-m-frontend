// 사용자 관련 타입
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// JWT 인증 관련 타입
export interface JwtLoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface JwtLoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// LDAP 인증 관련 타입
export interface LdapLoginRequest {
  username: string;
  password: string;
  domain: string;
}

export interface LdapLoginResponse {
  user: User;
  token: string;
  sessionId: string;
}

// 공통 인증 타입
export type LoginRequest = JwtLoginRequest | LdapLoginRequest;
export type LoginResponse = JwtLoginResponse | LdapLoginResponse;

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

// 토큰 갱신 타입
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// 스트리밍 API 관련 타입
export interface StreamingEvent<T> {
  type: string;
  data: T;
  id?: string;
  retry?: number;
}

export type EventSourceListener<T> = (event: StreamingEvent<T>) => void;

export interface StreamingOptions {
  onOpen?: () => void;
  onError?: (error: Event) => void;
  onComplete?: () => void;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}
