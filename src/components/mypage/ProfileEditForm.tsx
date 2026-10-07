// src/components/mypage/ProfileEditForm.tsx
import { useState } from "react";
import Field from "@/components/common/Field";
import EditForm from "@/components/mypage/EditForm";
import type { ProfileFormValues } from "@/types/user";

interface ProfileEditFormProps {
  defaultValues: ProfileFormValues;
  onSubmit: (values: ProfileFormValues) => void;
}

// 프로필(이름, 한줄소개) 수정 폼 컴포넌트
export default function ProfileEditForm({ defaultValues, onSubmit }: ProfileEditFormProps) {
  const [values, setValues] = useState(defaultValues);
  const canSubmit = values.name.trim().length > 0;

  // 필드별 입력값 변경 핸들러 생성
  const handleField = (field: keyof ProfileFormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <EditForm
      label="기본 정보 수정"
      canSubmit={canSubmit}
      onSubmit={() => onSubmit({ name: values.name.trim(), bio: values.bio.trim() })}
    >
      <Field
        label="이름"
        value={values.name}
        onChange={handleField("name")}
        autoComplete="name"
        autoFocus
        required
      />
      <Field
        label="한줄소개"
        value={values.bio}
        onChange={handleField("bio")}
        autoComplete="off"
      />
    </EditForm>
  );
}
