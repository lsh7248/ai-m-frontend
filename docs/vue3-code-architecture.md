# Vue3 + TypeScript + Vite 개발 가이드

## 목차
1. [디렉토리 구조](#디렉토리-구조)
2. [개발 환경 설정](#개발-환경-설정)
3. [API 코드 작성 가이드](#api-코드-작성-가이드)
4. [컴포넌트 개발 및 페이지 구성](#컴포넌트-개발-및-페이지-구성)
5. [클린 코드 작성 원칙](#클린-코드-작성-원칙)

## 디렉토리 구조

```
src/
├── assets/               # 정적 리소스 (이미지, 폰트 등)
├── components/           # 재사용 가능한 컴포넌트
│   ├── common/           # 공통 컴포넌트 (버튼, 입력 등)
│   ├── layouts/          # 레이아웃 컴포넌트
│   └── features/         # 기능별 컴포넌트
│
├── composables/          # 재사용 가능한 로직 (Composition 함수)
│   ├── useAuth.ts
│   ├── useForm.ts
│   └── ...
│
├── router/               # Vue Router 설정
│   ├── index.ts          # 라우터 구성
│   └── routes/           # 라우트 정의 파일들
│
├── stores/               # Pinia 스토어
│   ├── auth.ts
│   ├── user.ts
│   └── ...
│
├── services/             # API 서비스
│   ├── api.ts            # API 클라이언트 설정
│   ├── auth.service.ts
│   └── ...
│
├── types/                # 타입 정의
│   ├── models/           # 데이터 모델 타입
│   ├── api.ts            # API 관련 타입
│   └── ...
│
├── utils/                # 유틸리티 함수
│   ├── format.ts
│   ├── validation.ts
│   └── ...
│
├── views/                # 페이지 컴포넌트
│   ├── Home.vue
│   ├── Login.vue
│   └── ...
│
├── App.vue               # 루트 컴포넌트
├── main.ts               # 애플리케이션 진입점
└── vite-env.d.ts         # Vite 환경 타입 선언
```

## 개발 환경 설정

### 1. 타입스크립트 설정

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noImplicitAny": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 2. Vite 설정

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ui': ['@vueuse/core', 'tailwindcss']
        }
      }
    }
  }
})
```

### 3. ESLint & Prettier 설정

#### ESLint 설정

```bash
# ESLint 관련 패키지 설치
npm install -D eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin @vue/eslint-config-typescript
```

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/multi-word-component-names': 'off', // 컴포넌트 이름 다중 단어 규칙 비활성화
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always',
      },
    }],
    '@typescript-eslint/no-explicit-any': 'warn', // any 타입 경고
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
```

#### Prettier 설정

```bash
# Prettier 관련 패키지 설치
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

```javascript
// .prettierrc.js
module.exports = {
  semi: false, // 세미콜론 사용 안함
  singleQuote: true, // 작은따옴표 사용
  tabWidth: 2, // 탭 너비
  trailingComma: 'none', // 끝에 쉼표 사용 안함
  printWidth: 100, // 줄 길이
  arrowParens: 'avoid', // 화살표 함수 괄호 생략 (x => x)
  endOfLine: 'auto', // 줄바꿈 자동
  vueIndentScriptAndStyle: true, // Vue 파일의 script와 style 블록 들여쓰기
};
```

ESLint 설정에 Prettier 통합:

```javascript
// .eslintrc.js
module.exports = {
  // ... 기존 설정 ...
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended', // Prettier 통합
  ],
  // ... 기존 설정 ...
};
```

### 4. VSCode 설정

#### 권장 확장 프로그램

프로젝트 루트에 `.vscode/extensions.json` 파일을 생성하여 권장 확장 프로그램을 설정합니다:

```json
{
  "recommendations": [
    "vue.volar", // Vue 3 + TypeScript 지원
    "vue.vscode-typescript-vue-plugin", // Vue + TypeScript 통합
    "dbaeumer.vscode-eslint", // ESLint 지원
    "esbenp.prettier-vscode", // Prettier 지원
    "formulahendry.auto-close-tag", // HTML 태그 자동 닫기
    "formulahendry.auto-rename-tag", // HTML 태그 자동 이름 변경
    "bradlc.vscode-tailwindcss", // Tailwind CSS 지원
    "antfu.vite", // Vite 지원
    "streetsidesoftware.code-spell-checker" // 영문 철자 검사
  ]
}
```

#### 작업 영역 설정

프로젝트 루트에 `.vscode/settings.json` 파일을 생성하여 작업 영역 설정을 구성합니다:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "typescript",
    "vue"
  ],
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "volar.takeOverMode.enabled": true, // Volar의 Takeover 모드 활성화
  "volar.inlayHints.eventArgumentInInlineHandlers": false,
  "tailwindCSS.includeLanguages": {
    "vue": "html",
    "vue-html": "html"
  },
  "tailwindCSS.emmetCompletions": true
}
```

### 5. 개발 스크립트 설정

`package.json`에 개발 관련 스크립트를 설정합니다:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "format": "prettier --write src/",
    "type-check": "vue-tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## API 코드 작성 가이드

### 1. API 클라이언트 설정

```typescript
// src/services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// API 응답 타입 정의
interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

class ApiClient {
  private client: AxiosInstance

  constructor(baseURL: string = import.meta.env.VITE_API_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // 요청 인터셉터
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // 응답 인터셉터
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // 에러 처리 로직
        if (error.response?.status === 401) {
          // 인증 에러 처리
        }
        return Promise.reject(error)
      }
    )
  }

  // GET 요청
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url, config)
    return response.data.data
  }

  // POST 요청
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data, config)
    return response.data.data
  }

  // PUT 요청
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data, config)
    return response.data.data
  }

  // DELETE 요청
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(url, config)
    return response.data.data
  }
}

// API 클라이언트 인스턴스 생성 및 내보내기
export const apiClient = new ApiClient()
```

### 2. 서비스 레이어 구현

```typescript
// src/services/auth.service.ts
import { apiClient } from './api'
import type { User, LoginRequest, RegisterRequest } from '@/types/models/user'

export const authService = {
  // 로그인
  async login(data: LoginRequest): Promise<{ user: User; token: string }> {
    return apiClient.post('/auth/login', data)
  },

  // 회원가입
  async register(data: RegisterRequest): Promise<User> {
    return apiClient.post('/auth/register', data)
  },

  // 로그아웃
  async logout(): Promise<void> {
    return apiClient.post('/auth/logout')
  },

  // 사용자 정보 조회
  async getCurrentUser(): Promise<User> {
    return apiClient.get('/auth/me')
  }
}
```

## 컴포넌트 개발 및 페이지 구성

### 1. 컴포넌트 개발 원칙

- **단일 책임 원칙**: 각 컴포넌트는 한 가지 책임만 가집니다.
- **컴포지션 활용**: 복잡한 컴포넌트는 작은 컴포넌트로 분리합니다.
- **논리/표현 분리**: 비즈니스 로직은 composable 함수로 분리합니다.

### 2. 컴포넌트 구조

```vue
<!-- src/components/features/user/UserProfile.vue -->
<script setup lang="ts">
// 타입 임포트
import type { User } from '@/types/models/user'

// Props 정의
interface Props {
  user: User
  isEditable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false
})

// Emits 정의
const emit = defineEmits<{
  (e: 'update', user: User): void
}>()

// 컴포넌트 로직
function handleUpdate(updatedUser: User) {
  emit('update', updatedUser)
}
</script>

<template>
  <div class="bg-white shadow rounded-lg p-4">
    <div class="flex items-center space-x-4">
      <img
        :src="user.avatarUrl || '/default-avatar.png'"
        alt="Avatar"
        class="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 class="text-lg font-medium">{{ user.name }}</h3>
        <p class="text-gray-500">{{ user.email }}</p>
      </div>
    </div>
    
    <div v-if="isEditable" class="mt-4">
      <!-- 편집 가능한 경우 표시할 UI -->
    </div>
  </div>
</template>
```

### 3. 페이지 컴포넌트 구성

```vue
<!-- src/views/UserDetailPage.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { UserProfile } from '@/components/features/user/UserProfile'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/models/user'

const route = useRoute()
const userStore = useUserStore()

const user = ref<User | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// 사용자 정보 업데이트 처리
async function handleUserUpdate(updatedUser: User) {
  try {
    await userStore.updateUser(updatedUser)
  } catch (err: any) {
    error.value = err.message
  }
}

// 페이지 로드 시 사용자 데이터 조회
onMounted(async () => {
  const userId = route.params.id as string
  
  try {
    user.value = await userStore.getUserById(userId)
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded">
      {{ error }}
    </div>
    
    <div v-else-if="user">
      <h1 class="text-2xl font-bold mb-6">사용자 정보</h1>
      
      <UserProfile
        :user="user"
        :is-editable="true"
        @update="handleUserUpdate"
      />
    </div>
    
    <div v-else class="text-center">
      사용자를 찾을 수 없습니다.
    </div>
  </div>
</template>
```

## 클린 코드 작성 원칙

### 1. DRY (Don't Repeat Yourself)
- 중복 코드는 함수, 컴포넌트 또는 Composable로 추출합니다.
- 반복되는 로직은 유틸리티 함수로 분리합니다.

### 2. KISS (Keep It Simple, Stupid)
- 복잡한 로직은 작은 함수로 분리합니다.
- 컴포넌트는 작고 단일 책임을 갖도록 유지합니다.

### 3. 네이밍 컨벤션
- 변수/함수: camelCase (isLoading, fetchData)
- 컴포넌트: PascalCase (UserProfile, LoginForm)
- 디렉토리: kebab-case (auth-wizard, user-management)

### 4. 타입 정의 모범 사례
- 타입은 재사용 가능하게 정의합니다.
- 인터페이스를 통해 타입을 확장 가능하게 만듭니다.
- `any` 타입은 피하고 명시적 타입을 사용합니다.

### 5. 성능 최적화
- `v-for`에 항상 `:key`를 사용합니다.
- 큰 목록은 가상 스크롤링을 사용합니다.
- 무거운 컴포넌트는 지연 로딩합니다.
- `computed` 속성을 적절히 활용합니다.
