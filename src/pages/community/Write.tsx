// src/pages/community/Write.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultIcon from "@/assets/images/commonIcoTheme.png";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import Pagination from "@/components/common/Pagination";
import QueryStatus from "@/components/common/QueryStatus";
import SearchField from "@/components/common/SearchField";
import SectionTitle from "@/components/common/SectionTitle";
import SelectMenu from "@/components/common/SelectMenu";
import ThemeGrid from "@/components/common/ThemeGrid";
import ThemeSelectCard from "@/components/community/ThemeSelectedCard";
import type { PostInfoValues } from "@/components/form/ThemePostForm";
import ThemePostForm from "@/components/form/ThemePostForm";
import { POST_TYPES, THEME_SORT_OPTIONS } from "@/config/community";
import { useCreateThemeBoard } from "@/hooks/useThemeBoards";
import { useMyThemes } from "@/hooks/useThemes";
import { formatDate } from "@/utils/format";

const PAGE_SIZE = 5;

const INITIAL_POST_INFO: PostInfoValues = {
  themeName: "",
  author: "",
  title: "",
  content: "",
};

// 커뮤니티 글쓰기 페이지
export default function Write() {
  const navigate = useNavigate();
  const [postType, setPostType] = useState(POST_TYPES[0]);
  const [sort, setSort] = useState<(typeof THEME_SORT_OPTIONS)[number]>(THEME_SORT_OPTIONS[0]);
  const [keyword, setKeyword] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [postInfo, setPostInfo] = useState<PostInfoValues>(INITIAL_POST_INFO);

  const myThemes = useMyThemes();
  const createBoard = useCreateThemeBoard();

  const isThemePost = postType === POST_TYPES[0];
  const matchedThemes = (myThemes.data ?? []).filter((theme) =>
    theme.themeName.includes(keyword.trim()),
  );
  const sortedThemes = sort === THEME_SORT_OPTIONS[0] ? matchedThemes : [...matchedThemes].reverse();
  const totalPages = Math.max(1, Math.ceil(sortedThemes.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageThemes = sortedThemes.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const canSubmit =
    isThemePost &&
    selectedThemeId !== null &&
    postInfo.title.trim() !== "" &&
    !createBoard.isPending;

  // 검색어를 바꾸고 첫 페이지로 이동
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  // 선택한 테마와 게시글 정보로 글 올리기 요청
  const handleSubmit = () => {
    if (selectedThemeId === null) return;
    createBoard.mutate(
      {
        title: postInfo.title.trim(),
        content: postInfo.content.trim(),
        themeComponentId: selectedThemeId,
      },
      // 작성한 게시글 상세 페이지로 이동
      { onSuccess: (post) => navigate(`/community/${post.post_id}`) },
    );
  };

  return (
    <PageContainer>
      <div className="flex items-center gap-3">
        <PageTitle>글쓰기</PageTitle>
        <SelectMenu value={postType} options={POST_TYPES} onChange={setPostType} />
      </div>

      <Card className="mt-6">
        <SectionTitle size="md">테마 선택</SectionTitle>

        <div className="mt-4 flex items-center gap-3">
          <SearchField
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="테마 검색"
            className="flex-1"
          />
          <SelectMenu
            value={sort}
            options={THEME_SORT_OPTIONS}
            onChange={(option) => {
              setSort(option);
              setPage(1);
            }}
            variant="neutral"
            menuClassName="right-0 w-32"
            className="shrink-0"
          />
        </div>

        <QueryStatus
          isLoading={myThemes.isLoading}
          isError={myThemes.isError}
          isEmpty={pageThemes.length === 0}
          emptyMessage="불러올 테마가 없어요."
        />
        <ThemeGrid columns="select" className="mt-6">
          {pageThemes.map((theme) => (
            <ThemeSelectCard
              key={theme.themeComponentId}
              title={theme.themeName}
              date={formatDate(theme.createdAt)}
              image={theme.previewImageUrl || defaultIcon}
              selected={selectedThemeId === theme.themeComponentId}
              onSelect={() => setSelectedThemeId(theme.themeComponentId)}
            />
          ))}
        </ThemeGrid>

        <div className="mt-6">
          <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
        </div>
      </Card>

      <div className="mt-6">
        <ThemePostForm values={postInfo} onChange={setPostInfo} />
      </div>

      <div className="mt-6 flex justify-end">
        <Button size="lg" rounded="lg" onClick={handleSubmit} disabled={!canSubmit}>
          {createBoard.isPending ? "올리는 중..." : "글 올리기"}
        </Button>
      </div>
      {!isThemePost && (
        <p className="mt-3 text-right text-sm text-slate-400">
          이 유형의 글쓰기는 아직 지원하지 않아요.
        </p>
      )}
      {createBoard.isError && (
        <p className="mt-3 text-right text-sm text-danger">
          글 올리기에 실패했어요. 다시 시도해 주세요.
        </p>
      )}
    </PageContainer>
  );
}
