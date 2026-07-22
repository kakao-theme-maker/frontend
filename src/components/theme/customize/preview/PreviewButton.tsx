import { useThemeStore } from "@/store/customizeStore";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonPreviewProps {
  label: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
  size?: ButtonSize;
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-5 px-2 py-0.5 text-[10px] font-normal",
  md: "h-6 px-2.5 py-1 text-xs font-light",
  lg: "h-7 px-3 py-1 text-xs",
};


export default function PreviewButton({
  label, isSelected, size = "lg" }: ButtonPreviewProps) {
  const common = useThemeStore(
    (state) => state.theme.common
  )

  return (
    <button className={`border border-black rounded-3xl ${sizeStyles[size]}`}
      style={{
        color: isSelected ? common.mainBGColor : common.mainTextColor,
        backgroundColor: isSelected ? common.mainTextColor : common.mainBGColor,
        borderColor: `${common.mainTextColor}30`,
      }}>
      {label}
    </button>
  )
}