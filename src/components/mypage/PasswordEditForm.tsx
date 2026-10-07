// src/components/mypage/PasswordEditForm.tsx
import { useState } from "react";
import Field from "@/components/common/Field";
import EditForm from "@/components/mypage/EditForm";

interface PasswordEditFormProps {
  onSubmit: (values: { currentPassword: string; newPassword: string }) => void;
}

// 비밀번호 변경 폼 컴포넌트 (현재 비밀번호 + 새 비밀번호)
export default function PasswordEditForm({ onSubmit }: PasswordEditFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit = currentPassword.length > 0 && password.length > 0 && password === confirm;

  return (
    <EditForm
      label="비밀번호 수정"
      canSubmit={canSubmit}
      onSubmit={() => onSubmit({ currentPassword, newPassword: password })}
    >
      <Field
        label="현재 비밀번호"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        autoComplete="current-password"
        autoFocus
      />
      <Field
        label="새 비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <Field
        label="새 비밀번호 다시 입력"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        autoComplete="new-password"
        error={mismatch ? "비밀번호가 일치하지 않아요." : undefined}
      />
    </EditForm>
  );
}
