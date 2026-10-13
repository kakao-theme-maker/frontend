// src/components/manage/ManageCard.tsx
import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import IconStat from "@/components/common/IconStat";
import ThemeCardBase from "@/components/common/ThemeCardBase";

interface ManageCardProps {
  to: string;
  image: string;
  title: string;
  likes: number;
  onDelete?: () => void;
  deleting?: boolean;
}

// 테마관리 카드 (썸네일, 제목, 좋아요 수 + 선택적 삭제 버튼)
export default function ManageCard({ to, image, title, likes, onDelete, deleting = false }: ManageCardProps) {
  return (
    <div className="relative min-w-0">
      <Link to={to} className="block min-w-0">
        <ThemeCardBase image={image} title={title}>
          <div className="pt-1 text-xs text-muted sm:text-sm">
            <IconStat icon={Heart}>{likes}</IconStat>
          </div>
        </ThemeCardBase>
      </Link>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          aria-label={`${title} 삭제`}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}