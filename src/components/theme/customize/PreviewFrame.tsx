// src/components/theme/customize/PreviewFrame.tsx
import { useEffect, useRef, useState, type ComponentType } from "react";

const BASE_WIDTH = 390;
const BASE_HEIGHT = 700;

interface PreviewFrameProps {
  Screen: ComponentType;
}

// 390x700 기준 화면을 컨테이너 폭에 맞춰 스케일링하는 프레임
export default function PreviewFrame({ Screen }: PreviewFrameProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    // 컨테이너 폭 기준으로 스케일 값 갱신
    const updateScale = () => {
      setScale(el.clientWidth / BASE_WIDTH);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full aspect-390/700 rounded-xl overflow-hidden mx-auto border border-slate-300">
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