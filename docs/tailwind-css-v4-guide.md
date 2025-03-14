# Tailwind CSS v4 설정 가이드

## 목차

1. [소개](#소개)
2. [주요 변경 사항](#주요-변경-사항)
3. [설치 및 설정](#설치-및-설정)
4. [CSS-first 테마 설정](#css-first-테마-설정)
5. [DaisyUI 5.0 통합](#daisyui-5.0-통합)
6. [Figma 디자인 시스템 통합](#figma-디자인-시스템-통합)
7. [Vue 컴포넌트에 Tailwind CSS 적용](#vue-컴포넌트에-tailwind-css-적용)
8. [고급 기능](#고급-기능)
9. [문제 해결](#문제-해결)

## 소개

Tailwind CSS v4는 성능과 유연성을 위해 최적화된 새로운 버전으로, 설정 및 커스터마이징 경험을 재구성하고 최신 웹 플랫폼의 발전을 최대한 활용합니다. 이 가이드는 Tailwind CSS v4를 Vue 3 및 Vite 프로젝트에 통합하는 방법을 설명합니다.

## 주요 변경 사항

Tailwind CSS v4는 이전 버전과 비교하여 다음과 같은 주요 변경 사항이 있습니다:

- **고성능 엔진**: 전체 빌드는 최대 5배 빠르고, 증분 빌드는 100배 이상 빠릅니다.
- **간소화된 설치**: 의존성이 적고, 설정이 필요 없으며, CSS 파일에 한 줄의 코드만 추가하면 됩니다.
- **Vite 플러그인**: 최대 성능과 최소 설정을 위한 공식 Vite 플러그인을 제공합니다.
- **자동 콘텐츠 감지**: 모든 템플릿 파일이 자동으로 감지되어 설정이 필요 없습니다.
- **CSS-first 설정**: JavaScript 설정 파일 대신 CSS에서 직접 프레임워크를 커스터마이징합니다.
- **CSS 테마 변수**: 모든 디자인 토큰이 네이티브 CSS 변수로 노출되어 어디서든 접근할 수 있습니다.
- **P3 색상 팔레트**: 현대적인 디스플레이 기술을 최대한 활용하는 더 생생한 색상 팔레트를 제공합니다.
- **컨테이너 쿼리**: 컨테이너 크기에 따라 요소 스타일을 지정하는 기능을 제공합니다.

## 설치 및 설정

### 1. 패키지 설치

```bash
npm install -D tailwindcss @tailwindcss/vite
```

### 2. Vite 설정 파일 수정

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
});
```

### 3. CSS 파일에 Tailwind 임포트

```css
/* src/style.css */
@import 'tailwindcss';

/* 기존 스타일 */
```

이 간단한 설정만으로 Tailwind CSS v4의 모든 기능을 사용할 수 있습니다. 이전 버전과 달리 `postcss.config.js` 파일이나 `tailwind.config.js` 파일이 필요하지 않습니다.

## CSS-first 테마 설정

Tailwind CSS v4에서는 CSS에서 직접 테마를 구성하는 것이 권장됩니다:

```css
/* src/style.css */
@import 'tailwindcss';

@theme {
  /* 색상 */
  --color-primary: oklch(0.6 0.2 240);
  --color-secondary: oklch(0.9 0.03 240);
  --color-accent: oklch(0.8 0.2 30);

  /* 폰트 */
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Satoshi', 'sans-serif';
  --font-mono: 'IBM Plex Mono', monospace;

  /* 타이포그래피 */
  --text-tiny: 0.625rem;
  --text-tiny--line-height: 1.5rem;

  /* 간격 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* 브레이크포인트 */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  --breakpoint-3xl: 1920px;

  /* 애니메이션 */
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
}
```

각 CSS 변수는 네임스페이스에 따라 해당 유틸리티와 연결됩니다:

- `--font-*`: 폰트 패밀리 유틸리티 (`font-sans`, `font-display` 등)
- `--text-*`: 폰트 크기 유틸리티 (`text-tiny`, `text-sm` 등)
- `--color-*`: 색상 유틸리티 (`text-primary`, `bg-secondary` 등)
- `--spacing-*`: 간격 유틸리티 (`p-xs`, `m-sm` 등)
- `--breakpoint-*`: 반응형 브레이크포인트 (`sm:`, `md:` 등)
- `--ease-*`: 전환 타이밍 함수 (`ease-fluid`, `ease-snappy` 등)

### CSS 변수 사용의 이점

이 방식을 사용하면 테마 값을 CSS 변수로 직접 접근할 수 있어 다음과 같은 이점이 있습니다:

1. **임의 값에서 테마 변수 직접 사용**:

   ```html
   <div class="p-[var(--spacing-sm)] text-[var(--color-primary)]">...</div>
   ```

2. **JavaScript에서 테마 값 접근**:

   ```javascript
   element.style.marginTop = 'var(--spacing-sm)';
   ```

3. **프레임워크 통합 용이**:
   ```jsx
   // Framer Motion 예시
   <motion.div
     initial={{ y: 'var(--spacing-md)' }}
     animate={{ y: 0 }}
     exit={{ y: 'var(--spacing-md)' }}
   >
     {children}
   </motion.div>
   ```

### 기본 테마 재정의

기본적으로 CSS 변수를 추가하면 Tailwind CSS v3의 `extend`처럼 동작합니다. 전체 네임스페이스를 재정의하려면 `--font-*: initial`과 같은 구문을 사용합니다:

```css
@theme {
  /* 기본 폰트 패밀리 유틸리티를 모두 제거 */
  --font-*: initial;

  /* 새로운 폰트 패밀리 유틸리티만 정의 */
  --font-display: 'Satoshi', 'sans-serif';
  --font-body: 'Inter', sans-serif;
}
```

전체 기본 테마를 제거하려면 `--*: initial`을 사용합니다:

```css
@theme {
  --*: initial;

  /* 이제 모든 테마 값을 직접 정의해야 합니다 */
}
```

### 폰트 크기 유틸리티 설정

폰트 크기에 대한 기본 행 높이, 폰트 두께 또는 자간을 설정하려면 이중 대시를 사용하여 지원 변수를 추가합니다:

```css
@theme {
  --text-big: 16rem;
  --text-big--line-height: 18rem;
  --text-big--font-weight: 550;
  --text-big--letter-spacing: -0.025em;
}
```

## DaisyUI 5.0 통합

DaisyUI는 Tailwind CSS의 컴포넌트 라이브러리로, 미리 디자인된 UI 컴포넌트를 제공합니다. 본 프로젝트에서는 다음과 같은 우선순위로 UI 개발을 진행합니다:

1. **Figma 디자인 우선**: UI 디자이너가 Figma에서 제공하는 디자인을 최우선으로 구현합니다.
2. **DaisyUI 보조적 활용**: 개발 편의성을 위해 필요한 경우에만 DaisyUI 컴포넌트를 선택적으로 활용합니다.

### Tailwind CSS v4와 DaisyUI v5.0의 역할

#### Tailwind CSS v4의 역할

- **저수준 유틸리티 클래스 제공**: 개별 CSS 속성을 제어하는 클래스 제공 (예: `p-4`, `text-lg`, `flex`)
- **디자인 시스템 기반 구축**: CSS 변수를 통한 테마 설정 및 디자인 토큰 관리
- **레이아웃 및 간격 제어**: 그리드, 플렉스박스, 마진, 패딩 등의 레이아웃 관련 유틸리티 제공

#### DaisyUI v5.0의 보조적 역할

- **개발 생산성 향상**: 반복적인 UI 패턴을 빠르게 구현할 수 있는 컴포넌트 클래스 제공
- **일관된 상호작용 패턴**: 모달, 드롭다운 등 상호작용이 필요한 컴포넌트의 기본 구조 제공
- **테마 시스템**: 다크 모드 등 테마 전환 기능 지원

### 1. DaisyUI 5.0 설치

```bash
npm install -D daisyui@latest
```

### 2. CSS 파일에 DaisyUI 추가

Tailwind CSS v4의 CSS-first 접근 방식에 맞춰 DaisyUI도 CSS에서 직접 구성합니다:

```css
/* src/style.css */
@import 'tailwindcss';
@plugin "daisyui";

/* 기존 스타일 */
```

특정 테마를 활성화하려면:

```css
/* src/style.css */
@import 'tailwindcss';
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
}

/* 기존 스타일 */
```

### 3. UI 디자이너와의 협업 방식

프로젝트 진행 시 UI 디자이너와의 효과적인 협업을 위한 방법:

1. **디자인 시스템 공유**: UI 디자이너에게 Tailwind CSS와 DaisyUI를 사용하고 있음을 알리고, 디자인 시스템 토큰(색상, 간격, 타이포그래피 등)을 공유합니다.
2. **컴포넌트 라이브러리 소개**: DaisyUI에서 제공하는 주요 컴포넌트를 UI 디자이너에게 소개하여 디자인 과정에서 참고할 수 있도록 합니다.
3. **디자인 피드백 제공**: 구현 과정에서 발생할 수 있는 기술적 제약사항이나 개선점을 디자이너에게 피드백합니다.

### 4. Figma 디자인 구현 전략

Figma 디자인을 코드로 구현할 때 다음 전략을 사용합니다:

1. **Figma 디자인 충실 구현**: 기본적으로 Figma 디자인을 Tailwind CSS 유틸리티 클래스를 사용하여 충실히 구현합니다.
2. **DaisyUI 선택적 활용**: 개발 효율성을 위해 필요한 경우에만 DaisyUI 컴포넌트를 활용합니다.
3. **디자이너 의도 존중**: DaisyUI 컴포넌트를 사용하더라도 디자이너의 의도를 최대한 반영하도록 커스터마이징합니다.

#### 예시: 버튼 컴포넌트

Figma 디자인을 충실히 구현하는 경우:

```html
<!-- Figma 디자인에 따른 Tailwind CSS 구현 -->
<button
  class="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
>
  버튼 텍스트
</button>
```

개발 편의성을 위해 DaisyUI를 활용하는 경우:

```html
<!-- DaisyUI 기반으로 Figma 디자인에 맞게 커스터마이징 -->
<button class="btn btn-primary rounded-md">버튼 텍스트</button>
```

#### 예시: 카드 컴포넌트

Figma 디자인을 충실히 구현하는 경우:

```html
<!-- Figma 디자인에 따른 Tailwind CSS 구현 -->
<div class="bg-white p-6 rounded-lg shadow-md">
  <h3 class="text-heading-2 text-gray-900 mb-2">카드 제목</h3>
  <p class="text-body text-gray-600">카드 내용</p>
  <div class="mt-4 flex justify-end">
    <button class="bg-primary-500 text-white px-4 py-2 rounded-md">확인</button>
  </div>
</div>
```

개발 편의성을 위해 DaisyUI를 활용하는 경우:

```html
<!-- DaisyUI 기반으로 Figma 디자인에 맞게 커스터마이징 -->
<div class="card bg-base-100 shadow-md">
  <div class="card-body">
    <h3 class="card-title text-gray-900">카드 제목</h3>
    <p class="text-gray-600">카드 내용</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary rounded-md">확인</button>
    </div>
  </div>
</div>
```

### 5. DaisyUI 테마와 Figma 디자인 시스템 통합

Figma 디자인 시스템의 색상과 스타일을 DaisyUI 테마에 적용하는 방법:

```css
/* src/style.css */
@import "tailwindcss";

@theme {
  /* Figma 디자인 시스템의 색상 변수 */
  --color-primary-500: oklch(0.7 0.2 240);
  --color-secondary-500: oklch(0.8 0.2 30);
  /* 기타 Tailwind CSS 테마 변수 */
}

@plugin "daisyui" {
  themes: {
    figma: {
      /* Figma 디자인 시스템의 색상을 DaisyUI 테마에 매핑 */
      "primary": "var(--color-primary-500)",
      "secondary": "var(--color-secondary-500)",
      "accent": "var(--color-accent-500)",
      "neutral": "var(--color-neutral-500)",
      "base-100": "#ffffff",
      "info": "var(--color-info-500)",
      "success": "var(--color-success-500)",
      "warning": "var(--color-warning-500)",
      "error": "var(--color-error-500)"
    }
  }
}
```

이렇게 하면 DaisyUI 컴포넌트를 사용하더라도 Figma 디자인 시스템의 색상과 스타일을 일관되게 적용할 수 있습니다.

## Figma 디자인 시스템 통합

Figma의 디자인 시스템을 Tailwind CSS v4에 통합하는 방법:

### 1. 색상 추출

Figma의 색상 스타일을 CSS 변수로 추출하여 `@theme` 블록에 정의합니다:

```css
@theme {
  /* Figma 색상 스타일 */
  --color-primary-100: oklch(0.97 0.03 240);
  --color-primary-200: oklch(0.92 0.06 240);
  --color-primary-300: oklch(0.85 0.1 240);
  --color-primary-400: oklch(0.78 0.15 240);
  --color-primary-500: oklch(0.7 0.2 240);
  --color-primary-600: oklch(0.63 0.22 240);
  --color-primary-700: oklch(0.56 0.24 240);
  --color-primary-800: oklch(0.48 0.26 240);
  --color-primary-900: oklch(0.4 0.28 240);
  --color-primary-950: oklch(0.3 0.3 240);
}
```

### 2. 타이포그래피 추출

Figma의 텍스트 스타일을 CSS 변수로 정의합니다:

```css
@theme {
  /* Figma 텍스트 스타일 */
  --font-display: 'Pretendard', sans-serif;
  --font-body: 'Pretendard', sans-serif;

  --text-heading-1: 2.5rem;
  --text-heading-1--line-height: 3rem;
  --text-heading-1--font-weight: 700;
  --text-heading-1--letter-spacing: -0.025em;

  --text-heading-2: 2rem;
  --text-heading-2--line-height: 2.5rem;
  --text-heading-2--font-weight: 700;
  --text-heading-2--letter-spacing: -0.025em;

  /* 추가 텍스트 스타일 */
}
```

### 3. 간격 추출

Figma의 레이아웃 그리드와 간격을 CSS 변수로 정의합니다:

```css
@theme {
  /* Figma 간격 시스템 */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;
}
```

### 4. 컴포넌트 구현 전략

Figma 디자인을 코드로 구현할 때 다음 전략을 사용합니다:

1. **Tailwind CSS 우선**: 기본적으로 Tailwind CSS 유틸리티 클래스를 사용하여 디자인 구현
2. **DaisyUI 선택적 활용**: 디자인이 DaisyUI 컴포넌트와 유사한 경우에만 DaisyUI 사용
3. **일관성 유지**: 프로젝트 전체에서 일관된 접근 방식 유지

#### 예시: Figma 디자인 구현

```html
<!-- Tailwind CSS만 사용한 구현 -->
<div class="bg-white p-6 rounded-lg shadow-md">
  <h3 class="text-heading-2 text-gray-900 mb-2">카드 제목</h3>
  <p class="text-body text-gray-600">카드 내용</p>
  <div class="mt-4 flex justify-end">
    <button class="bg-primary-500 text-white px-4 py-2 rounded-md">확인</button>
  </div>
</div>

<!-- DaisyUI를 활용한 구현 -->
<div class="card bg-base-100 shadow-md">
  <div class="card-body">
    <h3 class="card-title">카드 제목</h3>
    <p>카드 내용</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">확인</button>
    </div>
  </div>
</div>
```

## Vue 컴포넌트에 Tailwind CSS 적용

Tailwind CSS를 Vue 3 컴포넌트에 효과적으로 적용하기 위한 패턴과 모범 사례를 알아보겠습니다.

### 1. 스타일 관리 구조

Tailwind CSS 프로젝트에서는 다음과 같은 스타일 관리 구조를 권장합니다:

- **전역 스타일 (style.css)**: 테마 변수, 기본 스타일 등 전역적으로 적용되는 스타일
- **컴포넌트 내 스타일링**: 각 컴포넌트에 직접 Tailwind 유틸리티 클래스 적용
- **레이아웃 컴포넌트**: 페이지 구조를 담당하는 컴포넌트에 레이아웃 관련 클래스 적용

#### 전역 스타일 (style.css) 구조

```css
@import 'tailwindcss';
@plugin "daisyui";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* 테마 변수 정의 */
}

@layer base {
  /* 기본 스타일 정의 */
  :root {
    @apply antialiased text-gray-900;
    font-family: var(--font-sans);
  }

  html,
  body,
  #app {
    @apply bg-white min-h-screen w-full;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-display font-bold;
  }

  a {
    @apply text-primary-500 hover:text-primary-700 transition-colors;
  }

  /* 다크 모드 설정 */
  :where(.dark, .dark *) {
    @apply text-gray-100 bg-gray-900;
  }
}
```

### 2. Vue 컴포넌트에 Tailwind 클래스 적용

Vue 컴포넌트에서는 `<style>` 태그를 사용하지 않고 템플릿에 직접 Tailwind 클래스를 적용하는 것이 권장됩니다.

#### 기본 컴포넌트 예시

```vue
<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h2>
    <p class="text-gray-600">{{ content }}</p>
    <div class="mt-4 flex justify-end">
      <button
        class="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  content: String,
  buttonText: {
    type: String,
    default: '확인',
  },
});
</script>
```

#### 반응형 디자인 적용

Tailwind CSS의 반응형 접두사를 사용하여 다양한 화면 크기에 맞게 UI를 조정할 수 있습니다:

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <div v-for="item in items" :key="item.id" class="bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-lg font-bold mb-2">{{ item.title }}</h3>
      <p class="text-sm text-gray-600 mb-4">{{ item.description }}</p>
      <button class="w-full sm:w-auto px-4 py-2 bg-primary-500 text-white rounded-md">
        상세 보기
      </button>
    </div>
  </div>
</template>
```

### 3. 컴포넌트 계층 구조와 스타일 관리

효과적인 Tailwind CSS 기반 애플리케이션을 위한 컴포넌트 계층 구조:

#### 레이아웃 컴포넌트

```vue
<!-- MainLayout.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader class="sticky top-0 z-50" />
    <main class="flex-grow py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <slot></slot>
        <!-- 페이지 내용 -->
      </div>
    </main>
    <AppFooter />
  </div>
</template>
```

#### UI 컴포넌트

```vue
<!-- Button.vue -->
<template>
  <button
    :class="[
      'px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantClasses,
      sizeClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = computed(() => {
  const classes = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
    outline:
      'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    text: 'bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
  };
  return classes[props.variant];
});

const sizeClasses = computed(() => {
  const classes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  return classes[props.size];
});
</script>
```

### 4. 클래스 조직화 패턴

Tailwind 클래스를 조직화하는 효과적인 방법:

#### 클래스 그룹화

관련 있는 스타일을 함께 그룹화하여 가독성을 높입니다:

```html
<div
  class="
    /* 레이아웃 */ 
    flex flex-col p-4 m-2
    /* 스타일링 */
    bg-white rounded-lg shadow-md
    /* 상태 및 반응형 */
    hover:shadow-lg md:flex-row
  "
>
  <!-- 내용 -->
</div>
```

#### 조건부 클래스 적용

Vue의 `class` 바인딩을 활용하여 조건부로 Tailwind 클래스를 적용할 수 있습니다:

```vue
<div
  :class="[
    'p-4 rounded-lg',
    isActive ? 'bg-primary-100 text-primary-900' : 'bg-white text-gray-900',
    size === 'lg' ? 'text-lg' : 'text-base',
  ]"
>
  {{ content }}
</div>
```

### 5. 일반 CSS 사용 최소화

Tailwind CSS 프로젝트에서는 일반 CSS 사용을 최소화하고 Tailwind 유틸리티 클래스를 활용하는 것이 권장됩니다:

#### 권장하지 않는 방식

```vue
<template>
  <div class="custom-card">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<style scoped>
.custom-card {
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
}
</style>
```

#### 권장하는 방식

```vue
<template>
  <div class="p-4 bg-white rounded-lg shadow-sm">
    <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
    <p class="text-gray-600">{{ content }}</p>
  </div>
</template>
```

### 6. 복잡한 컴포넌트의 스타일링

복잡한 컴포넌트의 경우에도 Tailwind 클래스만으로 효과적으로 스타일링할 수 있습니다:

```vue
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- 헤더 -->
    <div class="bg-primary-50 px-4 py-3 border-b border-primary-100">
      <h3 class="text-lg font-semibold text-primary-900">{{ title }}</h3>
    </div>

    <!-- 본문 -->
    <div class="p-4">
      <p class="text-gray-600">{{ content }}</p>

      <!-- 데이터 목록 -->
      <ul class="mt-4 space-y-2">
        <li v-for="item in items" :key="item.id" class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary-500"></div>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>

    <!-- 푸터 -->
    <div class="bg-gray-50 px-4 py-3 border-t border-gray-100 flex justify-end gap-2">
      <button
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
      >
        취소
      </button>
      <button
        class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
      >
        확인
      </button>
    </div>
  </div>
</template>
```

## 고급 기능

### 1. 컨테이너 쿼리

Tailwind CSS v4에서는 컨테이너 쿼리를 지원합니다:

```html
<div class="@container">
  <div class="@md:text-lg @lg:text-xl @xl:text-2xl">
    컨테이너 크기에 따라 텍스트 크기가 변경됩니다.
  </div>
</div>
```

### 2. 3D 변환

3D 공간에서 요소를 변환할 수 있습니다:

```html
<div class="rotate-x-45 rotate-y-45 perspective-500">3D 변환이 적용된 요소</div>
```

### 3. 그라데이션 API

방사형 및 원뿔형 그라데이션, 보간 모드 등을 지원합니다:

```html
<div class="bg-gradient-to-r from-primary-500 to-secondary-500 via-accent-500 bg-gradient-hue">
  그라데이션이 적용된 요소
</div>
```

### 4. @starting-style 지원

JavaScript 없이 진입 및 종료 전환을 만들 수 있는 새로운 변형을 제공합니다:

```html
<div class="opacity-100 transition-opacity duration-300 starting:opacity-0">
  페이드 인 효과가 적용된 요소
</div>
```

### 5. not-\* 변형

다른 변형, 사용자 정의 선택기 또는 미디어/기능 쿼리와 일치하지 않을 때만 요소의 스타일을 지정할 수 있습니다:

```html
<div class="not-dark:bg-white dark:bg-gray-800">다크 모드가 아닐 때만 흰색 배경이 적용됩니다.</div>
```

## 문제 해결

### 1. 스타일이 적용되지 않는 경우

- Tailwind 설정과 CSS 파일 임포트를 확인하세요.
- 개발 서버를 재시작해보세요.
- 브라우저 개발자 도구에서 CSS 변수가 제대로 정의되었는지 확인하세요.

### 2. DaisyUI 컴포넌트 문제

- DaisyUI 5.0 공식 문서를 참조하여 최신 클래스 이름과 구조를 확인하세요.
- HTML 구조가 DaisyUI 5.0 문서와 일치하는지 확인하세요.
- 테마가 올바르게 적용되었는지 확인하세요.

### 3. 빌드 오류

- 모든 의존성이 최신 버전인지 확인하세요.
- Vite, Tailwind CSS, DaisyUI 버전이 호환되는지 확인하세요.

### 4. 성능 최적화

- 개발 중에는 `@apply` 사용을 최소화하세요.
- 불필요한 CSS 변수 정의를 피하세요.
- 큰 프로젝트의 경우 코드 분할을 고려하세요.
