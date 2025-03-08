# AI-Meister Frontend

Vue 3, TypeScript, Vite 기반의 모던 웹 애플리케이션 프론트엔드 프로젝트입니다. 이 프로젝트는 Tailwind CSS v4와 Storybook을 활용한 컴포넌트 기반 개발 방법론을 채택하고 있습니다.

## 기술 스택

- **프레임워크**: Vue 3 (Composition API)
- **언어**: TypeScript
- **빌드 도구**: Vite 6.2.1
- **스타일링**: Tailwind CSS v4 (CSS-first 접근법)
- **컴포넌트 문서화**: Storybook 8.6.4
- **UI 라이브러리**: DaisyUI

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 실행 (http://localhost:5173/)
npm run dev
```

### 스토리북 실행

```bash
# 스토리북 실행 (http://localhost:6006/)
npm run storybook
```

### 빌드

```bash
# 프로덕션용 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── components/              # 컴포넌트
│   ├── common/              # 공통 컴포넌트
│   │   ├── buttons/         # 버튼 관련 컴포넌트
│   │   ├── forms/           # 폼 관련 컴포넌트
│   │   └── ...
│   │
│   └── features/            # 기능별 컴포넌트
│       ├── auth/            # 인증 관련 기능
│       └── ...
│
├── stories/                 # 스토리북 스토리
│   ├── common/              # 공통 컴포넌트 스토리
│   └── features/            # 기능별 컴포넌트 스토리
│
├── types/                   # TypeScript 타입 정의
│   ├── common/              # 공통 타입
│   ├── models/              # 데이터 모델 타입
│   └── components/          # 컴포넌트 관련 타입
│
├── composables/             # 재사용 가능한 Composition 함수
├── utils/                   # 유틸리티 함수
├── style.css                # 전역 스타일 및 Tailwind 설정
└── main.ts                  # 애플리케이션 진입점
```

## 개발 가이드라인

이 프로젝트는 다음과 같은 개발 가이드라인을 따릅니다:

1. **컴포넌트 개발**: 모든 UI 요소는 재사용 가능한 컴포넌트로 개발합니다.
2. **TypeScript 활용**: 모든 코드는 TypeScript로 작성하며, 명확한 타입 정의를 제공합니다.
3. **Composition API**: Vue 3의 Composition API와 `<script setup>` 구문을 사용합니다.
4. **CSS-first Tailwind**: Tailwind CSS v4의 CSS-first 접근법을 활용합니다.
5. **스토리북 문서화**: 모든 컴포넌트는 Storybook을 통해 문서화합니다.

## 문서

자세한 개발 가이드라인은 다음 문서를 참조하세요:

- [Figma to Vue 개발 가이드](./docs/figma-to-code.md)
- [TypeScript 개발 가이드](./docs/typescript-code-guide.md)
- [Tailwind CSS v4 가이드](./docs/tailwind-v4-guide.md)
- [Storybook 가이드](./docs/storybook-guide.md)

## 컨벤션

### 코드 스타일

- **컴포넌트 파일명**: PascalCase (예: `Button.vue`, `UserProfile.vue`)
- **디렉토리명**: kebab-case (예: `common`, `user-profile`)
- **TypeScript 타입**: PascalCase (예: `UserProfile`, `ButtonProps`)
- **함수명**: camelCase, 동사로 시작 (예: `getUserData()`, `handleSubmit()`)
- **Composition 함수**: camelCase, 'use' 접두사 (예: `useAuth()`, `useForm()`)

### 커밋 메시지

```
<type>(<scope>): <subject>

<body>
```

- **type**: feat, fix, docs, style, refactor, test, chore 중 하나
- **scope**: 변경된 컴포넌트나 파일
- **subject**: 변경 사항에 대한 간결한 설명
- **body**: 변경 사항에 대한 자세한 설명 (선택 사항)

예시: `feat(button): 버튼 컴포넌트에 outline 변형 추가`

## 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE)를 따릅니다.
