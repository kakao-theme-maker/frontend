// src/components/theme/customize/editor/BubbleSliceEditor.tsx
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

export interface SliceValues {
  // 위/아래에서 늘어나기 시작하는 지점, 좌/우에서 늘어나기 시작하는 지점 (이미지 px)
  capY: number;
  capX: number;
  // 글자가 놓이는 여백 (이미지 가장자리에서의 거리, 이미지 px)
  insets: { top: number; left: number; bottom: number; right: number };
}

interface BubbleSliceEditorProps {
  url: string;
  values: SliceValues;
  onChange: (next: SliceValues) => void;
}

type HandleId =
  | "capTop" | "capBottom" | "capLeft" | "capRight"
  | "padTop" | "padBottom" | "padLeft" | "padRight";

interface HandleConfig {
  id: HandleId;
  axis: "x" | "y";
  fromEnd: boolean; // true면 아래/오른쪽 가장자리에서 잰 거리
  kind: "cap" | "pad";
  label: string;
}

const HANDLES: HandleConfig[] = [
  { id: "capTop", axis: "y", fromEnd: false, kind: "cap", label: "위쪽 늘어나는 지점" },
  { id: "capBottom", axis: "y", fromEnd: true, kind: "cap", label: "아래쪽 늘어나는 지점" },
  { id: "capLeft", axis: "x", fromEnd: false, kind: "cap", label: "왼쪽 늘어나는 지점" },
  { id: "capRight", axis: "x", fromEnd: true, kind: "cap", label: "오른쪽 늘어나는 지점" },
  { id: "padTop", axis: "y", fromEnd: false, kind: "pad", label: "위쪽 여백" },
  { id: "padBottom", axis: "y", fromEnd: true, kind: "pad", label: "아래쪽 여백" },
  { id: "padLeft", axis: "x", fromEnd: false, kind: "pad", label: "왼쪽 여백" },
  { id: "padRight", axis: "x", fromEnd: true, kind: "pad", label: "오른쪽 여백" },
];

const COLORS = { cap: "#2563eb", pad: "#f59e0b" } as const;
const MAX_DISPLAY = 180;
const CHECKER =
  "repeating-conic-gradient(#e5e7eb 0% 25%, #ffffff 0% 50%) 50% / 12px 12px";

// 핸들에 해당하는 현재 값
function getValue(id: HandleId, v: SliceValues) {
  switch (id) {
    case "capTop": case "capBottom": return v.capY;
    case "capLeft": case "capRight": return v.capX;
    case "padTop": return v.insets.top;
    case "padBottom": return v.insets.bottom;
    case "padLeft": return v.insets.left;
    case "padRight": return v.insets.right;
  }
}

// 핸들 값을 바꾼 새 값 객체 (위/아래, 좌/우 늘어나는 지점은 함께 움직임)
function setValue(id: HandleId, v: SliceValues, n: number): SliceValues {
  switch (id) {
    case "capTop": case "capBottom": return { ...v, capY: n };
    case "capLeft": case "capRight": return { ...v, capX: n };
    case "padTop": return { ...v, insets: { ...v.insets, top: n } };
    case "padBottom": return { ...v, insets: { ...v.insets, bottom: n } };
    case "padLeft": return { ...v, insets: { ...v.insets, left: n } };
    case "padRight": return { ...v, insets: { ...v.insets, right: n } };
  }
}

// 핸들 값이 가질 수 있는 최대값 (늘어나는 지점은 절반까지, 여백은 반대쪽 여백과 겹치지 않을 때까지)
function maxOf(h: HandleConfig, v: SliceValues, size: number) {
  if (h.kind === "cap") return Math.floor(size / 2);
  const opposite =
    h.id === "padTop" ? v.insets.bottom
      : h.id === "padBottom" ? v.insets.top
        : h.id === "padLeft" ? v.insets.right
          : v.insets.left;
  return Math.max(0, size - opposite);
}

// 이미지 위에서 선을 끌어 늘어나는 지점(파랑)과 글자 여백(주황)을 조절하는 에디터 컴포넌트
export default function BubbleSliceEditor({ url, values, onChange }: BubbleSliceEditorProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  if (!url) {
    return <p className="mt-2 text-xs text-field-hint">이미지를 올리면 여기서 선을 끌어 조절할 수 있어요.</p>;
  }

  const scale = natural ? Math.min(MAX_DISPLAY / natural.w, MAX_DISPLAY / natural.h) : 1;

  // 포인터 위치를 이미지 px 값으로 바꿔 해당 핸들에 반영
  const update = (h: HandleConfig, clientX: number, clientY: number) => {
    if (!natural || !boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const size = h.axis === "y" ? natural.h : natural.w;
    const ratio = h.axis === "y" ? (clientY - rect.top) / rect.height : (clientX - rect.left) / rect.width;
    const raw = Math.round(ratio * size);
    const dist = h.fromEnd ? size - raw : raw;
    const next = Math.min(Math.max(0, dist), maxOf(h, values, size));
    if (next !== getValue(h.id, values)) onChange(setValue(h.id, values, next));
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (h: HandleConfig) => (e: PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    update(h, e.clientX, e.clientY);
  };

  // 방향키로 1px씩 미세 조정
  const handleKeyDown = (h: HandleConfig) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (!natural) return;
    const grow = h.axis === "y" ? (h.fromEnd ? "ArrowUp" : "ArrowDown") : h.fromEnd ? "ArrowLeft" : "ArrowRight";
    const shrink = h.axis === "y" ? (h.fromEnd ? "ArrowDown" : "ArrowUp") : h.fromEnd ? "ArrowRight" : "ArrowLeft";
    if (e.key !== grow && e.key !== shrink) return;
    e.preventDefault();
    const size = h.axis === "y" ? natural.h : natural.w;
    const next = Math.min(Math.max(0, getValue(h.id, values) + (e.key === grow ? 1 : -1)), maxOf(h, values, size));
    onChange(setValue(h.id, values, next));
  };

  const { insets } = values;

  return (
    <div className="mt-2">
      <div
        ref={boxRef}
        className="relative select-none"
        style={
          natural
            ? { width: natural.w * scale, height: natural.h * scale, background: CHECKER }
            : { background: CHECKER }
        }
      >
        <img
          src={url}
          alt=""
          draggable={false}
          onLoad={(e) => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
          className="block h-full w-full"
          style={natural ? undefined : { maxWidth: MAX_DISPLAY, maxHeight: MAX_DISPLAY }}
        />

        {natural &&
          HANDLES.map((h) => {
            const size = h.axis === "y" ? natural.h : natural.w;
            const value = getValue(h.id, values);
            const pct = ((h.fromEnd ? size - value : value) / size) * 100;
            const isY = h.axis === "y";

            return (
              <div
                key={h.id}
                role="slider"
                tabIndex={0}
                aria-label={h.label}
                aria-orientation={isY ? "vertical" : "horizontal"}
                aria-valuemin={0}
                aria-valuemax={maxOf(h, values, size)}
                aria-valuenow={value}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove(h)}
                onKeyDown={handleKeyDown(h)}
                className="absolute outline-none focus-visible:bg-black/10"
                style={{
                  touchAction: "none",
                  cursor: isY ? "row-resize" : "col-resize",
                  ...(isY
                    ? { left: 0, right: 0, top: `calc(${pct}% - 7px)`, height: 14 }
                    : { top: 0, bottom: 0, left: `calc(${pct}% - 7px)`, width: 14 }),
                }}
              >
                <div
                  className="absolute"
                  style={
                    isY
                      ? { left: 0, right: 0, top: "50%", borderTop: `1.5px dashed ${COLORS[h.kind]}` }
                      : { top: 0, bottom: 0, left: "50%", borderLeft: `1.5px dashed ${COLORS[h.kind]}` }
                  }
                />
              </div>
            );
          })}
      </div>

      <p className="mt-1.5 text-xs leading-relaxed text-field-hint">
        <span style={{ color: COLORS.cap }}>파란 선</span>: 늘어나는 지점 (위·아래 / 좌·우 같이 움직여요)
        <br />
        <span style={{ color: COLORS.pad }}>주황 선</span>: 글자 여백
        <br />
        {values.capY}×{values.capX}px · 여백 {insets.top} {insets.left} {insets.bottom} {insets.right}
      </p>
    </div>
  );
}
