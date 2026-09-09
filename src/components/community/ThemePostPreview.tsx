// src/components/community/ThemePostPreviewProps.tsx
interface ThemePostPreviewProps {
  images: string[];
}

export default function ThemePostPreview({ images }: ThemePostPreviewProps) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 sm:grid-cols-4 sm:p-8">
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
    </div>
  );
}