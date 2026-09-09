// src/pages/Community.tsx
"use client";

import { useState } from "react";
import FilterGroup from "@/components/common/FilterGroup";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Search, Plus } from "lucide-react";
import CommunityThemeCard from "@/components/community/CommunityThemeCard";
import { Link } from "react-router-dom";

const FILTERS = [
  { title: "테마", items: ["테마"] },
  { title: "프로필 및 기본배경", items: ["기본 프로필", "메인 배경"] },
  { title: "채팅방", items: ["채팅창 배경", "말풍선"] },
  { title: "잠금화면", items: ["잠금 배경", "잠금 불릿", "잠금 프레스"] },
];

const SORT_OPTIONS = ["최신순", "인기순"] as const;

const MOCK_THEMES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  title: "어피치 테마",
  likeCount: 192,
  bookmarkCount: 192,
}));

export default function Community() {
  const [activeItem, setActiveItem] = useState<string | null>("테마");
  const [activeSort, setActiveSort] =
    useState<(typeof SORT_OPTIONS)[number]>("최신순");

  const handleSelect = (item: string) => {
    setActiveItem((prev) => (prev === item ? null : item));
  };

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 lg:px-20">
      <header className="pt-6 pb-8 text-center sm:pt-10 sm:pb-10">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          원하는 테마와 에셋을 둘러보세요
        </h1>
        <p className="pt-3 text-sm text-slate-400 sm:text-base">
          다른 사람들이 공유한 테마와 에셋을 둘러보고 내 카카오톡에 바로 적용하세요
        </p>
      </header>

      <div className="flex w-full items-center rounded-full border border-slate-300 px-4">
        <Input
          type="search"
          placeholder="원하는 키워드를 검색하세요"
          className="flex-1 border-none px-0"
        />
        <Search size={20} className="pointer-events-none text-primary" />
      </div>

      <div className="w-full divide-y divide-slate-200 border-y border-slate-200 mt-8">
        {FILTERS.map((filter) => (
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

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
        {MOCK_THEMES.map((theme) => (
          <CommunityThemeCard
            key={theme.id}
            title={theme.title}
            likeCount={theme.likeCount}
            bookmarkCount={theme.bookmarkCount}
          />
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button
          type="button"
          className="rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-sky-50 sm:text-base"
        >
          더 불러오기
        </button>
      </div>
    </div>
  );
}