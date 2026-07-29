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
        px-4 py-2 text-xl rounded-full transition-colors
        ${isActive
          ? "bg-sky-100 text-blue-600"
          : "text-black"
        }
        `
      }
    >
      {label}
    </NavLink>
  );
}