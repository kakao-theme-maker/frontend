import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove?: () => void;
  alt?: string;
  size?: number; // px. 생략 시 기본(최대 100px) 크기
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  alt = "이미지 미리보기",
  size,
}: ImageUploadProps) {
  const compact = size !== undefined && size <= 72;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(URL.createObjectURL(file));
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <label
      className={`
        group relative block cursor-pointer overflow-hidden rounded-2xl
        border border-dashed border-[#aab6d8]
        bg-[#E4EBFE] transition-colors
        hover:border-[#8398c9] hover:bg-[#DCE4FD]
        ${size ? "" : "aspect-square w-full max-w-[100px]"}
      `}
      style={size ? { width: size, height: size } : undefined}
    >
      <input
        type="file"
        accept="image/*"
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
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-4 text-center text-[#5B6C9B]">
          <Upload className={compact ? "h-4 w-4" : "h-6 w-6 transition-transform group-hover:scale-110"} />
          {!compact && (
            <>
              <span className="text-sm font-medium">이미지 업로드</span>
              <span className="text-xs text-[#8494bf]">.png, .jpg, .jpeg 형식 가능</span>
            </>
          )}
        </div>
      )}
    </label>
  );
}