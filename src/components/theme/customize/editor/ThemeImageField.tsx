// src/components/theme/customize/editor/ThemeImageField.tsx
import ImageUpload from "@/components/common/ImageUpload";
import { typeCodeOf } from "@/config/themeStyleMap";
import { useThemeStore } from "@/store/customizeStore";
import type { SimpleThemeConfig } from "@/types/theme";
import EditorField from "./EditorField";

interface ThemeImageFieldProps<K extends keyof SimpleThemeConfig> {
  section: K;
  field: keyof SimpleThemeConfig[K];
  label: string;
  alt: string;
  // false면 업로드한 이미지를 지우는 버튼을 보여주지 않음
  removable?: boolean;
}

// 테마 스토어의 이미지 값(section.field)을 바로 읽고 수정하는 라벨 붙은 업로드 필드 컴포넌트
export default function ThemeImageField<K extends keyof SimpleThemeConfig>({
  section,
  field,
  label,
  alt,
  removable = true,
}: ThemeImageFieldProps<K>) {
  const value = useThemeStore((state) => state.theme[section][field]) as string;
  const setSection = useThemeStore((state) => state.setSection);

  const update = (url: string) =>
    setSection(section, { [field]: url } as unknown as Partial<SimpleThemeConfig[K]>);

  return (
    <EditorField label={label}>
      <ImageUpload
        typeCode={typeCodeOf(section, String(field))}
        value={value}
        onChange={update}
        onRemove={removable ? () => update("") : undefined}
        alt={alt}
      />
    </EditorField>
  );
}
