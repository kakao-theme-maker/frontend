// PasscodeEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import { useThemeStore } from "@/store/customizeStore";

export default function PasscodeEditor() {
  const passcode = useThemeStore((state) => state.theme.passcode);
  const setPasscode = useThemeStore((state) => state.setPasscode);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">배경</h3>
        <div className="flex gap-4">
          <ColorChip
            label="잠금화면 배경색"
            hex={passcode.bgColor}
            onChange={(color) => setPasscode({ bgColor: color })}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">키패드</h3>
        <div className="flex gap-4">
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