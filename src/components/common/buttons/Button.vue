<script setup lang="ts">
/**
 * 기본 버튼 컴포넌트
 * 애플리케이션 전반에 걸쳐 일관된 버튼 스타일을 제공합니다.
 * Tailwind CSS v4를 사용하여 스타일링되었습니다.
 */
defineProps<{
  /**
   * 버튼의 스타일 변형
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  /**
   * 버튼의 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * 버튼의 비활성화 상태
   * @default false
   */
  disabled?: boolean
  /**
   * 버튼의 전체 너비 적용 여부
   * @default false
   */
  fullWidth?: boolean
}>()

/**
 * 버튼 클릭 이벤트
 */
const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      {
        'bg-primary text-white hover:bg-primary/90': variant === 'primary',
        'bg-secondary text-gray-800 hover:bg-secondary/80': variant === 'secondary',
        'border border-primary text-primary hover:bg-primary/10': variant === 'outline',
        'text-primary hover:bg-primary/10': variant === 'text',
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
        'opacity-50 cursor-not-allowed': disabled,
        'w-full': fullWidth,
      }
    ]"
    :disabled="disabled"
    @click="emits('click', $event)"
  >
    <slot></slot>
  </button>
</template> 