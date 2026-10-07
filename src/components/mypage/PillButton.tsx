// src/components/mypage/PillButton.tsx
import type { ComponentProps } from "react";
import Button from "@/components/common/Button";

// 폭 100%의 둥근 큰 버튼 컴포넌트
export default function PillButton(props: ComponentProps<typeof Button>) {
  return <Button size="xl" rounded="full" {...props} />;
}
