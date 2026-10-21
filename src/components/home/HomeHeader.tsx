// src/components/home/HomeHeader.tsx
import type { ReactNode } from "react";

interface HomeHeaderProps {
  title: ReactNode;
  description: string;
  // 화면에는 보이지 않고 스크린리더에만 읽히는 페이지 제목 (있으면 title은 일반 문단으로 렌더링)
  srTitle?: string;
}

const TITLE_STYLES = "text-2xl font-bold sm:text-3xl lg:text-4xl";

// 홈 화면 상단의 제목과 안내 문구 컴포넌트
export default function HomeHeader({ title, description, srTitle }: HomeHeaderProps) {
  return (
    <header>
      {srTitle && <h1 className="sr-only">{srTitle}</h1>}
      {srTitle ? <p className={TITLE_STYLES}>{title}</p> : <h1 className={TITLE_STYLES}>{title}</h1>}
      <p className="pb-5 pt-2 text-sm text-slate-400 sm:pb-6 sm:pt-3 sm:text-base">{description}</p>
    </header>
  );
}
