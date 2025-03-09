# Vue3 + TypeScript + Vite 개발 가이드

## 목차
1. [디렉토리 구조](#디렉토리-구조)
2. [개발 환경 설정](#개발-환경-설정)
3. [API 코드 작성 가이드](#api-코드-작성-가이드)
4. [컴포넌트 개발 및 페이지 구성](#컴포넌트-개발-및-페이지-구성)
5. [클린 코드 작성 원칙](#클린-코드-작성-원칙)

## 디렉토리 구조

```
.
├── .github/               # GitHub Actions 워크플로우 설정
├── .storybook/            # Storybook 설정 파일
├── .vscode/               # VSCode 설정 파일
├── dist/                  # 빌드 출력 디렉토리
├── docs/                  # 문서 파일
├── public/                # 정적 자산 (빌드 시 그대로 복사됨)
├── src/
│   ├── assets/            # 정적 리소스 (이미지, 폰트 등)
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── common/        # 공통 컴포넌트 (버튼, 입력 등)
│   │   ├── layouts/       # 레이아웃 컴포넌트
│   │   └── features/      # 기능별 컴포넌트
│   │
│   ├── composables/       # 재사용 가능한 로직 (Composition 함수)
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   └── ...
│   │
│   ├── router/            # Vue Router 설정
│   │   ├── index.ts       # 라우터 구성
│   │   └── routes/        # 라우트 정의 파일들
│   │
│   ├── stores/            # Pinia 스토어
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   └── ...
│   │
│   ├── services/          # API 서비스
│   │   ├── api.ts         # API 클라이언트 설정
│   │   ├── auth.service.ts
│   │   └── ...
│   │
│   ├── stories/           # Storybook 스토리 파일
│   │   ├── common/        # 공통 컴포넌트 스토리
│   │   ├── features/      # 기능별 컴포넌트 스토리
│   │   └── ...
│   │
│   ├── types/             # 타입 정의
│   │   ├── models/        # 데이터 모델 타입
│   │   ├── api.ts         # API 관련 타입
│   │   └── ...
│   │
│   ├── utils/             # 유틸리티 함수
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── ...
│   │
│   ├── views/             # 페이지 컴포넌트
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   └── ...
│   │
│   ├── App.vue            # 루트 컴포넌트
│   ├── main.ts            # 애플리케이션 진입점
│   └── vite-env.d.ts      # Vite 환경 타입 선언
│
├── eslint.config.mjs      # ESLint 설정
├── .prettierrc            # Prettier 설정
├── .prettierignore        # Prettier 무시 파일 설정
├── tsconfig.json          # TypeScript 설정
├── tsconfig.app.json      # 앱 코드 TypeScript 설정
├── tsconfig.node.json     # Node 환경 TypeScript 설정
├── vite.config.ts         # Vite 설정
└── package.json           # 프로젝트 의존성 및 스크립트
```

## 개발 환경 설정

### 1. 타입스크립트 설정

```typescript
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```typescript
// tsconfig.app.json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["env.d.ts", "src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"]
}
```

```typescript
// tsconfig.node.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "composite": true,
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "types": ["node", "vite/client"],

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
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

#### ESLint 설정 (ESLint 9 Flat Config)

```bash
# ESLint 관련 패키지 설치
npm install -D eslint eslint-plugin-vue @typescript-eslint/parser typescript-eslint vue-eslint-parser @vue/eslint-config-typescript @vue/eslint-config-prettier eslint-plugin-prettier eslint-config-prettier prettier
```

```javascript
// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import vueConfigTypescript from '@vue/eslint-config-typescript';
import vueConfigPrettier from '@vue/eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // js
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
  // ts
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  // vue
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    rules: {
      ...vueConfigTypescript.rules,
      ...vueConfigPrettier.rules,
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 100,
          bracketSpacing: true,
          endOfLine: 'auto',
          arrowParens: 'always',
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules',
      'dist',
      '*.log',
      '.git',
      '.storybook-static',
      '.cursor',
      '.vscode',
      'storybook-static',
      '.github',
    ],
  },
  // prettier
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 100,
          bracketSpacing: true,
          endOfLine: 'auto',
          arrowParens: 'always',
        },
      ],
    },
  },
];
```

#### Prettier 설정

```json
// .prettierrc
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "endOfLine": "auto",
  "arrowParens": "always",
  "parser": "typescript",
  "singleAttributePerLine": false
}
```

`.prettierignore` 파일을 생성하여 특정 파일 및 디렉토리를 제외할 수 있습니다:

```
node_modules
dist
*.log
.git
.storybook-static
.cursor
.vscode
```

### 4. VSCode 설정

#### 권장 확장 프로그램

프로젝트 루트에 `.vscode/extensions.json` 파일을 생성하여 권장 확장 프로그램을 설정합니다:

```json
{
  "recommendations": [
    "vue.volar", // Vue 3 + TypeScript 지원
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
  "tailwindCSS.experimental.configFile": "./src/style.css",
  "css.validate": false,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "vue"],
  "eslint.useFlatConfig": true,
  "prettier.requireConfig": true,
  "editor.formatOnSaveMode": "file",
  "prettier.useEditorConfig": false
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
