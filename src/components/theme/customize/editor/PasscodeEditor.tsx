// src/components/theme/customize/editor/PasscodeEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import ImageUpload from "@/components/common/ImageUpload";
import { CODE_IMAGE_COLUMNS } from "@/config/themeAssets";
import { useThemeStore } from "@/store/customizeStore";
import EditorField from "./EditorField";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import StateImageGrid from "./StateImageGrid";

// 잠금화면(불릿, 배경, 키패드) 설정 에디터 컴포넌트
export default function PasscodeEditor() {
  const passcode = useThemeStore((state) => state.theme.passcode);
  const setPasscode = useThemeStore((state) => state.setPasscode);

  return (
    <div className="flex flex-col gap-6">
      <ColorChip
        label="잠금화면 배경색"
        hex={passcode.bgColor}
        onChange={(color) => setPasscode({ bgColor: color })}
      />

      <EditorSection title="잠금 화면 불릿">
        <p>각 칸을 눌러 이미지를 채우세요</p>
        <StateImageGrid
          columns={CODE_IMAGE_COLUMNS}
          values={passcode}
          onChange={(key, url) => setPasscode({ [key]: url })}
          getAlt={(label, selected) => `코드 아이콘 ${label} ${selected ? "선택" : "기본"}`}
        />
      </EditorSection>

      <EditorSection title="배경">
        <FieldRow>
          <EditorField label="배경 이미지">
            <ImageUpload
              value={passcode.bgImage}
              onChange={(url) => setPasscode({ bgImage: url })}
              onRemove={() => setPasscode({ bgImage: "" })}
              alt="잠금화면 배경 이미지"
            />
          </EditorField>
        </FieldRow>
      </EditorSection>

      <EditorSection title="키패드">
        <FieldRow>
          <ImageUpload
            value={passcode.keypadPressed}
            onChange={(url) => setPasscode({ keypadPressed: url })}
            onRemove={() => setPasscode({ keypadPressed: "" })}
            alt="키패드 입력 이미지"
          />
          <ColorChip
            label="키패드 배경"
            hex={passcode.keypadBGColor}
            onChange={(color) => setPasscode({ keypadBGColor: color })}
          />
          <ColorChip
            label="키패드 텍스트"
            hex={passcode.keypadTextColor}
            onChange={(color) => setPasscode({ keypadTextColor: color })}
          />
        </FieldRow>
      </EditorSection>
    </div>
  );
}
