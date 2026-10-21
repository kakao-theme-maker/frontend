// src/components/home/ThemeSection.tsx
import type { ReactNode } from "react";
import QueryStatus from "@/components/common/QueryStatus";
import ThemeGrid from "@/components/common/ThemeGrid";
import SectionHeader from "@/components/home/SectionHeader";

interface ThemeSectionProps {
  title: string;
  actionLabel: string;
  to?: string;
  emptyMessage: string;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  children: ReactNode;
}

// 섹션 제목, 조회 상태 안내, 테마 카드 그리드를 묶은 홈 화면 섹션 컴포넌트
export default function ThemeSection({
  title,
  actionLabel,
  to,
  emptyMessage,
  isLoading,
  isError,
  isEmpty,
  children,
}: ThemeSectionProps) {
  return (
    <section>
      <SectionHeader title={title} actionLabel={actionLabel} to={to} />
      <QueryStatus isLoading={isLoading} isError={isError} isEmpty={isEmpty} emptyMessage={emptyMessage} />
      <ThemeGrid>{children}</ThemeGrid>
    </section>
  );
}
