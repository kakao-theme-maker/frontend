interface NavButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function NavButton({
  label,
  isSelected = false,
  onClick,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm transition-colors
        rounded-full
        ${isSelected
          ? "bg-sky-100 text-blue-600"
          : "bg-transparent text-black"
        }
      `}
    >
      {label}
    </button>
  );
}