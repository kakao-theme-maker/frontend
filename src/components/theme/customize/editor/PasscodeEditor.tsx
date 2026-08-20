// PasscodeEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import ImageUpload from "@/components/common/ImageUpload";
import { useThemeStore } from "@/store/customizeStore";

const CODE_IMAGE_KEYS = [
  { key: "codeImage01", selectedKey: "codeImage01Selected", label: "첫 번째" },
  { key: "codeImage02", selectedKey: "codeImage02Selected", label: "두 번째" },
  { key: "codeImage03", selectedKey: "codeImage03Selected", label: "새 번째" },
  { key: "codeImage04", selectedKey: "codeImage04Selected", label: "네 번째" },
] as const;

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
      {/* 잠금 화면 불릿 */}
      <div>
        <h3 className="text-sm font-semibold mb-2">잠금 화면 불릿</h3>
        <p>각 칸을 눌러 이미지를 채우세요</p>
        <div className="grid grid-cols-[56px_repeat(4,48px)] items-center gap-x-3 gap-y-3">
          <div />
          {CODE_IMAGE_KEYS.map((item) => (
            <span
              key={item.key}
              className="text-center text-xs font-medium text-[#5B6C9B]"
            >
              {item.label}
            </span>
          ))}

          <span className="text-sm text-[#5B6C9B]">안눌림</span>
          {CODE_IMAGE_KEYS.map((item) => (
            <ImageUpload
              key={item.key}
              size={48}
              value={passcode[item.key]}
              onChange={(url) => setPasscode({ [item.key]: url })}
              onRemove={() => setPasscode({ [item.key]: "" })}
              alt={`코드 아이콘 ${item.label} 기본`}
            />
          ))}

          <span className="text-sm text-[#5B6C9B]">눌림</span>
          {CODE_IMAGE_KEYS.map((item) => (
            <ImageUpload
              key={item.selectedKey}
              size={48}
              value={passcode[item.selectedKey]}
              onChange={(url) => setPasscode({ [item.selectedKey]: url })}
              onRemove={() => setPasscode({ [item.selectedKey]: "" })}
              alt={`코드 아이콘 ${item.label} 선택`}
            />
          ))}
        </div>
      </div>

      {/* 배경 */}
      <div>
        <h3 className="text-sm font-semibold mb-2">배경</h3>
        <div className="flex flex-wrap items-start gap-4">
          <div>
            <span className="block text-sm text-[#5B6C9B]">배경 이미지</span>
            <ImageUpload
              value={passcode.bgImage}
              onChange={(url) => setPasscode({ bgImage: url })}
              onRemove={() => setPasscode({ bgImage: "" })}
              alt="잠금화면 배경 이미지"
            />

          </div>

        </div>
      </div>



      {/* 키패드 */}
      <div>
        <h3 className="text-sm font-semibold mb-2">키패드</h3>
        <div className="flex gap-4">
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
        </div>
      </div>
    </div>
  );
}