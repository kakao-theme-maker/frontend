// src/components/home/ModeCard.tsx
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ModeCardProps {
  icon: LucideIcon;
  title: string;
  description: string[];
  variant: "light" | "dark";
  to?: string;
}

const VARIANT_STYLES = {
  light: {
    card: "from-blue-100 to-purple-100",
    icon: "bg-white text-blue-500",
    title: "",
    description: "text-slate-500",
    arrow: "bg-primary text-white",
  },
  dark: {
    card: "from-brand-dark to-brand-dark-2",
    icon: "bg-white/30 text-white",
    title: "text-white",
    description: "text-slate-400",
    arrow: "bg-white text-primary",
  },
} as const;

// 테마 생성 모드(간편/디자이너)를 고르는 그라데이션 카드 컴포넌트 (to가 있으면 해당 주소로 이동하는 링크)
export default function ModeCard({ icon: Icon, title, description, variant, to }: ModeCardProps) {
  const styles = VARIANT_STYLES[variant];
  const cardClass = `block flex-1 rounded-3xl bg-linear-150 p-5 sm:p-6 lg:p-8 ${styles.card}`;

  const content = (
    <>
      <div className="flex items-center gap-4">
        <Icon className={`h-9 w-9 shrink-0 rounded-2xl p-2.5 sm:h-10 sm:w-10 sm:p-3 ${styles.icon}`} />
        <span className={`text-lg font-semibold sm:text-xl lg:text-2xl ${styles.title}`}>{title}</span>
      </div>

      <div className={`py-2 text-sm sm:text-base ${styles.description}`}>
        {description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <ArrowRight className={`ml-auto h-10 w-10 rounded-full p-3 sm:h-11 sm:w-11 ${styles.arrow}`} />
    </>
  );

  return to ? (
    <Link to={to} className={cardClass}>
      {content}
    </Link>
  ) : (
    <div className={cardClass}>{content}</div>
  );
}