// src/utils/themeRequest.ts
import type { ThemeImageRequest, ThemeStyle, ThemeStyleRequest, ThemeUpsertRequest } from "@/api/types";
import { COLOR_STYLE_MAP, IMAGE_TYPE_MAP, type ColorEntry } from "@/config/themeStyleMap";
import type { SimpleThemeConfig } from "@/types/theme";

// 스토어의 테마 설정을 서버 저장 요청 형태로 변환
// uploadedIds: 업로드한 이미지 URL -> designComponentId (기본 이미지처럼 업로드하지 않은 이미지는 제외)
export function toThemeUpsertRequest(
  theme: SimpleThemeConfig,
  themeName: string,
  userEmail: string,
  uploadedIds: Record<string, number>,
): ThemeUpsertRequest {
  const styles: ThemeStyleRequest[] = [];
  for (const { section, key, colorStyleId } of COLOR_STYLE_MAP) {
    if (colorStyleId === null) continue;
    const color = (theme[section] as unknown as Record<string, string>)[key];
    if (color) styles.push({ colorStyleId, color });
  }

  const images: ThemeImageRequest[] = [];
  for (const { section, key, componentTypeId } of IMAGE_TYPE_MAP) {
    if (componentTypeId === null) continue;
    const value = (theme[section] as unknown as Record<string, string>)[key];
    // 말풍선 값은 "url 가로 세로" 형태라서 첫 토큰만 URL로 사용
    const designComponentId = value ? uploadedIds[value.split(" ")[0]] : undefined;
    if (designComponentId !== undefined) images.push({ designComponentId, componentTypeId });
  }

  return { userEmail, themeName, styles, images };
}

// 서버에서 받은 스타일 목록을 스토어에 반영할 색상 항목으로 변환
export function toColorEntries(styles: ThemeStyle[] = []): ColorEntry[] {
  const entries: ColorEntry[] = [];
  for (const { section, key, colorStyleId } of COLOR_STYLE_MAP) {
    if (colorStyleId === null) continue;
    const style = styles.find((s) => s.colorStyleId === colorStyleId);
    if (style?.color) entries.push({ section, key, color: style.color });
  }
  return entries;
}
