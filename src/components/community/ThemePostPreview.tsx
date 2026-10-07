// src/components/community/ThemePostPreview.tsx
import Card from "@/components/common/Card";

interface ThemePostPreviewProps {
  images: string[];
}

// 게시글 미리보기 이미지 그리드 컴포넌트
export default function ThemePostPreview({ images }: ThemePostPreviewProps) {
  return (
    <Card className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="aspect-390/700 w-full overflow-hidden rounded-xl border border-slate-300"
        >
          <img
            src={image}
            alt={`미리보기 ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </Card>
  );
}
