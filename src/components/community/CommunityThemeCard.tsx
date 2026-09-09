// src/components/community/CommunityThemeCard.tsx
import { Heart, Bookmark } from "lucide-react";
import defaultThemeImage from "@/assets/images/mainBgImage.png";

interface CommunityThemeCardProps {
  title: string;
  likeCount: number;
  bookmarkCount: number;
  image?: string;
}

export default function CommunityThemeCard({
  title,
  likeCount,
  bookmarkCount,
  image = defaultThemeImage,
}: CommunityThemeCardProps) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-300 bg-white">
      <img
        src={image}
        alt=""
        className="aspect-square w-full object-cover"
      />

      <div className="flex flex-col p-3 sm:p-3.5">
        <span className="truncate text-base font-bold sm:text-lg">
          {title}
        </span>

        <div className="flex items-center gap-3 pt-1 text-xs text-slate-400 sm:text-sm">
          <span className="flex items-center gap-1">
            <Heart size={14} />
            {likeCount}
          </span>
          <span className="flex items-center gap-1">
            <Bookmark size={14} />
            {bookmarkCount}
          </span>
        </div>
      </div>
    </div>
  );
}