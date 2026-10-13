// src/components/mypage/ProfileImageEditor.tsx
import { Loader2 } from "lucide-react";
import Avatar from "@/components/common/Avatar";

interface ProfileImageEditorProps {
  src?: string;
  name: string;
  uploading: boolean;
  onSelect: (file: File) => void;
}

// 프로필 이미지 미리보기와 변경 버튼 컴포넌트 (파일 선택 즉시 업로드)
export default function ProfileImageEditor({ src, name, uploading, onSelect }: ProfileImageEditorProps) {
  // 선택한 파일을 상위로 전달 (같은 파일을 다시 고를 수 있도록 입력값 초기화)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) onSelect(file);
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar src={src} alt={`${name} 프로필 이미지`} size="lg" />

      <label
        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary-soft px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary-soft-hover focus-within:ring-2 focus-within:ring-primary ${uploading ? "pointer-events-none opacity-60" : ""
          }`}
      >
        {uploading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {uploading ? "업로드 중..." : "프로필 사진 변경"}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
          className="sr-only"
        />
      </label>
    </div>
  );
}