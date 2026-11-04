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

// 아직 서버에 보내지 않은 이미지 변경분
export interface PendingImages {
  // typeCode -> 새로 고른 PNG 파일 (multipart part로 전송)
  files: Record<string, File>;
  // 연결을 제거하려는 typeCode (deleteTypeCodes로 전송)
  removed: string[];
}

// 스토어의 테마 설정을 서버 수정 요청 형태로 변환
// pending: 저장 전 이미지 변경분 (파일은 JSON이 아니라 별도 part로 보내므로 여기엔 삭제 목록만 반영)
// base: 서버의 현재 테마 (서버에 연결된 typeCode만 삭제·inset 수정 대상으로 삼기 위함)
export function toThemeUpdateRequest(
  theme: SimpleThemeConfig,
  themeName: string,
  pending: PendingImages,
  base: ThemeDetailResponse,
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
  const deleteTypeCodes: string[] = [];
  const removed = new Set(pending.removed);

  for (const { section, key, typeCode, insetKey } of IMAGE_TYPE_MAP) {
    const hasFile = typeCode in pending.files;
    const linked = typeCode in base.typeCodes;

    // 같은 typeCode의 업로드와 삭제를 동시에 보내면 400이므로, 파일이 있으면 삭제하지 않음
    if (!hasFile && removed.has(typeCode) && linked) {
      deleteTypeCodes.push(typeCode);
      continue;
    }

    // 일반 이미지는 파일 part만으로 충분. 말풍선만 inset을 JSON으로 함께 보냄
    if (insetKey === undefined || !(hasFile || linked)) continue;

    // 말풍선: 이미지를 바꾸지 않았어도 여백이 바뀌었을 수 있어서 항상 인셋을 함께 보냄
    const asset = parseAsset(read(theme, section, key));
    const { top, left, bottom, right } = parseEdgeInsets(read(theme, section, insetKey));
    typeCodes[typeCode] = {
      inset: { top, left, bottom, right, stretchX: asset.width, stretchY: asset.height },
    };
  }

  return {
    themeName,
    typeCodes,
    styleCodes,
    ...(deleteTypeCodes.length > 0 && { deleteTypeCodes }),
  };
}

// 서버의 테마를 스토어에 반영할 값으로 변환
export function fromThemeDetail(detail: ThemeDetailResponse): {
  themeName: string;
  patch: ThemePatch;
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

  for (const { section, key, typeCode, insetKey } of IMAGE_TYPE_MAP) {
    const info = detail.typeCodes[typeCode];
    if (!info?.imageUrl) continue;

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

  return { themeName: detail.themeName, patch };
}