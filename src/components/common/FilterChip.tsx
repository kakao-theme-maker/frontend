// components/common/FilterChip.tsx
interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function FilterChip({ label, active = false, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${active
          ? "border-primary bg-primary text-white"
          : "border-slate-300 text-slate-700 hover:bg-slate-50"
        }`}
    >
      {label}
    </button>
  );
}