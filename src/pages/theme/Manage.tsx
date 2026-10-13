// src/pages/theme/Manage.tsx
import { useMemo, useState } from "react";
import defaultThemeIcon from "@/assets/images/commonIcoTheme.png";
import defaultBoardImage from "@/assets/images/mainBgImage.png";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import Pagination from "@/components/common/Pagination";
import QueryStatus from "@/components/common/QueryStatus";
import SelectMenu from "@/components/common/SelectMenu";
import ThemeGrid from "@/components/common/ThemeGrid";
import ManageTabs from "@/components/manage/ManageTabs";
import { THEME_SORT_OPTIONS } from "@/config/community";
import useMyThemeBoards from "@/hooks/useMyBoards";
import { useDeleteTheme, useMyThemes } from "@/hooks/useThemes";
import { useDeletePost, useMyPreferredPosts, useMyUploadPosts } from "@/hooks/usemyPosts";
import ManageCard from "@/components/manage/ManageCard";

const TABS = ["내 테마", "내가 좋아요한 테마", "내 게시글"] as const;
type Tab = (typeof TABS)[number];
type Sort = (typeof THEME_SORT_OPTIONS)[number];

const PAGE_SIZE = 15;

const EMPTY_MESSAGES: Record<Tab, string> = {
  "내 테마": "아직 만든 테마가 없어요.",
  "내가 좋아요한 테마": "아직 좋아요한 테마가 없어요.",
  "내 게시글": "작성한 게시글이 없어요.",
};

interface ManageItem {
  key: string;
  to: string;
  image: string;
  title: string;
  likes: number;
  createdAt: string;
  onDelete?: () => void;
}

// 테마관리 페이지 (내 테마 / 내가 좋아요한 테마 / 내 게시글)
export default function Manage() {
  const [tab, setTab] = useState<Tab>("내 테마");
  const [sort, setSort] = useState<Sort>("최신순");
  const [page, setPage] = useState(1);

  const myThemes = useMyThemes();
  const myPosts = useMyUploadPosts(tab === "내 게시글");
  const preferredPosts = useMyPreferredPosts(tab === "내가 좋아요한 테마");
  // 내 테마 카드의 좋아요 수 조회용 (공유한 테마만 값이 있음)
  const myBoards = useMyThemeBoards(tab === "내 테마");
  const deleteTheme = useDeleteTheme();
  const deletePost = useDeletePost();

  const likesByTheme = useMemo(
    () => new Map((myBoards.data ?? []).map((board) => [board.themeComponentId, board.prefers])),
    [myBoards.data],
  );

  // 테마 삭제 확인 후 요청
  const handleDeleteTheme = (themeId: number) => {
    if (!window.confirm("이 테마를 삭제할까요? 삭제하면 되돌릴 수 없어요.")) return;
    deleteTheme.mutate(themeId, {
      onError: () => window.alert("테마 삭제에 실패했어요. 게시글로 공유 중인 테마라면 게시글을 먼저 삭제해 주세요."),
    });
  };

  // 게시글 삭제 확인 후 요청
  const handleDeletePost = (postId: number) => {
    if (!window.confirm("이 게시글을 삭제할까요? 삭제하면 되돌릴 수 없어요.")) return;
    deletePost.mutate(postId, {
      onError: () => window.alert("게시글 삭제에 실패했어요. 다시 시도해 주세요."),
    });
  };

  // 탭별 카드 목록
  const items: ManageItem[] = useMemo(() => {
    if (tab === "내 테마") {
      return (myThemes.data ?? []).map((theme) => ({
        key: `theme-${theme.themeComponentId}`,
        to: `/themes/${theme.themeComponentId}/customize`,
        image: theme.previewImageUrl || defaultThemeIcon,
        title: theme.themeName,
        likes: likesByTheme.get(theme.themeComponentId) ?? 0,
        createdAt: theme.createdAt,
        onDelete: () => handleDeleteTheme(theme.themeComponentId),
      }));
    }
    const isMine = tab === "내 게시글";
    return ((isMine ? myPosts.data : preferredPosts.data) ?? []).map((post) => ({
      key: `post-${post.postId}`,
      to: `/community/${post.postId}`,
      image: post.previewImageUrl?.[0] || defaultBoardImage,
      title: post.title,
      likes: post.prefers,
      createdAt: post.createdAt,
      onDelete: isMine ? () => handleDeletePost(post.postId) : undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, myThemes.data, myPosts.data, preferredPosts.data, likesByTheme]);

  // 정렬 (최신순 / 오래된순)
  const sorted = useMemo(() => {
    const list = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sort === "최신순" ? list : list.reverse();
  }, [items, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const query = tab === "내 테마" ? myThemes : tab === "내 게시글" ? myPosts : preferredPosts;

  // 탭 변경 시 첫 페이지로
  const handleTabChange = (next: Tab) => {
    setTab(next);
    setPage(1);
  };

  // 정렬 변경 시 첫 페이지로
  const handleSortChange = (next: Sort) => {
    setSort(next);
    setPage(1);
  };

  return (
    <PageContainer>
      <PageTitle className="pb-6 sm:pb-8">테마관리</PageTitle>

      <div className="rounded-3xl bg-white p-4 sm:p-7">
        <ManageTabs tabs={TABS} active={tab} onChange={handleTabChange} />

        <div className="mt-3 rounded-2xl border-2 border-primary-soft-hover bg-white p-4 sm:p-7">
          <SelectMenu
            variant="plain"
            value={sort}
            options={THEME_SORT_OPTIONS}
            onChange={handleSortChange}
            menuClassName="left-0 w-32"
            className="mb-4 inline-block sm:mb-5"
          />

          <QueryStatus
            isLoading={query.isLoading}
            isError={query.isError}
            isEmpty={sorted.length === 0}
            emptyMessage={EMPTY_MESSAGES[tab]}
          />

          <ThemeGrid columns="select">
            {visible.map((item) => (
              <ManageCard
                key={item.key}
                to={item.to}
                image={item.image}
                title={item.title}
                likes={item.likes}
                onDelete={item.onDelete}
                deleting={deleteTheme.isPending || deletePost.isPending}
              />
            ))}
          </ThemeGrid>

          {totalPages > 1 && (
            <div className="pt-8">
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}