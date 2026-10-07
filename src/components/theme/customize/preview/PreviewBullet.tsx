// src/components/theme/customize/preview/PreviewBullet.tsx
interface BulletProps {
  filled?: boolean;
  emptyImage?: string
  filledImage?: string
}

// 잠금화면 불릿 프리뷰 컴포넌트
export default function PreviewBullet({ filled = false, emptyImage, filledImage }: BulletProps) {
  const image = filled ? filledImage : emptyImage

  return (
    <div className="flex w-8 h-8 items-center justify-center">
      <img
        src={image}
      />
    </div>
  )
}