// src/components/home/ThemeCard.tsx
import defaultIcon from "@/assets/images/commonIcoTheme.png";
import type { Theme } from "@/api/types";
import ThemeCardBase from "@/components/common/ThemeCardBase";
import { formatDate } from "@/utils/format";

interface ThemeCardProps {
  theme: Theme;
}

// 홈 화면 테마 카드 컴포넌트
export default function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <ThemeCardBase
      image={theme.previewImageUrl || defaultIcon}
      title={theme.themeName}
      subtitle={formatDate(theme.createdAt)}
    />
  );
}
