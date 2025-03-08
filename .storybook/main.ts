import type { StorybookConfig } from '@storybook/vue3-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    '@storybook/addon-designs',
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  "viteFinal": async (config) => {
    // Tailwind CSS v4 Vite 플러그인 추가
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());
    
    return config;
  }
};
export default config;