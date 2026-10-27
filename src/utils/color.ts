// src/utils/color.ts
// 스토어의 색상은 "#RRGGBB"(불투명) 또는 "#RRGGBBAA" 형태로 저장하고, 서버와는 색상(#RRGGBB) + 알파(0~100)로 주고받음

// "#abc", "#abcd" 같은 축약형을 6자리/8자리로 펼침
const expand = (digits: string) =>
  digits.length === 3 || digits.length === 4
    ? digits.split("").map((c) => c + c).join("")
    : digits;

// 색상 문자열을 "#RRGGBB" 와 알파(0~100)로 분리
export function splitHexAlpha(value: string): { hex: string; alpha: number } {
  const digits = expand(value.replace("#", "").trim());
  const hex = `#${digits.slice(0, 6)}`;
  if (digits.length < 8) return { hex, alpha: 100 };
  const alpha = Math.round((parseInt(digits.slice(6, 8), 16) * 100) / 255);
  return { hex, alpha: Number.isNaN(alpha) ? 100 : alpha };
}

// "#RRGGBB" 와 알파(0~100)를 합침 (불투명이면 6자리 그대로)
export function joinHexAlpha(hex: string, alpha: number): string {
  const { hex: rgb } = splitHexAlpha(hex);
  const percent = Math.min(100, Math.max(0, Math.round(alpha)));
  if (percent === 100) return rgb;
  return `${rgb}${Math.round((percent * 255) / 100).toString(16).padStart(2, "0")}`;
}

// 색상의 기존 알파에 비율(0~1)을 곱한 색상 반환 (연한 테두리 등에 사용)
export function scaleAlpha(color: string, factor: number): string {
  const { hex, alpha } = splitHexAlpha(color);
  return joinHexAlpha(hex, alpha * factor);
}
