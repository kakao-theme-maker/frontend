// src/components/auth/AuthDivider.tsx

// 가운데 문구가 있는 가로 구분선 컴포넌트 (예: "또는")
export default function AuthDivider({ label = "또는" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted" role="separator">
      <span className="h-px flex-1 bg-field-border/60" />
      {label}
      <span className="h-px flex-1 bg-field-border/60" />
    </div>
  );
}
