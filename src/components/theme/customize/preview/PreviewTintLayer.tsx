// src/components/theme/customize/preview/PreviewTintLayer.tsx
interface PreviewTintLayerProps {
  color: string;
}

// 부모 영역을 둥글게 덮는 단색 배경 레이어 컴포넌트
export default function PreviewTintLayer({ color }: PreviewTintLayerProps) {
  return (
    <div
      className="absolute inset-0 rounded-full"
      style={{ backgroundColor: color, opacity: 30 }}
    />
  );
}
