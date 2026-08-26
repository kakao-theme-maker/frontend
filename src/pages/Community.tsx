// app/community/page.tsx (Community.tsx)
"use client";

import { useState } from "react";
import FilterGroup from "@/components/common/FilterGroup";
import Input from "@/components/common/Input";
import { Search } from "lucide-react";

const FILTERS = [
  { title: "테마", items: ["테마"] },
  { title: "프로필 및 기본배경", items: ["기본 프로필", "메인 배경"] },
  { title: "채팅방", items: ["채팅창 배경", "말풍선"] },
  { title: "잠금화면", items: ["잠금 배경", "잠금 붓릿", "잠금 프레스"] },
];

export default function Community() {
  const [activeItem, setActiveItem] = useState<string | null>("테마");

  const handleSelect = (item: string) => {
    setActiveItem((prev) => (prev === item ? null : item));
  };

  return (
    <div>
      <p>원하는 테마와 에셋을 둘러보세요</p>
      <p>다른 사람들이 공유한 테마와 에셋을 둘러보고 내 카카오톡에 바로 적용하세요</p>
      <div>
        <div className="flex w-full items-center rounded-full border border-slate-300 px-4">
          <Input
            type="search"
            placeholder="원하는 키워드를 검색하세요"
            className="flex-1 border-none px-0"
          />
          <Search size={20} className="pointer-events-none text-primary" />
        </div>
      </div>
      <div className="w-full divide-y divide-slate-200 border-y border-slate-200">
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
    </div>
  );
}