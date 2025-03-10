import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // Vue 플러그인을 Tailwind CSS 플러그인보다 먼저 실행하여
  // Vue 파일을 우선 처리하도록 합니다.
  // 플러그인 순서가 중요: vue() 플러그인이 .vue 파일을 처리한 후에
  // tailwindcss() 플러그인이 CSS를 처리합니다.
  plugins: [vue(), tailwindcss()],
});
