# TypeScript 개발 가이드

## 목차
1. [소개](#소개)
2. [디렉토리 구조](#디렉토리-구조)
3. [네이밍 컨벤션](#네이밍-컨벤션)
4. [타입 정의 방법](#타입-정의-방법)
5. [Vue3 Composition API와 TypeScript](#vue3-composition-api와-typescript)
6. [유틸리티 타입](#유틸리티-타입)
7. [타입 가드](#타입-가드)
8. [개발 프로세스](#개발-프로세스)

## 소개

이 가이드는 Vue3 Composition API와 TypeScript를 함께 사용하는 프로젝트의 개발 가이드라인을 제공합니다. 일관된 코드 스타일과 타입 관리를 통해 협업 개발의 효율성을 높이고, 코드의 안정성을 확보하는 것을 목표로 합니다.

## 디렉토리 구조

TypeScript 타입 정의를 위한 디렉토리 구조는 기능 중심 구조를 따릅니다.

```
src/
├── types/                   # 전역 타입 정의
│   ├── index.ts             # 타입 내보내기
│   ├── common/              # 공통 타입
│   │   ├── ui.ts            # UI 관련 공통 타입
│   │   ├── api.ts           # API 관련 공통 타입
│   │   └── ...
│   │
│   ├── models/              # 데이터 모델 타입
│   │   ├── user.ts          # 사용자 관련 타입
│   │   ├── product.ts       # 제품 관련 타입
│   │   └── ...
│   │
│   ├── components/          # 컴포넌트 관련 타입
│   │   ├── buttons.ts       # 버튼 관련 타입
│   │   ├── forms.ts         # 폼 관련 타입
│   │   └── ...
│   │
│   └── features/            # 기능별 타입
│       ├── auth/            # 인증 관련 타입
│       ├── dashboard/       # 대시보드 관련 타입
│       └── ...
│
├── components/              # 컴포넌트 (기존 구조)
├── stories/                 # 스토리북 (기존 구조)
└── ...
```

### 타입 파일 구성 규칙

1. **인덱스 파일**: 각 디렉토리에 `index.ts` 파일을 만들어 해당 디렉토리의 모든 타입을 내보냅니다.
2. **기능별 분리**: 타입은 기능별로 분리하여 관리합니다.
3. **관련성**: 서로 관련된 타입은 같은 파일에 정의합니다.
4. **재사용성**: 여러 곳에서 사용되는 타입은 `common` 디렉토리에 정의합니다.

## 네이밍 컨벤션

### 타입 및 인터페이스 네이밍

1. **인터페이스 (Interface)**
   - PascalCase 사용
   - 명사 또는 명사구 사용
   - 접미사로 역할 표시 (필요한 경우)
   
   ```typescript
   interface UserProfile {}
   interface ApiResponse {}
   interface ButtonProps {}
   ```

2. **타입 별칭 (Type Alias)**
   - PascalCase 사용
   - 명사 또는 명사구 사용
   - 구체적인 의미 전달
   
   ```typescript
   type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
   type Size = 'sm' | 'md' | 'lg';
   type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
   ```

3. **열거형 (Enum)**
   - PascalCase 사용
   - 단수형 명사 사용
   - 값은 PascalCase 또는 UPPER_SNAKE_CASE 사용
   
   ```typescript
   enum Role {
     Admin = 'ADMIN',
     User = 'USER',
     Guest = 'GUEST'
   }
   ```

### 변수 및 함수 네이밍

1. **변수**
   - camelCase 사용
   - 명확한 의미 전달
   - 불리언 변수는 is, has, should 등의 접두사 사용
   
   ```typescript
   const userName = 'John';
   const isLoading = true;
   const hasPermission = false;
   ```

2. **함수**
   - camelCase 사용
   - 동사 또는 동사구로 시작
   - 함수의 목적을 명확히 표현
   
   ```typescript
   function getUserData() {}
   function calculateTotal() {}
   function handleSubmit() {}
   ```

3. **Composition 함수**
   - camelCase 사용
   - 'use' 접두사 사용
   
   ```typescript
   function useAuth() {}
   function useForm() {}
   function useLocalStorage() {}
   ```

### 파일 네이밍

1. **타입 파일**
   - kebab-case 사용
   - 명사 또는 명사구 사용
   
   ```
   user-profile.ts
   api-response.ts
   button-props.ts
   ```

2. **인덱스 파일**
   - 항상 `index.ts` 사용

## 타입 정의 방법

### 인터페이스 vs 타입 별칭

1. **인터페이스 사용 권장 사항**
   - 객체 형태의 데이터 구조 정의
   - 확장 가능성이 있는 타입
   - 컴포넌트 Props 정의
   
   ```typescript
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
     disabled?: boolean;
   }
   
   // 확장 예시
   interface IconButtonProps extends ButtonProps {
     icon: string;
     iconPosition?: 'left' | 'right';
   }
   ```

2. **타입 별칭 사용 권장 사항**
   - 유니온 타입 정의
   - 기본 타입의 별칭
   - 튜플 타입 정의
   
   ```typescript
   type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
   type Size = 'sm' | 'md' | 'lg';
   type Coordinates = [number, number]; // 튜플 타입
   ```

### 타입 주석 및 문서화

JSDoc을 사용하여 타입에 대한 설명을 추가합니다.

```typescript
/**
 * 버튼 컴포넌트의 속성을 정의합니다.
 */
interface ButtonProps {
  /**
   * 버튼의 스타일 변형
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * 버튼의 크기
   * @default 'md'
   */
  size?: Size;
  
  /**
   * 버튼의 비활성화 상태
   * @default false
   */
  disabled?: boolean;
}
```

## Vue3 Composition API와 TypeScript

### Props 타입 정의

1. **인라인 타입 정의 (간단한 컴포넌트)**

```typescript
<script setup lang="ts">
// Props 타입 정의
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false
})
</script>
```

2. **외부 타입 정의 (복잡한 컴포넌트)**

```typescript
// src/types/components/buttons.ts
export interface ButtonProps {
  variant?: ButtonVariant
  size?: Size
  disabled?: boolean
  fullWidth?: boolean
}

// src/components/common/buttons/Button.vue
<script setup lang="ts">
import type { ButtonProps } from '@/types/components/buttons'

// Props 타입 정의
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false
})
</script>
```

### Emits 타입 정의

```typescript
// src/types/components/buttons.ts
export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'focus', event: FocusEvent): void
}

// src/components/common/buttons/Button.vue
<script setup lang="ts">
import type { ButtonProps, ButtonEmits } from '@/types/components/buttons'

// Props 타입 정의
const props = withDefaults(defineProps<ButtonProps>(), { /* 기본값 */ })

// Emits 타입 정의
const emits = defineEmits<ButtonEmits>()
</script>
```

### Ref 및 Reactive 타입 정의

```typescript
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'

// Ref 타입 정의
interface User {
  id: number
  name: string
  email: string
}

const user = ref<User | null>(null)

// Reactive 타입 정의
interface FormState {
  name: string
  email: string
  age: number
  isSubscribed: boolean
}

const form = reactive<FormState>({
  name: '',
  email: '',
  age: 0,
  isSubscribed: false
})
</script>
```

### Computed 타입 정의

```typescript
<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref<string>('')
const lastName = ref<string>('')

// 타입 추론 (권장)
const fullName = computed(() => `${firstName.value} ${lastName.value}`)
</script>
```

### Composable 함수 타입 정의

```typescript
// src/types/composables/useCounter.ts
export interface UseCounterReturn {
  count: Ref<number>
  increment: () => void
  decrement: () => void
  reset: () => void
}

// src/composables/useCounter.ts
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { UseCounterReturn } from '@/types/composables/useCounter'

export function useCounter(initialValue = 0): UseCounterReturn {
  const count = ref<number>(initialValue)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

## 유틸리티 타입

프로젝트에서 자주 사용하는 유틸리티 타입을 정의하고 활용합니다.

```typescript
// src/types/utils.ts

/**
 * null을 허용하는 타입
 */
export type Nullable<T> = T | null

/**
 * undefined를 허용하는 타입
 */
export type Optional<T> = T | undefined

/**
 * 특정 속성을 필수로 만드는 타입
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/**
 * 특정 속성을 선택적으로 만드는 타입
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 중첩된 객체를 위한 DeepPartial 타입
 */
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;
```

## 타입 가드

타입 안전성을 높이기 위한 타입 가드 함수를 정의하고 사용합니다.

```typescript
// src/utils/typeGuards.ts

/**
 * 값이 null이나 undefined가 아닌지 확인하는 타입 가드
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * 객체가 특정 속성을 가지고 있는지 확인하는 타입 가드
 */
export function hasProperty<T extends object, K extends PropertyKey>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * 값이 특정 타입의 배열인지 확인하는 타입 가드
 */
export function isArrayOfType<T>(
  arr: unknown,
  guard: (item: unknown) => item is T
): arr is T[] {
  return Array.isArray(arr) && arr.every(item => guard(item))
}
```

## 개발 프로세스

### 1. 타입 우선 개발 (Type-First Development)

새로운 기능을 개발할 때는 먼저 타입을 정의하고, 그 타입을 기반으로 구현을 진행합니다.

1. **데이터 모델 타입 정의**
   - 기능에 필요한 데이터 모델의 타입을 먼저 정의합니다.
   - 모델 간의 관계를 타입으로 명확히 표현합니다.

2. **컴포넌트 Props 및 Emits 타입 정의**
   - 컴포넌트의 인터페이스를 타입으로 먼저 정의합니다.
   - 필요한 속성과 이벤트를 명확히 합니다.

3. **API 요청/응답 타입 정의**
   - API와의 통신에 사용되는 요청 및 응답 타입을 정의합니다.
   - 백엔드 API 문서를 참조하여 정확한 타입을 작성합니다.

### 2. 컴포넌트 개발 프로세스

1. **타입 정의**
   - 컴포넌트에 필요한 Props, Emits, 내부 상태 등의 타입을 정의합니다.
   - 복잡한 타입은 별도 파일로 분리합니다.

2. **컴포넌트 구현**
   - 정의된 타입을 기반으로 컴포넌트를 구현합니다.
   - TypeScript의 타입 체크를 활용하여 오류를 조기에 발견합니다.

3. **스토리북 문서화**
   - 컴포넌트의 사용법과 타입 정보를 스토리북에 문서화합니다.
   - 다양한 Props 조합을 테스트합니다.

### 3. 코드 리뷰 체크리스트

코드 리뷰 시 다음 사항을 확인합니다:

- 타입이 명확하게 정의되어 있는가?
- `any` 타입을 사용하지 않았는가?
- 타입 가드를 적절히 사용하고 있는가?
- 컴포넌트의 Props와 Emits 타입이 명확한가?
- 네이밍 컨벤션을 준수하고 있는가?
- JSDoc을 통한 문서화가 충분한가?

### 4. 타입 리팩토링

코드베이스가 성장함에 따라 정기적으로 타입 리팩토링을 수행합니다:

- 중복된 타입을 통합합니다.
- 더 정확한 타입으로 개선합니다.
- 타입 간의 일관성을 유지합니다.
- 유틸리티 타입을 활용하여 타입 코드를 간결하게 유지합니다.
