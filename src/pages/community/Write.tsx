// src/pages/community/Write.tsx
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import defaultThemeImage from "@/assets/images/mainBgImage.png";
import defaultIcon from "@/assets/images/commonIcoTheme.png";
import type { PostInfoValues } from "@/components/form/ThemePostForm";
import ThemeSelectCard from "@/components/community/ThemeSelectedCard";
import ThemePostForm from "@/components/form/ThemePostForm";

const POST_TYPES = ["테마", "프로필 및 기본배경", "채팅방", "잠금화면"] as const;
const SORT_OPTIONS = ["최신순", "인기순"] as const;

const MOCK_THEMES = [
  { id: 0, title: "졸업기니테마", date: "2026.08.01", image: defaultIcon },
  { id: 1, title: "어피치테마", date: "2025.09.01", image: defaultThemeImage },
  { id: 2, title: "어피치테마", date: "2025.09.01", image: defaultThemeImage },
  { id: 3, title: "어피치테마", date: "2025.09.01", image: defaultThemeImage },
  { id: 4, title: "어피치테마", date: "2025.09.01", image: defaultThemeImage },
];

const TOTAL_PAGES = 4;

const INITIAL_POST_INFO: PostInfoValues = {
  themeName: "",
  author: "",
  title: "",
  content: "",
};

export default function Write() {
  const [postType, setPostType] = useState<(typeof POST_TYPES)[number]>("테마");
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);

  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>("최신순");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const [postInfo, setPostInfo] = useState<PostInfoValues>(INITIAL_POST_INFO);

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 lg:px-20">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">글쓰기</h1>

        <div className="relative">
          <button
            type="button"
            onClick={() => setTypeMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary sm:text-base"
          >
            {postType}
            <ChevronDown size={16} />
          </button>

          {typeMenuOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              {POST_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setPostType(type);
                    setTypeMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-6 sm:p-8">
        <h2 className="text-base font-bold sm:text-lg">테마 선택</h2>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-1 items-center rounded-full border border-slate-300 px-4">
            <Search size={18} className="pointer-events-none text-slate-400" />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="테마 검색"
              className="flex-1 border-none px-2"
            />
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setSortMenuOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600"
            >
              {sort}
              <ChevronDown size={16} />
            </button>

            {sortMenuOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-32 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSort(option);
                      setSortMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
          {MOCK_THEMES.map((theme) => (
            <ThemeSelectCard
              key={theme.id}
              title={theme.title}
              date={theme.date}
              image={theme.image}
              selected={selectedThemeId === theme.id}
              onSelect={() => setSelectedThemeId(theme.id)}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-400">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              className={
                num === page
                  ? "font-semibold text-primary underline underline-offset-4"
                  : "hover:text-slate-600"
              }
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(TOTAL_PAGES, prev + 1))}
            disabled={page === TOTAL_PAGES}
            className="disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <ThemePostForm values={postInfo} onChange={setPostInfo} />
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="rounded-lg px-6 py-2.5">글 올리기</Button>
      </div>
    </div>
  );
}