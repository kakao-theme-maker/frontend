// src/components/community/CommentItem.tsx
interface CommentItemProps {
  name: string;
  date: string;
  content: string;
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReply?: () => void;
}

export default function CommentItem({
  name,
  date,
  content,
  isOwner = false,
  onEdit,
  onDelete,
  onReply,
}: CommentItemProps) {
  return (
    <div className="flex gap-3 py-3">
      <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-bold">{name}</span>
          <span className="text-sm text-slate-400">{date}</span>
        </div>

        <p className="pt-1 text-slate-700">{content}</p>

        {isOwner ? (
          <div className="flex items-center gap-1 pt-1 text-sm text-slate-400">
            <button type="button" onClick={onEdit} className="hover:text-slate-600">
              수정
            </button>
            <span>·</span>
            <button type="button" onClick={onDelete} className="hover:text-slate-600">
              삭제
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onReply}
            className="pt-1 text-sm text-slate-400 hover:text-slate-600"
          >
            답글달기
          </button>
        )}
      </div>
    </div>
  );
}