// src/components/common/ColorChip.tsx
import { useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import { Pipette } from "lucide-react";
import { joinHexAlpha, splitHexAlpha } from "@/utils/color";

type ColorChipProps = {
  label: string;
  // "#RRGGBB" 또는 투명도가 있는 "#RRGGBBAA"
  hex: string;
  onChange: (color: string) => void;
};

// 브라우저 스포이드(EyeDropper API) - Chromium 계열에서만 지원
type EyeDropperConstructor = new () => { open: () => Promise<{ sRGBHex: string }> };
const getEyeDropper = () =>
  (window as unknown as { EyeDropper?: EyeDropperConstructor }).EyeDropper;

// 투명도가 보이도록 체크무늬 위에 색을 올리는 배경
const checkerBackground = (color: string) => ({
  backgroundImage: `linear-gradient(${color}, ${color}), conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)`,
  backgroundSize: "auto, 8px 8px",
});

// 색상 칩을 눌러 컬러 피커(색상·투명도·스포이드)를 여는 컴포넌트
export default function ColorChip({
  label,
  hex,
  onChange,
}: ColorChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { hex: rgb, alpha } = splitHexAlpha(hex);
  const EyeDropper = getEyeDropper();

  // 화면에서 색을 집어 색상만 바꾸고 투명도는 유지 (취소하면 아무 일도 안 함)
  const handleEyeDropper = async () => {
    if (!EyeDropper) return;
    try {
      const { sRGBHex } = await new EyeDropper().open();
      onChange(joinHexAlpha(sRGBHex, alpha));
    } catch {
      // 사용자가 Esc로 취소한 경우
    }
  };

  // 투명도 입력(0~100) 반영, 숫자가 아니면 무시
  const handleAlphaChange = (value: string) => {
    const next = parseInt(value, 10);
    if (Number.isNaN(next)) return;
    onChange(joinHexAlpha(rgb, next));
  };

  return (
    <div className="relative">
      <p className="mb-2 text-sm">
        {label}
      </p>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <span
          className="h-5 w-5 rounded-md border border-black/10"
          style={checkerBackground(hex)}
        />

        <span className="text-sm">
          {rgb}
          {alpha < 100 && <span className="ml-1 text-xs opacity-60">{alpha}%</span>}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full left-0 z-20 mt-2 rounded-lg bg-white p-3 shadow-lg">
            <HexAlphaColorPicker
              color={hex}
              onChange={onChange}
            />

            <HexColorInput
              color={rgb}
              onChange={(color) => onChange(joinHexAlpha(color, alpha))}
              prefixed
              className="mt-3 w-full rounded border px-2 py-1"
            />

            <div className="mt-2 flex items-center gap-2">
              <label className="flex flex-1 items-center gap-1 text-sm">
                투명도
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={alpha}
                  onChange={(e) => handleAlphaChange(e.target.value)}
                  className="w-16 rounded border px-2 py-1"
                />
                %
              </label>

              {EyeDropper && (
                <button
                  type="button"
                  onClick={handleEyeDropper}
                  aria-label="스포이드로 색상 선택"
                  title="스포이드"
                  className="rounded border p-1.5 hover:bg-gray-50"
                >
                  <Pipette size={16} />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
