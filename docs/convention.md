# 코드 컨벤션

## 1. 파일 및 폴더명

- 컴포넌트 : PascalCase
  - `Header.tsx`
  - `LoginForm.tsx`

- 페이지 : PascalCase
  - `Home.tsx`
  - `Login.tsx`

- hooks : camelCase
  - `useAuth.ts`
  - `useModal.ts`

- util : camelCase
  - `formatDate.ts`

- assets : kebab-case
  - `logo.png`
  - `default-profile.png`

---

## 2. Import 순서

```tsx
// React
import { useState } from "react";

// Library
import { useNavigate } from "react-router-dom";

// API
import { login } from "@/api/auth";

// Components
import Button from "@/components/common/Button";

// Hooks
import useAuth from "@/hooks/useAuth";

// Styles
import "./style.css";
```

---

## 3. 절대 경로 사용

상대 경로 대신 `@` 별칭을 사용합니다.

```tsx
// x
import Header from "../../../components/Header";

// o
import Header from "@/components/Header";
```

---

## 4. 컴포넌트 작성

- 함수형 컴포넌트 사용
- default export 사용
- Props는 interface로 정의

```tsx
interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  return <button>{text}</button>;
}

export default Button;
```

---

## 5. 스타일

- Tailwind CSS 사용
- 인라인 스타일 지양
- 공통 스타일은 컴포넌트화

---

## 6. 상태 관리

- 지역 상태 : useState
- 전역 상태 : Zustand
- 서버 상태 : React Query

---

## 7. API

- axios 사용
- API는 `src/api`에서 관리

---

## 8. 아이콘

- lucide-react 사용