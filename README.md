# AI-Meister Frontend

Vue 3, TypeScript, Vite 기반의 모던 웹 애플리케이션 프론트엔드 프로젝트입니다. 이 프로젝트는 Tailwind CSS v4와 Storybook을 활용한 컴포넌트 기반 개발 방법론을 채택하고 있습니다.

## Contributors

- **프로젝트 총괄 및 개발PM**: 네트워크운용혁신담당 AI운용혁신팀 이성현
- **UI/UX 기획, 웹 퍼블리싱 및 Frontend 개발**: 네트워크운용혁신담당 AI운용혁신팀 박주연
- **Frontend 개발 및 CI/CD 인프라 개발**: 네트워크운용혁신담당 AI운용혁신팀 신민준
- **UI/UX 기획**: X-Design Center X-Strategy팀 유주원
- **UI/UX 디자인**: X-Design Center X-Design팀 송다연

## 기술 스택

- **프레임워크**: Vue 3 (Composition API)
- **언어**: TypeScript
- **빌드 도구**: Vite 6.2.1
- **스타일링**: Tailwind CSS v4 (CSS-first 접근법)
- **컴포넌트 문서화**: Storybook 8.6.4
- **UI 라이브러리**: DaisyUI

## 배포된 Storybook

컴포넌트 라이브러리는 GitHub Pages를 통해 배포되어 있습니다:
- **Storybook URL**: [https://urban-guacamole-2n4qprz.pages.github.io/](https://urban-guacamole-2n4qprz.pages.github.io/)

이 Storybook은 main 브랜치에 변경사항이 푸시될 때마다 GitHub Actions를 통해 자동으로 빌드 및 배포됩니다.

## 시작하기

### 필수 조건

- Node.js 18.0.0 이상
- Yarn 1.22.0 이상

### 설치

```bash
# 의존성 설치
yarn
```

### 개발 서버 실행

```bash
# 개발 서버 실행 (http://localhost:5173/)
yarn dev
```

### 스토리북 실행

```bash
# 스토리북 실행 (http://localhost:6006/)
yarn storybook
```

### 빌드

```bash
# 프로덕션용 빌드
yarn build

# Storybook 빌드
yarn build-storybook
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

## CI/CD

### Storybook 자동 배포

이 프로젝트는 GitHub Actions를 사용하여 Storybook을 GitHub Pages에 자동으로 배포합니다:

- **트리거**: dev 브랜치에 푸시가 발생할 때
- **워크플로우 파일**: `.github/workflows/deploy-storybook.yml`
- **배포 URL**: [https://urban-guacamole-2n4qprz.pages.github.io/](https://urban-guacamole-2n4qprz.pages.github.io/)

## 문서

자세한 개발 가이드라인은 다음 문서를 참조하세요:

- [Figma to Vue 개발 가이드](./docs/figma-to-code.md)
- [TypeScript 개발 가이드](./docs/typescript-code-guide.md)
- [Tailwind CSS v4 가이드](./docs/tailwind-css-v4-guide.md)
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
