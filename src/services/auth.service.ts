import { apiClient } from './api';
import type {
  User,
  JwtLoginRequest,
  LdapLoginRequest,
  JwtLoginResponse,
  LdapLoginResponse,
  // LoginResponse,  // 사용하지 않으므로 제거
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './types';

/**
 * 인증 관련 API 서비스
 */
export const authService = {
  /**
   * JWT 로그인
   * @param data JWT 로그인 요청 데이터
   * @returns 사용자 정보와 JWT 토큰
   */
  async jwtLogin(data: JwtLoginRequest): Promise<JwtLoginResponse> {
    return apiClient.post<JwtLoginResponse>('/auth/jwt/login', data);
  },

  /**
   * LDAP 로그인
   * @param data LDAP 로그인 요청 데이터
   * @returns 사용자 정보와 세션 토큰
   */
  async ldapLogin(data: LdapLoginRequest): Promise<LdapLoginResponse> {
    return apiClient.post<LdapLoginResponse>('/auth/ldap/login', data);
  },

  /**
   * JWT 토큰 갱신
   * @param refreshToken 리프레시 토큰
   * @returns 새로운 액세스 토큰과 리프레시 토큰
   */
  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return apiClient.post<RefreshTokenResponse>('/auth/refresh-token', data);
  },

  /**
   * 회원가입
   * @param data 회원가입 요청 데이터
   * @returns 생성된 사용자 정보
   */
  async register(data: RegisterRequest): Promise<User> {
    return apiClient.post<User>('/auth/register', data);
  },

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    return apiClient.post<void>('/auth/logout');
  },

  /**
   * 현재 로그인된 사용자 정보 조회
   * @returns 사용자 정보
   */
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  /**
   * 비밀번호 변경
   * @param oldPassword 기존 비밀번호
   * @param newPassword 새 비밀번호
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return apiClient.post<void>('/auth/change-password', { oldPassword, newPassword });
  },

  /**
   * 비밀번호 재설정 요청 (이메일 발송)
   * @param email 사용자 이메일
   */
  async requestPasswordReset(email: string): Promise<void> {
    return apiClient.post<void>('/auth/forgot-password', { email });
  },

  /**
   * 비밀번호 재설정
   * @param token 재설정 토큰
   * @param newPassword 새 비밀번호
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return apiClient.post<void>('/auth/reset-password', { token, newPassword });
  },

  /**
   * 인증 검사 (토큰/세션 유효성 확인)
   */
  async verifyAuthentication(): Promise<boolean> {
    try {
      await apiClient.get<void>('/auth/verify');
      return true;
    } catch (_error) {
      return false;
    }
  },
};
