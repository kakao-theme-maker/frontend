// src/components/common/ImageUpload.tsx
import { Loader2, Upload, X } from "lucide-react";
import useImageUpload from "@/hooks/useImageUpload";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove?: () => void;
  alt?: string;
  size?: number;
}

// 이미지 업로드 및 미리보기 컴포넌트
export default function ImageUpload({
  value,
  onChange,
  onRemove,
  alt = "이미지 미리보기",
  size,
}: ImageUploadProps) {
  const compact = size !== undefined && size <= 72;
  const upload = useImageUpload();

  // 선택한 파일을 서버에 업로드하고, 받은 이미지 URL을 전달
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    upload.mutate(file, {
      onSuccess: (component) => onChange(component.image_url),
      onError: () => window.alert("이미지 업로드에 실패했어요. 다시 시도해 주세요."),
    });
  };

  // 업로드한 이미지 제거 처리
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <label
      className={`
        group relative block cursor-pointer overflow-hidden rounded-2xl
        border border-dashed border-field-border
        bg-primary-soft transition-colors
        hover:border-field-border-hover hover:bg-primary-soft-hover
        ${size ? "" : "aspect-square w-full max-w-[100px]"}
      `}
      style={size ? { width: size, height: size } : undefined}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={upload.isPending}
        className="hidden"
      />

      {value ? (
        <>
          <img src={value} alt={alt} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="이미지 삭제"
            className={`
              absolute z-10 flex items-center justify-center
              rounded-full bg-black/50 text-white
              backdrop-blur-sm transition-colors
              hover:bg-black/70
              ${compact ? "right-0.5 top-0.5 h-4 w-4" : "right-2 top-2 h-6 w-6"}
            `}
          >
            <X className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />
          </button>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-4 text-center text-field-label">
          <Upload className={compact ? "h-4 w-4" : "h-6 w-6 transition-transform group-hover:scale-110"} />
          {!compact && (
            <>
              <span className="text-sm font-medium">이미지 업로드</span>
              <span className="text-xs text-field-hint">.png, .jpg, .jpeg 형식 가능</span>
            </>
          )}
        </div>
      )}

      {upload.isPending && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
          <Loader2 className="h-5 w-5 animate-spin text-primary" aria-label="업로드 중" />
        </div>
      )}
    </label>
  );
}