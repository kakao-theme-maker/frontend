// src/components/mypage/EditForm.tsx
import type { FormEvent, ReactNode } from "react";
import PillButton from "@/components/mypage/PillButton";

interface EditFormProps {
  label: string;
  canSubmit: boolean;
  onSubmit: () => void;
  children: ReactNode;
}

// 수정 폼 공통 레이아웃 컴포넌트 (입력 필드 + 수정완료 버튼)
export default function EditForm({ label, canSubmit, onSubmit, children }: EditFormProps) {
  // 제출 가능한 상태일 때만 onSubmit 호출
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit();
  };

  return (
    <form
      aria-label={label}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 sm:gap-8"
    >
      {children}
      <PillButton type="submit" disabled={!canSubmit}>
        수정완료하기
      </PillButton>
    </form>
  );
}
