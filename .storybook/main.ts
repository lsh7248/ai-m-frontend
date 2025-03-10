import type { StorybookConfig } from '@storybook/vue3-vite';
import * as dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-designs',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  env: (config) => ({
    ...config,
    // 직접 환경 변수에서 토큰 가져오기 (프로세스 환경 변수에서 읽거나 없으면 하드코딩된 값 사용)
    STORYBOOK_FIGMA_ACCESS_TOKEN: process.env.STORYBOOK_FIGMA_ACCESS_TOKEN || '',
  }),
};
export default config;
