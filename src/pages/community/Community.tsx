// src/pages/community/Community.tsx
"use client";

import { useState } from "react";
import FilterGroup from "@/components/common/FilterGroup";
import Button from "@/components/common/Button";
import { Plus } from "lucide-react";
import CommunityThemeCard from "@/components/community/CommunityThemeCard";
import { Link } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import SearchField from "@/components/common/SearchField";
import ThemeGrid from "@/components/common/ThemeGrid";
import QueryStatus from "@/components/common/QueryStatus";
import { COMMUNITY_FILTERS, SORT_OPTIONS, SORT_PARAMS } from "@/config/community";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useThemeBoardList } from "@/hooks/useThemeBoards";

// 커뮤니티 목록 페이지
export default function Community() {
  const [activeItem, setActiveItem] = useState<string | null>("테마");
  const [activeSort, setActiveSort] =
    useState<(typeof SORT_OPTIONS)[number]>("최신순");
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword.trim());
  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useThemeBoardList(debouncedKeyword, SORT_PARAMS[activeSort]);
  const boards = data?.pages.flat() ?? [];

  // 필터 항목 선택/해제 토글
  const handleSelect = (item: string) => {
    setActiveItem((prev) => (prev === item ? null : item));
  };

  return (
    <PageContainer>
      <header className="pt-6 pb-8 text-center sm:pt-10 sm:pb-10">
        <PageTitle>
          원하는 테마와 에셋을 둘러보세요
        </PageTitle>
        <p className="pt-3 text-sm text-slate-400 sm:text-base">
          다른 사람들이 공유한 테마와 에셋을 둘러보고 내 카카오톡에 바로 적용하세요
        </p>
      </header>

      <SearchField
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="원하는 키워드를 검색하세요"
      />

      <div className="w-full divide-y divide-slate-200 border-y border-slate-200 mt-8">
        {COMMUNITY_FILTERS.map((filter) => (
          <FilterGroup
            key={filter.title}
            title={filter.title}
            items={filter.items}
            activeItem={activeItem}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-6 pb-4">
        <div className="flex items-center gap-3 text-sm sm:text-base">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setActiveSort(option)}
              className={`font-medium transition-colors ${activeSort === option ? "text-black" : "text-slate-300"
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        <Link
          to="/community/write"
          className="flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-white"
        >
          <Plus size={18} />
          글쓰러가기
        </Link>
      </div>

      <QueryStatus
        isLoading={isLoading}
        isError={isError}
        isEmpty={boards.length === 0}
        emptyMessage="게시글이 없어요."
      />
      <ThemeGrid>
        {boards.map((board) => (
          <Link key={board.post_id} to={`/community/${board.post_id}`} className="block min-w-0">
            <CommunityThemeCard
              title={board.title}
              likeCount={board.prefers}
              image={board.preview_image_url || undefined}
            />
          </Link>
        ))}
      </ThemeGrid>

      {hasNextPage && (
        <div className="flex justify-center pt-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "불러오는 중..." : "더 불러오기"}
          </Button>
        </div>
      )}
    </PageContainer>
  );
}