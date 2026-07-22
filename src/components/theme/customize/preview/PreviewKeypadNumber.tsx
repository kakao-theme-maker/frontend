interface KeypadNumberProps {
  value: string;
  onClick?: () => void;
}

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