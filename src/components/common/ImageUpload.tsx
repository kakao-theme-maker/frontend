// src/components/common/ImageUpload.tsx
import { Upload, X } from "lucide-react";
import { usePendingImageStore } from "@/store/pendingImageStore";

interface ImageUploadProps {
  // 이 이미지가 쓰일 슬롯(typeCode). 서버가 이미지 종류별로 이미지를 관리함
  typeCode: string;
  value?: string | null;
  onChange: (url: string) => void;
  onRemove?: () => void;
  alt?: string;
  size?: number;
}

// 이미지 업로드 및 미리보기 컴포넌트
export default function ImageUpload({
  typeCode,
  value,
  onChange,
  onRemove,
  alt = "이미지 미리보기",
  size,
}: ImageUploadProps) {
  const compact = size !== undefined && size <= 72;
  const setFile = usePendingImageStore((state) => state.setFile);
  const markRemoved = usePendingImageStore((state) => state.markRemoved);

  // 선택한 PNG 파일을 저장 전까지 보관하고, 미리보기용 blob URL을 전달 (서버 전송은 테마 저장 시 한 번에)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!typeCode) {
      window.alert("이 이미지는 저장할 수 없는 항목이에요.");
      return;
    }
    if (file.type !== "image/png" || file.size === 0) {
      window.alert("PNG 이미지만 업로드할 수 있어요.");
      return;
    }

    setFile(typeCode, file);
    onChange(URL.createObjectURL(file));
  };

  // 업로드한 이미지 제거 처리
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeCode) markRemoved(typeCode);
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
        accept="image/png"
        onChange={handleChange}
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
              <span className="text-xs text-field-hint">.png 형식만 가능</span>
            </>
          )}
        </div>
      )}
    </label>
  );
}