# Storybook 활용 가이드

## 목차
1. Storybook 기본 활용법
2. 컴포넌트 스토리 작성 예시 (최신 8.6 버전)
3. Figma 디자인과 스토리북 연동
4. Storybook 8.6 설정 및 사용법
5. Tailwind CSS v4와 Storybook 통합
6. 복잡한 컴포넌트 스토리 작성
7. 다크 모드 지원
8. 액션 및 이벤트 테스트 (fn 함수 활용)
9. Storybook 사용 팁

## Storybook 기본 활용법

Storybook은 컴포넌트 개발 및 문서화를 위한 도구로, UI 컴포넌트를 독립적으로 개발하고 테스트할 수 있는 환경을 제공합니다. Figma 디자인을 코드로 구현한 후 Storybook을 통해 문서화하면 디자이너와 개발자 간의 협업이 원활해집니다.

### Storybook 설치

```bash
# 프로젝트에 Storybook 추가
npx storybook@latest init
```

## 컴포넌트 스토리 작성 예시 (최신 8.6 버전)

Storybook 8.6에서는 `fn` 함수를 사용하여 이벤트와 액션을 테스트할 수 있습니다. 아래는 최신 버전의 Button 컴포넌트 스토리 작성 예시입니다:

```typescript
// src/stories/Button.stories.ts
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import Button from './Button.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    backgroundColor: { control: 'color' },
  },
  args: {
    primary: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
```

### fn 함수를 활용한 이벤트 테스트

Storybook 8.6에서는 `@storybook/test` 패키지의 `fn` 함수를 사용하여 컴포넌트의 이벤트와 액션을 모니터링하고 테스트할 수 있습니다. 이 함수는 모의 함수(mock function)를 생성하여 컴포넌트의 이벤트 핸들러로 전달됩니다.

```typescript
import { fn } from '@storybook/test';

// meta 객체 내에서 사용
args: {
  // fn()은 이벤트가 발생할 때 Actions 패널에 표시됩니다
  onClick: fn(),
}
```

이렇게 설정하면 Storybook UI의 Actions 패널에서 이벤트 발생 여부와 전달된 인자를 확인할 수 있습니다.

## Figma 디자인과 스토리북 연동

Storybook의 addon-designs를 사용하여 컴포넌트와 Figma 디자인을 연동하는 방법:

```typescript
// Button.stories.ts에 Figma 디자인 연동
import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Figma 디자인 연동
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...', // Figma 파일 URL
    },
  },
  // 나머지 설정...
} satisfies Meta<typeof Button>;

// 개별 스토리에 다른 Figma 디자인 연결
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: '기본 버튼',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/.../node-id?node-id=123', // 특정 노드 ID
    },
  },
};
```

## Storybook 8.6 설정 및 사용법

Storybook 8.6은 이전 버전과 문법이 다소 다르므로 아래 가이드를 참고하세요.

### Figma 디자인 연동을 위한 애드온 설치

```bash
# Storybook 애드온 설치 시 legacy-peer-deps 옵션 사용
npm install -D @storybook/addon-designs --legacy-peer-deps
```

### 설정 파일 구성

`.storybook/main.ts` 파일에 다음과 같이 설정:

```typescript
import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-designs", // Figma 디자인 연동 애드온
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
```

## Tailwind CSS v4와 Storybook 통합

Tailwind CSS v4는 이전 버전과 달리 설정 방식이 크게 변경되었으며, Storybook과 통합할 때도 몇 가지 추가 설정이 필요합니다.

### 1. Tailwind CSS v4 설치 및 기본 설정

먼저 프로젝트에 Tailwind CSS v4를 설치합니다:

```bash
npm install -D tailwindcss
```

### 2. Storybook에 Tailwind CSS 적용하기

Storybook에서 Tailwind CSS를 사용하기 위해서는 `.storybook/preview.ts` 파일에 Tailwind CSS 스타일 파일을 가져오기만 하면 됩니다:

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/vue3'
import '../src/style.css' // Tailwind CSS 스타일 파일 경로

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> **중요**: `.storybook/main.ts` 파일에 `viteFinal` 설정이나 `@tailwindcss/vite` 임포트를 추가하지 마세요. 이는 에러를 발생시킬 수 있습니다.

### 3. 테마 전환 기능 추가 (선택 사항)

다크 모드와 라이트 모드 간 전환을 지원하려면 `@storybook/addon-themes` 애드온을 설치하고 설정합니다:

```bash
npm install -D @storybook/addon-themes
```

`.storybook/preview.ts` 파일에 테마 전환 기능을 추가합니다:

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/vue3'
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/style.css'

const preview: Preview = {
  parameters: {
    // 기존 설정...
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-mode',
    }),
  ],
};

export default preview;
```

### 4. Tailwind CSS v4 CSS-first 테마 설정

Tailwind CSS v4에서는 CSS-first 접근 방식을 사용하여 테마를 설정합니다. `src/style.css` 파일에 다음과 같이 설정합니다:

```css
/* src/style.css */
@import "tailwindcss";

@theme {
  /* 색상 */
  --color-primary: oklch(0.6 0.2 240);
  --color-secondary: oklch(0.9 0.03 240);
  
  /* 폰트 */
  --font-sans: "Inter", sans-serif;
  --font-display: "Satoshi", "sans-serif";
  
  /* 타이포그래피 */
  --text-heading-1: 2.5rem;
  --text-heading-1--line-height: 3rem;
  
  /* 간격 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}
```

### 5. 문제 해결

Storybook에서 Tailwind CSS 스타일이 적용되지 않는 경우 다음을 확인하세요:

1. `preview.ts` 파일에 스타일 파일이 올바르게 가져와졌는지 확인
2. Storybook 서버를 재시작하여 변경 사항이 적용되었는지 확인
3. 브라우저 개발자 도구에서 CSS 변수가 제대로 정의되었는지 확인
4. `@tailwindcss/vite` 플러그인을 사용하지 않도록 주의하세요 - 이는 Storybook과 호환성 문제를 일으킬 수 있습니다

## 복잡한 컴포넌트 스토리 작성

헤더 컴포넌트처럼 여러 상태를 가진 복잡한 컴포넌트의 스토리 작성:

```typescript
// src/stories/Header.stories.ts
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import MyHeader from './Header.vue';

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/Header',
  component: MyHeader,
  render: (args: any) => ({
    components: { MyHeader },
    setup() {
      return { args };
    },
    template: '<my-header :user="args.user" />',
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // 이벤트 핸들러에 fn() 함수 사용
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof MyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {
  args: {
    user: null,
  },
};
```

### 커스텀 렌더링 함수 활용

Storybook 8.6에서는 `render` 속성을 사용하여 컴포넌트의 렌더링 방식을 커스터마이징할 수 있습니다. 이는 복잡한 컴포넌트나 특별한 렌더링 로직이 필요한 경우에 유용합니다.

```typescript
render: (args: any) => ({
  components: { MyComponent },
  setup() {
    return { args };
  },
  template: '<my-component :prop1="args.prop1" :prop2="args.prop2" />',
})
```

## 페이지 컴포넌트 스토리 작성 및 테스트

페이지 컴포넌트와 같은 복잡한 컴포넌트의 스토리 작성 및 테스트 방법:

```typescript
// src/stories/Page.stories.ts
import { fn } from '@storybook/test';
import { within, userEvent, expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import MyPage from './Page.vue';

const meta = {
  title: 'Example/Page',
  component: MyPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  render: (args: any) => ({
    components: { MyPage },
    setup() {
      return { args };
    },
    template: '<my-page />',
  }),
} satisfies Meta<typeof MyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 페이지 스토리
export const LoggedOut: Story = {};

// 로그인 상태 스토리 (테스트 포함)
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await userEvent.click(loginButton);
  },
};
```

## GitHub Pages를 통한 Storybook 배포

프로젝트의 Storybook은 GitHub Pages를 통해 자동으로 배포되어 팀원들이 언제든지 최신 컴포넌트를 확인할 수 있습니다.

### 배포 URL 및 접근 방법

현재 프로젝트의 Storybook은 다음 URL에서 확인할 수 있습니다:
- **배포 URL**: [https://urban-guacamole-2n4qprz.pages.github.io/](https://urban-guacamole-2n4qprz.pages.github.io/)

### 배포 프로세스

- **자동 배포**: main 브랜치에 변경사항이 푸시되면 GitHub Actions를 통해 자동으로 배포됩니다.
- **배포 확인**: GitHub 저장소의 "Actions" 탭과 "Environments" 섹션에서 배포 상태를 확인할 수 있습니다.

### 개발자 워크플로우

1. **컴포넌트 개발**: 로컬에서 컴포넌트 개발 및 스토리 작성
2. **로컬 테스트**: `npm run storybook`으로 로컬에서 테스트
3. **코드 푸시**: 변경사항을 main 브랜치에 푸시
4. **자동 배포**: GitHub Actions가 자동으로 Storybook을 빌드하고 배포
5. **배포 확인**: 배포된 URL에서 컴포넌트 확인 및 공유

### 협업 팁

- 컴포넌트 리뷰가 필요할 때 배포된 Storybook URL을 공유하세요.
- Figma 디자인과 함께 Storybook 링크를 제공하면 디자이너와의 협업이 원활해집니다.
- 컴포넌트 변경 시 항상 관련 스토리를 업데이트하여 문서화를 최신 상태로 유지하세요.

## 인터랙션 테스트 (play 함수)

Storybook 8.6에서는 `play` 함수를 사용하여 사용자 인터랙션을 시뮬레이션하고 테스트할 수 있습니다. 이 기능은 컴포넌트의 동작을 자동화된 방식으로 검증하는 데 유용합니다.

```typescript
play: async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  // step 함수를 사용하여 테스트 단계 구분
  await step('버튼 클릭', async () => {
    const button = canvas.getByRole('button', { name: /Click me/i });
    await userEvent.click(button);
  });
  
  // 상태 변화 확인
  await step('상태 확인', async () => {
    const result = canvas.getByText('Clicked!');
    await expect(result).toBeInTheDocument();
  });
}
```

// 자동화된 인터랙션 테스트 예시
export const LoggedInWithTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    
    // 단계별 테스트 실행
    await step('로그인 버튼 클릭', async () => {
      const loginButton = canvas.getByRole('button', { name: /Log in/i });
      await userEvent.click(loginButton);
    });
    
    await step('로그인 상태 확인', async () => {
      const logoutButton = canvas.getByRole('button', { name: /Log out/i });
      await expect(logoutButton).toBeInTheDocument();
    });
  },
};

## 다크 모드 지원

다양한 테마에서 컴포넌트 확인:

```typescript
// .storybook/preview.ts
import type { Preview } from "@storybook/vue3";
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    // 기본 설정...
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-mode',
    }),
    // 글로벌 데코레이터 추가
    (story) => ({
      components: { story },
      template: '<div class="p-4"><story /></div>',
    }),
  ],
};

export default preview;
```

## 액션 및 이벤트 테스트 (fn 함수 활용)

Storybook 8.6에서는 `@storybook/test` 패키지의 `fn` 함수를 사용하여 컴포넌트의 이벤트와 액션을 모니터링하고 테스트할 수 있습니다.

### fn 함수 기본 사용법

```typescript
import { fn } from '@storybook/test';

const meta = {
  // ...
  args: {
    onClick: fn(),
    onSubmit: fn(),
    onInputChange: fn(),
  },
} satisfies Meta<typeof MyComponent>;
```

### fn 함수와 play 함수 조합하기

`fn` 함수와 `play` 함수를 조합하여 이벤트 발생 여부와 전달된 인자를 검증할 수 있습니다.

```typescript
import { fn } from '@storybook/test';
import { within, userEvent, expect } from '@storybook/test';

const onSubmit = fn();

export const FormSubmission: Story = {
  args: {
    onSubmit,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 폼 입력
    const nameInput = canvas.getByLabelText('Name');
    await userEvent.type(nameInput, 'John Doe');
    
    // 제출 버튼 클릭
    const submitButton = canvas.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitButton);
    
    // onSubmit 함수가 호출되었는지 확인
    await expect(onSubmit).toHaveBeenCalled();
    
    // 전달된 인자 확인
    await expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'John Doe' })
    );
  },
};
```

## 문서화 개선

컴포넌트 타입과 설명을 강화한 문서 생성:

```typescript
// Button.vue에 JSDoc 주석 추가
<script lang="ts" setup>
/**
 * 기본 버튼 컴포넌트
 * 애플리케이션 전반에 걸쳐 일관된 버튼 스타일 제공
 */
const props = withDefaults(defineProps<{
  /**
   * 버튼에 표시할 텍스트
   */
  label: string,
  /**
   * 버튼 스타일 (primary, secondary)
   */
  primary?: boolean,
  /**
   * 버튼 크기 (small, medium, large)
   */
  size?: 'small' | 'medium' | 'large',
  /**
   * 버튼 배경색
   */
  backgroundColor?: string,
}>(), { primary: false });
</script>
```

## Storybook 사용 팁

1. **컴포넌트 문서화**: 각 컴포넌트는 스토리를 통해 문서화합니다.
2. **컴포넌트 테스트**: 다양한 상태와 props 조합을 스토리로 정의하여 테스트합니다.
3. **디자인 시스템 구축**: Atomic Design의 각 레벨을 스토리북 카테고리로 구성합니다.
4. **fn 함수 활용**: 이벤트 핸들러에 `fn()` 함수를 사용하여 액션을 모니터링합니다.
5. **step 함수 활용**: 복잡한 테스트를 단계별로 구분하여 가독성을 높입니다.
6. **컴포넌트 개발 워크플로우**:
   - Figma 디자인 검토
   - 컴포넌트 구현
   - 스토리북에 문서화 및 테스트 작성
   - 리뷰 및 피드백

## Figma와 Storybook 연계 활용

1. **디자인 리뷰**: Figma 디자인을 검토하고 Atomic Design 관점에서 컴포넌트 분류
2. **컴포넌트 구현**: Vue 컴포넌트로 구현
3. **스토리북 문서화**: 구현된 컴포넌트를 스토리북에 등록하고 Figma 디자인 연결
4. **인터랙션 테스트**: `play` 함수와 `fn` 함수를 활용하여 컴포넌트 동작 검증
5. **피드백 수집**: 스토리북 링크를 Figma 댓글에 공유하여 디자이너로부터 피드백 수집
6. **반복 개선**: 피드백을 반영하여 컴포넌트 개선