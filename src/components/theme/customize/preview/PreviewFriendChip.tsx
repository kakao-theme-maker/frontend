// src/components/theme/customize/preview/PreviewFriendChip.tsx
import { useThemeStore } from "@/store/customizeStore";
import PreviewButton from "./PreviewButton";

interface FriendChipProps {
  label?: string;
  variant?: "horizontal" | "vertical" | "full";
  description?: string;
  isSelected?: boolean;
}

// 친구 칩 프리뷰 컴포넌트
export default function PreviewFriendChip({
  label,
  variant = "full",
  description,
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
    </div>

  );
}