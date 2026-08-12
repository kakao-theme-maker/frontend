
import { useThemeStore } from "@/store/customizeStore";
// import PreviewBullet from "./PreviewBullet";
import PreviewButton from "./PreviewButton";

interface FriendChipProps {
  label?: string;
  variant?: "horizontal" | "vertical" | "full";
  description?: string;
  isSelected?: boolean;
}

export default function PreviewFriendChip({
  label,
  variant = "full",
  description,
  // isSelected = false,
}: FriendChipProps) {
  const theme = useThemeStore(
    (state) => state.theme
  )

  return (
    <div className="relative">
      {variant === "horizontal" && (
        <div className="flex gap-2 justify-center items-center">
          <img
            src={theme.common.profileImage01}
            className="w-10 h-10 rounded-xl"
          />
          <span style={{ color: theme.common.mainTextColor }}>{label}</span>
        </div>
      )}

      {variant === "vertical" && (
        <div className="flex flex-col gap-1 justify-center items-center">
          <img
            src={theme.common.profileImage01}
            className="w-9 h-9 rounded-xl"
          />
          <span style={{ color: theme.common.mainTextColor }}
            className="text-[10px]">{label}</span>
        </div>
      )}

      {variant === "full" && (
        <div className="flex w-full gap-2 items-center p-1">
          <img
            src={theme.common.profileImage01}
            className="w-8 h-8 rounded-xl"
          />
          <div className="flex-1 flex flex-col">
            <span style={{ color: theme.common.mainTextColor }}>{label}</span>
            <span style={{ color: theme.common.mainDescriptionColor }}
              className="text-[10px]">{description}</span>
          </div>

          <PreviewButton label="선물하기" size="md" />
        </div>
      )}
      {/* //TODO::선택 배경 색과 오퍼시티 가져오기 */}
      {/* <div className="absolute -inset-x-2 inset-y-0"
        style={{
          backgroundColor: isSelected ? primary.selectedBackgroundColor : "transparent",
          opacity: isSelected ? primary.selectedBackgroundAlpha : 0,
        }} /> */}
    </div>

  );
}