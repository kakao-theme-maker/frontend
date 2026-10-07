// src/pages/theme/customize/CustomizeLayout.tsx
import { Outlet } from "react-router-dom";

// 커스터마이징 하위 라우트를 렌더링하는 레이아웃
export default function CustomizeLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}