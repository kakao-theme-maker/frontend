// src/utils/themeRequest.ts
import type {
  Inset, ThemeDetailResponse, ThemeImageUpdateRequest, ThemeStyleUpdateRequest, ThemeUpdateRequest,
} from "@/api/types";
import { COLOR_STYLE_MAP, IMAGE_TYPE_MAP } from "@/config/themeStyleMap";
import type { SimpleThemeConfig } from "@/types/theme";
import { formatAsset, parseAsset, parseEdgeInsets } from "@/utils/bubbleStyle";
import { joinHexAlpha, splitHexAlpha } from "@/utils/color";

type Section = keyof SimpleThemeConfig;
// 섹션별로 바뀐 값만 담은 테마 설정 (스토어에 덮어쓸 값)
export type ThemePatch = Partial<Record<Section, Record<string, string>>>;

// 섹션/키로 스토어 값을 읽기
function read(theme: SimpleThemeConfig, section: Section, key: string): string {
  return (theme[section] as unknown as Record<string, string>)[key] ?? "";
}

// 스토어의 테마 설정을 서버 수정 요청 형태로 변환
// uploadedIds: 이미지 URL -> designComponentId (업로드했거나 서버에서 받은 이미지)
// base: 서버의 현재 테마 (말풍선 인셋만 바꾼 경우 기존 이미지 ID를 쓰기 위함)
export function toThemeUpdateRequest(
  theme: SimpleThemeConfig,
  themeName: string,
  uploadedIds: Record<string, number>,
  base?: ThemeDetailResponse,
): ThemeUpdateRequest {
  const styleCodes: Record<string, ThemeStyleUpdateRequest> = {};
  for (const { section, key, styleCode } of COLOR_STYLE_MAP) {
    const color = read(theme, section, key);
    if (!color) continue;
    // 스토어 색상("#RRGGBB" 또는 "#RRGGBBAA")을 색상과 알파(0~100)로 나눠 보냄
    const { hex, alpha } = splitHexAlpha(color);
    styleCodes[styleCode] = { color: hex, alpha };
  }

  const typeCodes: Record<string, ThemeImageUpdateRequest> = {};
  for (const { section, key, typeCode, insetKey } of IMAGE_TYPE_MAP) {
    const value = read(theme, section, key);
    // 말풍선 값은 "url 가로 세로" 형태라서 첫 토큰만 URL로 사용
    const asset = parseAsset(value);
    const uploadedId = asset.url ? uploadedIds[asset.url] : undefined;

    if (insetKey === undefined) {
      if (uploadedId !== undefined) typeCodes[typeCode] = { designComponentId: uploadedId };
      continue;
    }

    // 말풍선: 이미지를 바꾸지 않았어도 여백이 바뀌었을 수 있어서 항상 인셋을 함께 보냄
    const designComponentId = uploadedId ?? base?.typeCodes[typeCode]?.designComponentId;
    if (designComponentId === undefined) continue;
    const { top, left, bottom, right } = parseEdgeInsets(read(theme, section, insetKey));
    typeCodes[typeCode] = {
      designComponentId,
      inset: { top, left, bottom, right, stretchX: asset.width, stretchY: asset.height },
    };
  }

  return { themeName, typeCodes, styleCodes };
}

// 서버의 테마를 스토어에 반영할 값으로 변환 (이미지 URL -> designComponentId 목록도 함께 반환)
export function fromThemeDetail(detail: ThemeDetailResponse): {
  themeName: string;
  patch: ThemePatch;
  imageIds: Record<string, number>;
} {
  const patch: ThemePatch = {};
  const set = (section: Section, key: string, value: string) => {
    patch[section] = { ...patch[section], [key]: value };
  };

  for (const { section, key, styleCode } of COLOR_STYLE_MAP) {
    const style = detail.styleCodes[styleCode];
    // 서버의 색상(#RRGGBB)과 알파(0~100)를 스토어의 한 값으로 합침
    if (style?.color) set(section, key, joinHexAlpha(style.color, style.alpha ?? 100));
  }

  const imageIds: Record<string, number> = {};
  for (const { section, key, typeCode, insetKey } of IMAGE_TYPE_MAP) {
    const info = detail.typeCodes[typeCode];
    if (!info?.imageUrl) continue;
    imageIds[info.imageUrl] = info.designComponentId;

    if (insetKey === undefined) {
      set(section, key, info.imageUrl);
      continue;
    }
    // 말풍선: 이미지와 늘어나는 위치("url 가로 세로"), 내용 여백("위 왼쪽 아래 오른쪽")을 함께 반영
    const inset: Inset | null | undefined = info.inset;
    if (inset) {
      set(section, key, formatAsset(info.imageUrl, inset.stretchX, inset.stretchY));
      set(section, insetKey, `${inset.top}px ${inset.left}px ${inset.bottom}px ${inset.right}px`);
    }
    // 인셋이 없으면 기존 기본값(이미지·크기·여백)을 그대로 유지
  }

  return { themeName: detail.themeName, patch, imageIds };
}