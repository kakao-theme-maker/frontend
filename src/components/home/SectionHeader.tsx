// src/components/home/SectionHeader.tsx
import { Link } from "react-router-dom";
import SectionTitle from "@/components/common/SectionTitle";

interface SectionHeaderProps {
  title: string;
  actionLabel: string;
  to?: string;
}

const ACTION_STYLES = "shrink-0 py-4 text-sm font-bold text-primary sm:py-5 sm:text-base";

// 섹션 제목과 오른쪽 "더보기" 문구(to가 있으면 링크)를 나란히 보여주는 컴포넌트
export default function SectionHeader({ title, actionLabel, to }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <SectionTitle className="py-4 sm:py-5">{title}</SectionTitle>
      {to ? (
        <Link to={to} className={ACTION_STYLES}>
          {actionLabel}
        </Link>
      ) : (
        <span className={ACTION_STYLES}>{actionLabel}</span>
      )}
    </div>
  );
}
