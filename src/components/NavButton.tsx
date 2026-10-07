// src/components/NavButton.tsx
import { NavLink } from "react-router-dom";

interface NavButtonProps {
  label: string;
  path: string;
}

// 활성 경로 스타일이 적용되는 네비게이션 링크 버튼
export default function NavButton({
  label,
  path,
}: NavButtonProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        shrink-0 whitespace-nowrap rounded-full px-3 py-1.5
        text-sm sm:text-base font-medium
        transition-colors
        ${isActive
          ? "bg-primary-soft text-primary"
          : "text-black"
        }
        `
      }
    >
      {label}
    </NavLink>
  );
}