// src/components/community/ThemeSelectedCard.tsx
import ThemeCardBase from "@/components/common/ThemeCardBase";

interface ThemeSelectCardProps {
  title: string;
  date: string;
  image: string;
  selected?: boolean;
  onSelect?: () => void;
}

// 글쓰기에서 불러올 테마를 선택하는 카드 컴포넌트
export default function ThemeSelectCard({
  title,
  date,
  image,
  selected = false,
  onSelect,
}: ThemeSelectCardProps) {
  return (
    <ThemeCardBase
      image={image}
      title={title}
      subtitle={date}
      titleSize="md"
      selected={selected}
      onClick={onSelect}
    />
  );
}
