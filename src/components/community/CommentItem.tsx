// src/components/community/CommentItem.tsx
import { useState } from "react";
import { Heart } from "lucide-react";
import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import TextButton from "@/components/common/TextButton";

interface CommentItemProps {
  name: string;
  date: string;
  content: string;
  profileImage?: string;
  isOwner?: boolean;
  likeCount?: number;
  liked?: boolean;
  onToggleLike?: () => void;
  onEdit?: (content: string) => void;
  onDelete?: () => void;
}

// 댓글 한 건을 표시하는 컴포넌트 (좋아요 가능, 내 댓글은 제자리에서 수정/삭제 가능)
export default function CommentItem({
  name,
  date,
  content,
  profileImage,
  isOwner = false,
  likeCount = 0,
  liked = false,
  onToggleLike,
  onEdit,
  onDelete,
}: CommentItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(content);

  // 수정 내용이 바뀌었을 때만 저장 요청
  const handleSave = () => {
    const next = draft.trim();
    if (next !== "" && next !== content) onEdit?.(next);
    setEditing(false);
  };

  // 수정을 취소하고 원래 내용으로 복원
  const handleCancel = () => {
    setDraft(content);
    setEditing(false);
  };

  return (
    <div className="flex gap-3 py-3">
      <Avatar src={profileImage} alt={name} />

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-bold">{name}</span>
          <span className="text-sm text-slate-400">{date}</span>
        </div>

        {editing ? (
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
            className="mt-1"
          />
        ) : (
          <p className="pt-1 text-slate-700">{content}</p>
        )}

        <div className="flex items-center gap-1 pt-1 text-sm text-slate-400">
          <button
            type="button"
            onClick={onToggleLike}
            aria-label={liked ? "댓글 좋아요 취소" : "댓글 좋아요"}
            aria-pressed={liked}
            className={`flex items-center gap-1 transition-colors ${liked ? "text-primary" : "hover:text-slate-600"}`}
          >
            <Heart size={14} className={liked ? "fill-current" : ""} />
            {likeCount}
          </button>

          {isOwner &&
            (editing ? (
              <>
                <span>·</span>
                <TextButton onClick={handleSave}>저장</TextButton>
                <span>·</span>
                <TextButton onClick={handleCancel}>취소</TextButton>
              </>
            ) : (
              <>
                <span>·</span>
                <TextButton onClick={() => setEditing(true)}>수정</TextButton>
                <span>·</span>
                <TextButton onClick={onDelete}>삭제</TextButton>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}