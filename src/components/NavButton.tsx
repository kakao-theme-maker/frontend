import { Link } from "react-router-dom";

interface NavButtonProps {
  label: string;
  path: string;
  isSelected?: boolean;
}

export default function NavButton({
  label,
  path,
  isSelected = false,
}: NavButtonProps) {
  return (
    <Link
      to={path}
      className={`
        px-4 py-2 text-xl transition-colors rounded-full
        ${isSelected
          ? "bg-sky-100 text-blue-600"
          : "bg-transparent text-black"
        }
      `}
    >
      {label}
    </Link>
  );
}