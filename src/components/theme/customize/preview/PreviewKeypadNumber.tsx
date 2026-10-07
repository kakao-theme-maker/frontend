// src/components/theme/customize/preview/PreviewKeypadNumber.tsx
interface KeypadNumberProps {
  value: string;
  onClick?: () => void;
}

// 잠금화면 키패드 숫자 프리뷰 컴포넌트
export default function PreviewKeypadNumber({ value, onClick }: KeypadNumberProps) {

  return (
    <div
      className="flex w-10 h-10 items-center justify-center text-center text-base font-semibold"
      onClick={onClick}
    >
      {value === "delete" ? "<" : value}
    </div>
  )
}