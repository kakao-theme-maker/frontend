// src/components/theme/customize/editor/PasscodeEditor.tsx
import { CODE_IMAGE_COLUMNS } from "@/config/themeAssets";
import { useThemeStore } from "@/store/customizeStore";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import StateImageGrid from "./StateImageGrid";
import ThemeColorChip from "./ThemeColorChip";
import ThemeImageField from "./ThemeImageField";

// 잠금화면(불릿, 배경, 키패드) 설정 에디터 컴포넌트
export default function PasscodeEditor() {
  const passcode = useThemeStore((state) => state.theme.passcode);
  const setPasscode = useThemeStore((state) => state.setPasscode);

  return (
    <div className="flex flex-col gap-6">
      <ThemeColorChip section="passcode" field="bgColor" label="잠금화면 배경색" />

      <EditorSection title="잠금 화면 불릿">
        <p>각 칸을 눌러 이미지를 채우세요</p>
        <StateImageGrid
          section="passcode"
          columns={CODE_IMAGE_COLUMNS}
          values={passcode}
          onChange={(key, url) => setPasscode({ [key]: url })}
          getAlt={(label, selected) => `코드 아이콘 ${label} ${selected ? "선택" : "기본"}`}
        />
      </EditorSection>

      <EditorSection title="배경">
        <FieldRow>
          <ThemeImageField section="passcode" field="bgImage" label="배경 이미지" alt="잠금화면 배경 이미지" />
        </FieldRow>
      </EditorSection>

      <EditorSection title="키패드">
        <FieldRow>
          <ThemeColorChip section="passcode" field="keypadBGColor" label="키패드 배경" />
          <ThemeColorChip section="passcode" field="keypadTextColor" label="키패드 텍스트" />
        </FieldRow>
      </EditorSection>
    </div>
  );
}