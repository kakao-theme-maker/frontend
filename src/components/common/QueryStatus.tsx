// src/components/common/QueryStatus.tsx
interface QueryStatusProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
}

// 조회 상태(로딩/실패/빈 목록)에 맞는 안내 문구를 보여주는 컴포넌트
export default function QueryStatus({
  isLoading,
  isError,
  isEmpty = false,
  emptyMessage = "표시할 항목이 없어요.",
}: QueryStatusProps) {
  const message = isLoading
    ? "불러오는 중..."
    : isError
      ? "불러오지 못했어요. 잠시 후 다시 시도해 주세요."
      : isEmpty
        ? emptyMessage
        : null;

  return message ? <p className="py-10 text-center text-slate-400">{message}</p> : null;
}
