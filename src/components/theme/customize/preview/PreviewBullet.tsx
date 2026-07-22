interface BulletProps {
  filled?: boolean;
  emptyImage?: string
  filledImage?: string
}

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