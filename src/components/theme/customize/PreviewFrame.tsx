// src/components/theme/customize/PreviewFrame.tsx
import { useEffect, useRef, useState, type ComponentType } from "react";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 700;

interface PreviewFrameProps {
  Screen: ComponentType;
}

export default function PreviewFrame({ Screen }: PreviewFrameProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const updateScale = () => {
      // border 영향 없는 순수 콘텐츠 폭 기준으로 스케일 계산
      setScale(el.clientWidth / BASE_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full aspect-390/700 rounded-xl overflow-hidden mx-auto border border-gray-300">
      {/* 측정 전용 레이어: 실제 콘텐츠 표시 영역의 순수 폭만 잰다 */}
      <div ref={measureRef} className="absolute inset-0" />

      {scale > 0 && (
        <div
          className="absolute top-0 left-0 text-xs"
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Screen />
        </div>
      )}
    </div>
  );
}