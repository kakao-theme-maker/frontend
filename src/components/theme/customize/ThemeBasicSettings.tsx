// src/components/theme/customize/ThemeBasicSettings.tsx
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { useThemeStore } from "@/store/customizeStore";
import EditorField from "./editor/EditorField";
import ThemeColorChip from "./editor/ThemeColorChip";
import ThemeImageField from "./editor/ThemeImageField";

// 테마 기본 설정 패널 컴포넌트
export default function ThemeBasicSettings() {
  const themeName = useThemeStore((state) => state.themeName);
  const setThemeName = useThemeStore((state) => state.setThemeName);

  return (
    <Card size="sm">
      <h2 className="mb-4 text-base font-semibold">테마 기본 설정</h2>

      <div className="grid grid-cols-2 gap-4">
        <EditorField label="테마 이름">
          <Input
            type="text"
            variant="dashed"
            value={themeName ?? ""}
            onChange={(e) => setThemeName(e.target.value)}
          />
        </EditorField>
        <EditorField label="제작자">
          <Input type="text" variant="dashed" />
        </EditorField>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <ThemeImageField section="common" field="mainBGImage" label="테마 이미지" alt="테마 배경 이미지" />
        <ThemeImageField section="common" field="profileImage01" label="기본 프로필" alt="기본 프로필 이미지" />

        <div className="flex gap-4">
          <ThemeColorChip section="common" field="mainBGColor" label="메인 컬러" />
          <ThemeColorChip section="common" field="mainTextColor" label="메인 텍스트" />
          <ThemeColorChip section="common" field="mainDescriptionColor" label="서브 텍스트" />
        </div>
      </div>
    </Card>
  );
}