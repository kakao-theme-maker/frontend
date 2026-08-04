import { Upload } from "lucide-react";
import { useState } from "react";

export default function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>,) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <label
      className="
        block h-24 w-full cursor-pointer
        overflow-hidden rounded-xl
        border border-dashed border-[#aab6d8]
        bg-[#E4EBFE]
      "
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <img
          src={preview}
          alt="테마 미리보기"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-[#5B6C9B]">
          <Upload />
          <span>이미지 업로드</span>
          <span>.png, .jpg, .jpeg 형식 가능</span>
        </div>
      )}
    </label>
  );
}