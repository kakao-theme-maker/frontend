// src/components/theme/customize/screen/DimmedChatListScreen.tsx
import type { ReactNode } from "react";
import ChatListScreenPreview from "./ChatListScreenPreview";

interface DimmedChatListScreenProps {
  children: ReactNode;
  className?: string;
}

// 채팅목록 화면을 어둡게 덮고 그 위에 강조 요소를 올리는 프리뷰 컴포넌트
export default function DimmedChatListScreen({
  children,
  className = "absolute inset-0",
}: DimmedChatListScreenProps) {
  return (
    <div className={className}>
      <ChatListScreenPreview />
      <div className="absolute inset-0 bg-black/50 rounded-2xl" />
      {children}
    </div>
  );
}
