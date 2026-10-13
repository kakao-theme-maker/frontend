// src/components/home/ThemeCard.tsx
import { Link } from "react-router-dom";
import defaultIcon from "@/assets/images/commonIcoTheme.png";
import type { Theme } from "@/api/types";
import ThemeCardBase from "@/components/common/ThemeCardBase";
import { formatDate } from "@/utils/format";

interface ThemeCardProps {
  theme: Theme;
  to?: string;
}

// 홈 화면 테마 카드 컴포넌트 (to가 있으면 해당 주소로 이동하는 링크)
export default function ThemeCard({ theme, to }: ThemeCardProps) {
  const card = (
    <ThemeCardBase
      image={theme.previewImageUrl || defaultIcon}
      title={theme.themeName}
      subtitle={formatDate(theme.createdAt)}
    />
  );

  return to ? (
    <Link to={to} className="block min-w-0">
      {card}
    </Link>
  ) : (
    card
  );
}