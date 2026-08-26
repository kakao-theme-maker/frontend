// src/components/theme/customize/screen/PasscodeScreenPreview.tsx
import { useThemeStore } from "@/store/customizeStore";
import PreviewBullet from "../preview/PreviewBullet";
import PreviewKeypadNumber from "../preview/PreviewKeypadNumber";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "delete"];

export default function PasscodeScreenPreview() {
  const common = useThemeStore((state) => state.theme.common);
  const passcode = useThemeStore((state) => state.theme.passcode);

  return (
    <div className="relative w-full h-full rounded-2xl items-center justify-center flex flex-col">
      <div className="w-full h-12 rounded-t-2xl" style={{ backgroundColor: passcode.bgColor }} />
      <div
        className="flex-1 w-full flex flex-col items-center justify-center gap-2"
        style={{
          backgroundImage: `url(${passcode.bgImage})`,
          backgroundSize: "cover",       // "100% auto" → "cover": 박스를 항상 꽉 채움
          backgroundRepeat: "no-repeat", // 반복(tile) 방지
          backgroundPosition: "center",
          color: common.mainTextColor,
        }}
      >
        <p className="text-xl">비밀번호</p>
        <p className="font-thin">카카오톡 암호를 입력해주세요.</p>
        <section className="grid grid-cols-4 gap-2 mt-4">
          <PreviewBullet filled emptyImage={passcode.codeImage01} filledImage={passcode.codeImage01Selected} />
          <PreviewBullet filled emptyImage={passcode.codeImage02} filledImage={passcode.codeImage02Selected} />
          <PreviewBullet emptyImage={passcode.codeImage03} filledImage={passcode.codeImage03Selected} />
          <PreviewBullet emptyImage={passcode.codeImage04} filledImage={passcode.codeImage04Selected} />
        </section>
      </div>
      <div className="flex w-full h-54 items-center justify-center p-4 rounded-b-2xl" style={{ backgroundColor: passcode.keypadBGColor }}>
        <div className="grid grid-cols-3 gap-x-10">
          {KEYS.map((key, i) => (
            <div key={i} className="relative" style={{ color: passcode.keypadTextColor }}>
              {i === 4 && (
                <img src={passcode.keypadPressed} className="absolute inset-0 w-full h-full object-contain" />
              )}
              <PreviewKeypadNumber value={key} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}