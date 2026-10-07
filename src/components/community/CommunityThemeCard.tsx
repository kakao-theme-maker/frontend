// src/components/community/CommunityThemeCard.tsx
import { Heart, Bookmark } from "lucide-react";
import defaultThemeImage from "@/assets/images/mainBgImage.png";
import IconStat from "@/components/common/IconStat";
import ThemeCardBase from "@/components/common/ThemeCardBase";

interface CommunityThemeCardProps {
  title: string;
  likeCount: number;
  bookmarkCount?: number;
  image?: string;
}

// 커뮤니티 테마 카드 컴포넌트 (제목, 좋아요/북마크 수)
export default function CommunityThemeCard({
  title,
  likeCount,
  bookmarkCount,
  image = defaultThemeImage,
}: CommunityThemeCardProps) {
  return (
    <ThemeCardBase image={image} title={title}>
      <div className="flex items-center gap-3 pt-1 text-xs text-slate-400 sm:text-sm">
        <IconStat icon={Heart}>{likeCount}</IconStat>
        {bookmarkCount !== undefined && <IconStat icon={Bookmark}>{bookmarkCount}</IconStat>}
      </div>
    </ThemeCardBase>
  );
}
