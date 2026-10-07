// src/components/theme/customize/ThemeBasicSettings.tsx
import Card from "@/components/common/Card";
import ColorChip from "@/components/common/ColorChip";
import ImageUpload from "@/components/common/ImageUpload";
import Input from "@/components/common/Input";
import { useThemeStore } from "@/store/customizeStore";
import EditorField from "./editor/EditorField";

// 테마 기본 설정 패널 컴포넌트
export default function ThemeBasicSettings() {
  const common = useThemeStore((state) => state.theme.common);
  const setCommon = useThemeStore((state) => state.setCommon);
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
        <EditorField label="테마 이미지">
          <ImageUpload
            value={common.mainBGImage}
            onChange={(url) => setCommon({ mainBGImage: url })}
            onRemove={() => setCommon({ mainBGImage: "" })}
            alt="테마 배경 이미지"
          />
        </EditorField>

        <EditorField label="기본 프로필">
          <ImageUpload
            value={common.profileImage01}
            onChange={(url) => setCommon({ profileImage01: url })}
            onRemove={() => setCommon({ profileImage01: "" })}
            alt="기본 프로필 이미지"
          />
        </EditorField>

        <div className="flex gap-4">
          <ColorChip
            label="메인 컬러"
            hex={common.mainBGColor}
            onChange={(color) => setCommon({ mainBGColor: color })}
          />
          <ColorChip
            label="메인 텍스트"
            hex={common.mainTextColor}
            onChange={(color) => setCommon({ mainTextColor: color })}
          />
          <ColorChip
            label="서브 텍스트"
            hex={common.mainDescriptionColor}
            onChange={(color) => setCommon({ mainDescriptionColor: color })}
          />
        </div>
      </div>
    </Card>
  );
}
