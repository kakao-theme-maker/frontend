// src/pages/community/Detail.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageSquare, Bookmark } from "lucide-react";
import defaultIcon from "@/assets/images/commonIcoTheme.png";
import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import IconStat from "@/components/common/IconStat";
import Input from "@/components/common/Input";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import QueryStatus from "@/components/common/QueryStatus";
import CommentItem from "@/components/community/CommentItem";
import ThemePostPreview from "@/components/community/ThemePostPreview";
import ThemeSelectCard from "@/components/community/ThemeSelectedCard";
import useMe from "@/hooks/useMe";
import useRequireLogin from "@/hooks/useRequireLogin";
import {
  useCreateComment, useDeleteComment, useThemeBoard, useThemeBoardComments,
  useToggleBookmark, useToggleLike, useUpdateComment,
} from "@/hooks/useThemeBoards";
import { useTheme } from "@/hooks/useThemes";
import { formatDate, formatMonthDay } from "@/utils/format";

// 커뮤니티 게시글 상세 페이지
export default function Detail() {
  const { postId } = useParams();
  const id = Number(postId);
  const isInvalidId = Number.isNaN(id);

  const { data: post, isLoading, isError } = useThemeBoard(isInvalidId ? undefined : id);
  const { data: theme } = useTheme(post?.theme_component_id);

  const { data: me } = useMe();
  const requireLogin = useRequireLogin();
  const { data: comments = [] } = useThemeBoardComments(isInvalidId ? undefined : id);
  const toggleLike = useToggleLike(id);
  const toggleBookmark = useToggleBookmark(id);
  const createComment = useCreateComment(id);
  const deleteComment = useDeleteComment(id);
  const updateComment = useUpdateComment(id);

  const [comment, setComment] = useState("");
  // 팔로우 API가 아직 없어서 화면에서만 토글
  const [followOverride, setFollowOverride] = useState<boolean | null>(null);

  if (!post) {
    return (
      <PageContainer>
        <QueryStatus isLoading={isLoading} isError={isError || isInvalidId} />
      </PageContainer>
    );
  }

  const isFollowing = followOverride ?? post.following ?? false;
  const isMyPost = me?.user_email === post.user_email;

  // 댓글 등록 후 입력창 비우기
  const handleSubmitComment = () => {
    const content = comment.trim();
    if (content === "") return;
    requireLogin(() => createComment.mutate(content, { onSuccess: () => setComment("") }));
  };

  return (
    <PageContainer>
      {post.preview_image_url.length > 0 && <ThemePostPreview images={post.preview_image_url} />}

      <PageTitle className="mt-8">{post.title}</PageTitle>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="lg" src={post.profile_image || undefined} alt={post.user_name} />
          <div>
            <p className="font-bold">{post.user_name}</p>
            <p className="text-sm text-slate-400">{formatMonthDay(post.created_at)}</p>
          </div>
        </div>

        {!isMyPost && (
          <Button
            size="lg"
            rounded="full"
            onClick={() => requireLogin(() => setFollowOverride(!isFollowing))}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </Button>
        )}
      </div>

      <p className="mt-6 whitespace-pre-line text-slate-700">{post.content}</p>

      {theme && (
        <div className="mt-6 max-w-xs">
          <ThemeSelectCard
            title={theme.themeName}
            date={formatDate(theme.createdAt)}
            image={theme.previewImageUrl || defaultIcon}
          />
        </div>
      )}

      <div className="mt-8 flex items-center justify-between border-y border-slate-200 py-4">
        <div className="flex items-center gap-4 text-slate-600">
          <button
            type="button"
            onClick={() => requireLogin(() => toggleLike.mutate(post.liked))}
            disabled={toggleLike.isPending}
            aria-label={post.liked ? "좋아요 취소" : "좋아요"}
            className={post.liked ? "text-primary" : "text-slate-600"}
          >
            <IconStat icon={Heart} size={20}>{post.prefers}</IconStat>
          </button>
          <IconStat icon={MessageSquare} size={20}>{post.comments}</IconStat>
        </div>

        <button
          type="button"
          onClick={() => requireLogin(() => toggleBookmark.mutate(post.bookmarked))}
          disabled={toggleBookmark.isPending}
          aria-label={post.bookmarked ? "북마크 취소" : "북마크"}
        >
          <IconStat
            icon={Bookmark}
            size={20}
            className={post.bookmarked ? "text-primary" : "text-slate-600"}
          />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-3">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요."
          variant="bare"
          className="flex-1"
        />
        <Button
          rounded="lg"
          onClick={handleSubmitComment}
          disabled={createComment.isPending || comment.trim() === ""}
          className="shrink-0"
        >
          등록
        </Button>
      </div>

      <div className="mt-2 divide-y divide-slate-100">
        {comments.map((c) => (
          <CommentItem
            key={c.commentId}
            name={c.userName}
            date={formatMonthDay(c.createdAt)}
            content={c.content}
            profileImage={c.profileImageUrl || undefined}
            isOwner={me?.user_email === c.userEmail}
            onEdit={(content) => updateComment.mutate({ commentId: c.commentId, content })}
            onDelete={() => deleteComment.mutate(c.commentId)}
          />
        ))}
      </div>
    </PageContainer>
  );
}
