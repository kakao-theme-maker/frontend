// src/components/theme/customize/editor/ThemeColorChip.tsx
import ColorChip from "@/components/common/ColorChip";
import { useThemeStore } from "@/store/customizeStore";
import type { SimpleThemeConfig } from "@/types/theme";

interface ThemeColorChipProps<K extends keyof SimpleThemeConfig> {
  section: K;
  field: keyof SimpleThemeConfig[K];
  label: string;
}

// 테마 스토어의 색상 값(section.field)을 바로 읽고 수정하는 색상 칩 컴포넌트
export default function ThemeColorChip<K extends keyof SimpleThemeConfig>({
  section,
  field,
  label,
}: ThemeColorChipProps<K>) {
  const hex = useThemeStore((state) => state.theme[section][field]) as string;
  const setSection = useThemeStore((state) => state.setSection);

  return (
    <ColorChip
      label={label}
      hex={hex}
      onChange={(color) => setSection(section, { [field]: color } as unknown as Partial<SimpleThemeConfig[K]>)}
    />
  );
}
