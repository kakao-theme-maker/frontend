// src/components/common/IconStat.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface IconStatProps {
  icon: LucideIcon;
  size?: number;
  children?: ReactNode;
  className?: string;
}

// 아이콘과 숫자를 나란히 보여주는 통계 컴포넌트
export default function IconStat({ icon: Icon, size = 14, children, className = "" }: IconStatProps) {
  return (
    <span className={`flex items-center gap-1.5 ${className}`}>
      <Icon size={size} />
      {children}
    </span>
  );
}
