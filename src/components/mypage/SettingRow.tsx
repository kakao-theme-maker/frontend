// src/components/mypage/SettingRow.tsx
interface SettingRowProps {
  label: string;
  actionLabel: string;
  onAction: () => void;
  danger?: boolean;
}

// 라벨과 액션 버튼이 있는 설정 행 컴포넌트
export default function SettingRow({ label, actionLabel, onAction, danger = false }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-bold text-heading sm:text-base">{label}</span>

      <button
        type="button"
        onClick={onAction}
        className={`min-w-24 shrink-0 rounded-xl bg-primary-soft px-5 py-2.5 text-sm font-bold
          transition-colors hover:bg-primary-soft-hover focus-visible:ring-2 focus-visible:ring-primary
          sm:min-w-28 sm:text-base
          ${danger ? "text-danger" : "text-muted"}`}
      >
        {actionLabel}
      </button>
    </div>
  );
}
