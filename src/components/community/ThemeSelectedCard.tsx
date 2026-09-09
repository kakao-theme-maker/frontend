// src/components/community/ThemeSelectCard.tsx
interface ThemeSelectCardProps {
  title: string;
  date: string;
  image: string;
  selected?: boolean;
  onSelect?: () => void;
}

export default function ThemeSelectCard({
  title,
  date,
  image,
  selected = false,
  onSelect,
}: ThemeSelectCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full min-w-0 overflow-hidden rounded-2xl border bg-white text-left transition-colors ${selected
          ? "border-primary ring-2 ring-primary/30"
          : "border-slate-300 hover:border-slate-400"
        }`}
    >
      <img
        src={image}
        alt=""
        className="aspect-square w-full object-cover"
      />

      <div className="flex flex-col p-3 sm:p-3.5">
        <span className="truncate text-sm font-bold sm:text-base">
          {title}
        </span>

        <span className="text-xs text-slate-400 sm:text-sm">
          {date}
        </span>
      </div>
    </button>
  );
}