// src/components/theme/customize/preview/PreviewAdBanner.tsx
interface PreviewAdBannerProps {
  className?: string;
}

// 광고 영역 자리표시 프리뷰 컴포넌트
export default function PreviewAdBanner({ className = "" }: PreviewAdBannerProps) {
  return (
    <div className={`relative flex w-full h-16 bg-gray-100 rounded-lg p-4 ${className}`}>
      <p className="absolute">광고</p>
    </div>
  );
}
