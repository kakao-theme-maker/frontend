import { useState, type FormEvent } from "react";
import Field from "../common/Field";
import PillButton from "./PillButton";

interface PasswordEditFormProps {
  onSubmit: (password: string) => void;
}

export default function PasswordEditForm({ onSubmit }: PasswordEditFormProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit = password.length > 0 && password === confirm;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(password);
  };

  return (
    <form
      aria-label="비밀번호 수정"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 sm:gap-8"
    >
      <Field
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        autoFocus
      />
      <Field
        label="비밀번호 다시 입력"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        autoComplete="new-password"
        error={mismatch ? "비밀번호가 일치하지 않아요." : undefined}
      />
      <PillButton type="submit" disabled={!canSubmit}>
        수정완료하기
      </PillButton>
    </form>
  );
}
