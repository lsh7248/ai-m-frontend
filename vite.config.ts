import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // GitHub Pages 배포를 위한 base 경로 설정
  // 개발 환경에서는 '/'를 사용하고, 프로덕션 환경에서는 '/demo/'를 사용
  base: process.env.NODE_ENV === 'production' ? '/demo/' : '/',
})
