import { useState, type FormEvent } from "react";
import PillButton from "./PillButton";
import type { ProfileFormValues } from "@/types/user";
import Field from "../common/Field";

interface ProfileEditFormProps {
  defaultValues: ProfileFormValues;
  onSubmit: (values: ProfileFormValues) => void;
}

export default function ProfileEditForm({ defaultValues, onSubmit }: ProfileEditFormProps) {
  const [values, setValues] = useState(defaultValues);
  const canSubmit = values.name.trim().length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ name: values.name.trim(), bio: values.bio.trim() });
  };

  return (
    <form
      aria-label="기본 정보 수정"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 sm:gap-8"
    >
      <Field
        label="이름"
        value={values.name}
        onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
        autoComplete="name"
        autoFocus
        required
      />
      <Field
        label="한줄소개"
        value={values.bio}
        onChange={(e) => setValues((prev) => ({ ...prev, bio: e.target.value }))}
        autoComplete="off"
      />
      <PillButton type="submit" disabled={!canSubmit}>
        수정완료하기
      </PillButton>
    </form>
  );
}
