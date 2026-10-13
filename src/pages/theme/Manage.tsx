// src/pages/theme/Manage.tsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import defaultThemeIcon from "@/assets/images/commonIcoTheme.png";
import defaultBoardImage from "@/assets/images/mainBgImage.png";
import IconStat from "@/components/common/IconStat";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import Pagination from "@/components/common/Pagination";
import QueryStatus from "@/components/common/QueryStatus";
import SelectMenu from "@/components/common/SelectMenu";
import ThemeCardBase from "@/components/common/ThemeCardBase";
import ThemeGrid from "@/components/common/ThemeGrid";
import ManageTabs from "@/components/manage/ManageTabs";
import { THEME_SORT_OPTIONS } from "@/config/community";
import useMyThemeBoards from "@/hooks/useMyBoards";
import { useMyThemes } from "@/hooks/useThemes";

const TABS = ["내 테마", "내가 좋아요한 테마", "내 게시글"] as const;
type Tab = (typeof TABS)[number];
type Sort = (typeof THEME_SORT_OPTIONS)[number];

const PAGE_SIZE = 15;

const EMPTY_MESSAGES: Record<Tab, string> = {
  "내 테마": "아직 만든 테마가 없어요.",
  "내가 좋아요한 테마": "좋아요한 테마 목록은 준비 중이에요.",
  "내 게시글": "작성한 게시글이 없어요.",
};

interface ManageItem {
  key: string;
  to: string;
  image: string;
  title: string;
  likes: number;
  createdAt: string;
}

// 테마관리 페이지 (내 테마 / 내가 좋아요한 테마 / 내 게시글)
export default function Manage() {
  const [tab, setTab] = useState<Tab>("내 테마");
  const [sort, setSort] = useState<Sort>("최신순");
  const [page, setPage] = useState(1);

  const myThemes = useMyThemes();
  const myBoards = useMyThemeBoards();

  // 내 테마 카드에 보여줄 좋아요 수 (게시글로 공유한 테마만 값이 있음)
  const likesByTheme = useMemo(
    () => new Map((myBoards.data ?? []).map((board) => [board.theme_component_id, board.prefers])),
    [myBoards.data],
  );

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
      }));
    }
    if (tab === "내 게시글") {
      return (myBoards.data ?? []).map((board) => ({
        key: `post-${board.post_id}`,
        to: `/community/${board.post_id}`,
        image: board.preview_image_url || defaultBoardImage,
        title: board.title,
        likes: board.prefers,
        createdAt: board.created_at,
      }));
    }
    // ⚠️ 내가 좋아요한 테마 목록 조회 API가 아직 없음 (백엔드 확인 필요)
    return [];
  }, [tab, myThemes.data, myBoards.data, likesByTheme]);

  // 정렬 (최신순 / 오래된순)
  const sorted = useMemo(() => {
    const list = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sort === "최신순" ? list : list.reverse();
  }, [items, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const visible = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const query = tab === "내 테마" ? myThemes : tab === "내 게시글" ? myBoards : null;

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
            isLoading={query?.isLoading ?? false}
            isError={query?.isError ?? false}
            isEmpty={sorted.length === 0}
            emptyMessage={EMPTY_MESSAGES[tab]}
          />

          <ThemeGrid columns="select">
            {visible.map((item) => (
              <Link key={item.key} to={item.to} className="block min-w-0">
                <ThemeCardBase image={item.image} title={item.title}>
                  <div className="pt-1 text-xs text-muted sm:text-sm">
                    <IconStat icon={Heart}>{item.likes}</IconStat>
                  </div>
                </ThemeCardBase>
              </Link>
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