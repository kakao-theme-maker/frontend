import { NavLink } from "react-router-dom";

interface NavButtonProps {
  label: string;
  path: string;
}

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
          ? "bg-sky-100 text-primary"
          : "text-black"
        }
        `
      }
    >
      {label}
    </NavLink>
  );
}