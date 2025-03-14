# Figma to Vue 개발 가이드

## 목차
1. 기능 중심 컴포넌트 구조
2. Figma에서 Vue 컴포넌트로 변환하기
3. 컴포넌트 개발 예시
4. 개발 협업 가이드라인
5. Tailwind CSS 설정 가이드
6. 스토리북 컴포넌트 파일 관리

## 기능 중심 컴포넌트 구조

기능 중심 컴포넌트 구조는 비즈니스 로직과 UI 요소를 기능 단위로 그룹화하여 관리하는 방식입니다. 이 방식은 실제 개발 과정에서 더 직관적이고 효율적입니다.

### 디렉토리 구조

```
src/
├── components/
│   ├── common/              # 공통 컴포넌트
│   │   ├── buttons/         # 버튼 관련 컴포넌트
│   │   ├── forms/           # 폼 관련 컴포넌트
│   │   ├── layout/          # 레이아웃 관련 컴포넌트
│   │   └── ui/              # 기타 UI 컴포넌트
│   │
│   ├── features/            # 기능별 컴포넌트
│   │   ├── auth/            # 인증 관련 기능
│   │   ├── dashboard/       # 대시보드 관련 기능
│   │   ├── products/        # 제품 관련 기능
│   │   └── ...
│   │
│   └── layouts/             # 페이지 레이아웃
│       ├── MainLayout.vue
│       └── AuthLayout.vue
│
├── composables/             # 재사용 가능한 로직
├── pages/                   # 페이지 컴포넌트
└── ...
```

### 컴포넌트 분류 기준

1. **공통 컴포넌트 (Common Components)**
   - 여러 기능에서 재사용되는 UI 요소
   - 예: Button, Input, Modal, Card 등

2. **기능별 컴포넌트 (Feature Components)**
   - 특정 기능이나 도메인에 관련된 컴포넌트
   - 해당 기능 내에서만 사용되는 컴포넌트
   - 예: LoginForm, ProductList, CheckoutSummary 등

3. **레이아웃 컴포넌트 (Layout Components)**
   - 페이지의 구조를 정의하는 컴포넌트
   - 예: MainLayout, SidebarLayout 등

4. **페이지 컴포넌트 (Page Components)**
   - 라우팅 대상이 되는 최상위 컴포넌트
   - 여러 기능 컴포넌트를 조합하여 구성

### 컴포넌트 네이밍 컨벤션

```
[기능영역][컴포넌트역할][변형].vue
```

예시:
- `AuthLoginForm.vue` - 인증 기능의 로그인 폼
- `ProductDetailCard.vue` - 제품 기능의 상세 정보 카드
- `CommonButtonPrimary.vue` - 공통 영역의 기본 버튼

## Figma에서 Vue 컴포넌트로 변환하기

### Figma에서 디자인 분석하기

1. **컴포넌트 식별**: Figma 디자인을 기능 중심으로 분석하고 컴포넌트를 식별합니다.
2. **스타일 추출**: 색상, 타이포그래피, 간격 등의 스타일 정보를 확인합니다.
3. **반응형 고려**: 다양한 화면 크기에서의 디자인 변화를 파악합니다.

### 스타일 시스템 구성하기

#### Tailwind CSS v4 설정

Tailwind CSS v4는 이전 버전과 달리 더 간소화된 설정 방식을 제공합니다. Vite 프로젝트에서는 다음과 같이 설정합니다:

1. **필요한 패키지 설치**:
```bash
npm install -D tailwindcss @tailwindcss/vite
```

2. **Vite 설정 파일 수정** (`vite.config.ts`):
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

3. **CSS 파일에 Tailwind 임포트** (`src/style.css`):
```css
@import "tailwindcss";

/* 기존 스타일 */
```

4. **CSS에서 테마 설정** (선택 사항):
```css
/* src/style.css */
@import "tailwindcss";

@theme {
  /* Figma에서 추출한 색상 */
  --color-primary: oklch(0.6 0.2 240);
  --color-secondary: oklch(0.9 0.03 240);
  
  /* Figma에서 추출한 폰트 */
  --font-display: "Pretendard", "sans-serif";
}
```

> **참고**: Tailwind CSS v4의 더 자세한 설정 및 기능에 대한 내용은 [tailwind-v4-guide.md](./tailwind-v4-guide.md) 문서를 참조하세요.

### Figma에서 코드로 변환하는 과정

1. **Inspect 기능 활용**: Figma의 Inspect 패널을 이용해 스타일 정보 확인
2. **컴포넌트 구조화**: 디자인을 기능 중심으로 분류
3. **프로퍼티 식별**: 컴포넌트에 필요한 props 결정
4. **스타일 적용**: Tailwind 클래스를 활용하여 스타일 구현

## 컴포넌트 개발 예시

Figma에서 디자인된 버튼 컴포넌트를 Vue 컴포넌트로 변환하는 예시:

### 1. 공통 버튼 컴포넌트

```typescript
<!-- src/components/common/buttons/Button.vue -->
<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
}>()

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
```

### 2. 인증 기능의 로그인 폼 컴포넌트

```typescript
<!-- src/components/features/auth/LoginForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/common/buttons/Button.vue'
import Input from '@/components/common/forms/Input.vue'

const username = ref('')
const password = ref('')

const handleLogin = () => {
  // 로그인 로직
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <Input
      v-model="username"
      label="사용자 이름"
      placeholder="사용자 이름을 입력하세요"
      required
    />
    <Input
      v-model="password"
      type="password"
      label="비밀번호"
      placeholder="비밀번호를 입력하세요"
      required
    />
    <Button variant="primary" fullWidth>로그인</Button>
  </form>
</template>
```

> **참고**: Storybook을 활용한 컴포넌트 문서화 및 테스트에 관한 내용은 [storybook-guide.md](./storybook-guide.md) 문서를 참조하세요.

## 개발 협업 가이드라인

### 1. 컴포넌트 개발 프로세스

1. **디자인 리뷰**: Figma 디자인을 검토하고 기능 중심으로 컴포넌트 분류
2. **컴포넌트 명세 작성**: 필요한 props, events, slots 정의
3. **구현 및 문서화**: 컴포넌트 구현 및 스토리북 작성
4. **리뷰 및 테스트**: 디자이너 및 다른 개발자와 함께 검토

### 2. 네이밍 컨벤션

- **파일명**: PascalCase (예: `Button.vue`, `ProductCard.vue`)
- **컴포넌트명**: PascalCase (예: `<Button>`, `<ProductCard>`)
- **props**: camelCase (예: `fullWidth`, `buttonSize`)
- **events**: camelCase (예: `@click`, `@valueChange`)
- **디렉토리명**: kebab-case (예: `common`, `feature-name`)

### 3. 코드 리뷰 체크리스트

- 컴포넌트가 기능 중심 구조에 맞게 구성되었는가?
- Figma 디자인과 일치하는가?
- 반응형 디자인이 적절히 구현되었는가?
- 접근성(Accessibility) 고려사항이 적용되었는가?
- TypeScript 타입이 정확히 정의되었는가?
- 컴포넌트 문서화(스토리북)가 작성되었는가?
- 컴포넌트의 재사용성과 확장성이 고려되었는가?

### 4. Figma-개발 협업 방법

- Figma 댓글 기능을 활용한 디자이너-개발자 간 소통
- 컴포넌트 구현 시 Figma의 Inspect 패널 활용
- 디자인 변경 사항은 Figma 버전 관리로 추적
- 개발된 컴포넌트는 스토리북 링크를 Figma 댓글에 공유하여 피드백 수집
- Figma 컴포넌트와 코드 컴포넌트 간의 매핑 문서 작성

### 5. 문서화 개선

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

### 6. 컴포넌트 분리 기준

- **재사용성**: 여러 기능에서 사용되는 UI 요소는 common 폴더에 배치
- **기능 응집도**: 특정 기능에만 사용되는 컴포넌트는 해당 기능 폴더에 배치
- **복잡성**: 컴포넌트가 너무 커지면 더 작은 단위로 분리
- **책임 분리**: 하나의 컴포넌트는 하나의 책임만 가지도록 설계

## 스토리북 컴포넌트 파일 관리

스토리북을 사용하면 컴포넌트 개발 시 일반적으로 `*.stories.ts`, `*.vue`, `*.css` 세 가지 파일이 생성됩니다. 이러한 파일들을 효율적으로 관리하는 방법에 대해 알아보겠습니다.

### 1. 권장 파일 구조

기능 중심 구조와 Tailwind CSS를 활용한 파일 구조를 권장합니다:

```
src/
├── components/              # 실제 애플리케이션 컴포넌트
│   ├── common/              # 공통 컴포넌트
│   │   ├── buttons/         # 버튼 관련 컴포넌트
│   │   │   └── Button.vue   # 실제 버튼 컴포넌트 (Tailwind 클래스 사용)
│   │   └── ...
│   └── features/            # 기능별 컴포넌트
│       └── ...
│
├── stories/                 # 스토리북 관련 파일
│   ├── common/              # 공통 컴포넌트 스토리
│   │   ├── buttons/         # 버튼 관련 스토리
│   │   │   └── Button.stories.ts  # 버튼 스토리
│   │   └── ...
│   └── features/            # 기능별 컴포넌트 스토리
│       └── ...
│
└── style.css                # Tailwind CSS 설정 및 테마
```

이 구조의 장점:
- 실제 애플리케이션 코드와 스토리북 코드가 명확히 분리됩니다.
- 컴포넌트 구조가 기능 중심으로 정리되어 관련 파일을 쉽게 찾을 수 있습니다.
- Tailwind CSS를 사용하면 별도의 CSS 파일이 필요 없어 파일 수가 줄어듭니다.

### 2. 스토리북 파일 구조화 규칙

#### 2.1. 스토리 파일 경로 매핑

스토리 파일의 경로를 실제 컴포넌트 경로와 일치시킵니다:

```typescript
// src/stories/common/buttons/Button.stories.ts
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../../../components/common/buttons/Button.vue';

const meta = {
  title: 'Common/Buttons/Button', // 경로와 일치하는 타이틀
  component: Button,
  // ...
} satisfies Meta<typeof Button>;
```

#### 2.2. 컴포넌트 문서화

스토리 파일에 컴포넌트 사용법과 예제를 자세히 문서화합니다:

```typescript
// src/stories/common/buttons/Button.stories.ts
const meta = {
  title: 'Common/Buttons/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '기본 버튼 컴포넌트입니다. 다양한 스타일과 크기를 지원합니다.',
      },
    },
    // Figma 디자인 연동
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...',
    },
  },
  // ...
};
```

#### 2.3. 다양한 상태 테스트

컴포넌트의 다양한 상태와 변형을 스토리로 정의합니다:

```typescript
// 기본 버튼 스토리
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary 버튼</Button>',
  }),
};

// Secondary 버튼 스토리
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  // ...
};

// 크기 변형 스토리
export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-col gap-4">
        <Button variant="primary" size="sm">Small 버튼</Button>
        <Button variant="primary" size="md">Medium 버튼</Button>
        <Button variant="primary" size="lg">Large 버튼</Button>
      </div>
    `,
  }),
};
```

### 3. 실제 적용 예시

Button 컴포넌트와 스토리를 기준으로 다음과 같이 관리합니다:

1. **실제 컴포넌트**: `src/components/common/buttons/Button.vue`
   ```vue
   <script setup lang="ts">
   /**
    * 기본 버튼 컴포넌트
    * 애플리케이션 전반에 걸쳐 일관된 버튼 스타일을 제공합니다.
    */
   defineProps<{
     variant?: 'primary' | 'secondary' | 'outline' | 'text'
     size?: 'sm' | 'md' | 'lg'
     disabled?: boolean
     fullWidth?: boolean
   }>()
   
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
           // ... 기타 스타일 클래스
         }
       ]"
       :disabled="disabled"
       @click="emits('click', $event)"
     >
       <slot></slot>
     </button>
   </template>
   ```

2. **스토리 파일**: `src/stories/common/buttons/Button.stories.ts`
   ```typescript
   import { fn } from '@storybook/test';
   import type { Meta, StoryObj } from '@storybook/vue3';
   import Button from '../../../components/common/buttons/Button.vue';
   
   const meta = {
     title: 'Common/Buttons/Button',
     component: Button,
     // ... 메타데이터
   } satisfies Meta<typeof Button>;
   
   export default meta;
   type Story = StoryObj<typeof meta>;
   
   export const Primary: Story = {
     // ... 스토리 정의
   };
   
   // ... 기타 스토리
   ```

3. **스타일**: Tailwind CSS 클래스를 직접 사용하고, 테마는 `src/style.css`에서 관리
   ```css
   /* src/style.css */
   @import "tailwindcss";
   
   @theme {
     --color-primary: oklch(0.6 0.2 240);
     --color-secondary: oklch(0.9 0.03 240);
     // ... 기타 테마 변수
   }
   ```

### 4. 스토리북 컴포넌트 관리 팁

1. **일관된 구조 유지**: 모든 컴포넌트와 스토리가 동일한 구조를 따르도록 합니다.
2. **문서화 강화**: JSDoc 주석을 사용하여 컴포넌트와 props를 자세히 문서화합니다.
3. **테스트 자동화**: `play` 함수를 사용하여 컴포넌트 동작을 자동으로 테스트합니다.
4. **디자인 연동**: 각 컴포넌트 스토리에 해당하는 Figma 디자인 링크를 추가합니다.
5. **테마 변형 테스트**: 다크 모드 등 다양한 테마에서 컴포넌트를 테스트합니다.

> **참고**: 스토리북 설정 및 고급 사용법에 대한 자세한 내용은 [storybook-guide.md](./storybook-guide.md) 문서를 참조하세요.