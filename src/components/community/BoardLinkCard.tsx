// src/components/community/BoardLinkCard.tsx
import { Link } from "react-router-dom";
import CommunityThemeCard from "@/components/community/CommunityThemeCard";

interface BoardLinkCardProps {
  postId: number;
  title: string;
  likeCount: number;
  image?: string;
}

// 게시글 상세 페이지로 이동하는 커뮤니티 테마 카드 링크 컴포넌트
export default function BoardLinkCard({ postId, title, likeCount, image }: BoardLinkCardProps) {
  return (
    <Link to={`/community/${postId}`} className="block min-w-0">
      <CommunityThemeCard title={title} likeCount={likeCount} image={image} />
    </Link>
  );
}
