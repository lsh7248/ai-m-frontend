import { apiClient } from './api';
import type { StreamingOptions } from './types';
// import type { EventSourceListener } from './types';

/**
 * 채팅 메시지 타입
 */
export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

/**
 * AI 생성 응답 타입
 */
export interface AIGenerationResponse {
  id: string;
  chunk: string;
  isComplete: boolean;
}

/**
 * 알림 메시지 타입
 */
export interface NotificationMessage {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
}

/**
 * 스트리밍 API 서비스
 */
export const streamService = {
  /**
   * 채팅 스트림 구독
   * @param roomId 채팅방 ID
   * @param options 스트리밍 옵션
   * @returns 스트림 구독 관리 객체
   */
  subscribeToChatRoom(roomId: string, options: StreamingOptions = {}) {
    return apiClient.stream<ChatMessage>(`/chat/rooms/${roomId}/stream`, {
      onOpen: () => console.log(`Chat room ${roomId} stream opened`),
      onError: (error) => console.error(`Chat room stream error:`, error),
      onComplete: () => console.log(`Chat room ${roomId} stream completed`),
      ...options,
    });
  },

  /**
   * AI 텍스트 생성 스트림
   * @param prompt 생성 프롬프트
   * @param options 스트리밍 옵션
   * @returns 스트림 구독 관리 객체
   */
  streamAIGeneration(prompt: string, options: StreamingOptions = {}) {
    return apiClient.stream<AIGenerationResponse>(`/ai/generate`, {
      onComplete: () => console.log('AI generation completed'),
      ...options,
    });
  },

  /**
   * 알림 스트림 구독
   * @param options 스트리밍 옵션
   * @returns 스트림 구독 관리 객체
   */
  subscribeToNotifications(options: StreamingOptions = {}) {
    return apiClient.stream<NotificationMessage>(`/notifications/stream`, {
      onOpen: () => console.log('Notification stream opened'),
      ...options,
    });
  },

  /**
   * 사용자 지정 스트림 구독
   * @param url 스트림 엔드포인트 URL
   * @param options 스트리밍 옵션
   * @returns 스트림 구독 관리 객체
   */
  subscribeToCustomStream<T>(url: string, options: StreamingOptions = {}) {
    return apiClient.stream<T>(url, options);
  },

  /**
   * 모든 활성 스트림 연결 종료
   */
  disconnectAllStreams() {
    apiClient.disconnectAllStreams();
  },
};
