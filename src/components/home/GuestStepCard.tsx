// src/components/home/GuestStepCard.tsx
import Card from "@/components/common/Card";

interface GuestStepCardProps {
  step: string;
  description: readonly string[];
}

// 비로그인 홈의 테마 제작 단계 안내 카드 컴포넌트
export default function GuestStepCard({ step, description }: GuestStepCardProps) {
  return (
    <Card>
      <p className="text-xl font-bold">{step}</p>
      <div className="pt-4 text-sm text-slate-400 sm:text-base">
        {description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </Card>
  );
}
