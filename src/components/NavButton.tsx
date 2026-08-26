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
        shrink-0 whitespace-nowrap px-4 py-2 text-xl rounded-full transition-colors
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