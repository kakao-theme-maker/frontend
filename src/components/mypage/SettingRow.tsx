interface SettingRowProps {
  label: string;
  actionLabel: string;
  onAction: () => void;
  danger?: boolean;
}

export default function SettingRow({ label, actionLabel, onAction, danger = false }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-base font-bold text-[#2F3453] sm:text-lg lg:text-xl">{label}</span>

      <button
        type="button"
        onClick={onAction}
        className={`min-w-28 shrink-0 rounded-2xl bg-[#E4EBFE] px-6 py-3 text-base font-bold
          transition-colors hover:bg-[#DCE4FD] focus-visible:ring-2 focus-visible:ring-primary
          sm:min-w-36 sm:py-4 sm:text-lg lg:min-w-40 lg:py-5 lg:text-2xl
          ${danger ? "text-[#FF5B5B]" : "text-[#8A93B3]"}`}
      >
        {actionLabel}
      </button>
    </div>
  );
}
