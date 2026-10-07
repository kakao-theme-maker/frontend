// src/components/theme/customize/screen/ChatListScreenPreview.tsx
import { MessageCirclePlusIcon, Search, Settings, Menu } from "lucide-react";
import { useThemeStore } from "@/store/customizeStore";
import PreviewAdBanner from "../preview/PreviewAdBanner";
import PreviewButton from "../preview/PreviewButton";
import PreviewChatRoomListItem from "../preview/PreviewChatRoomListItem";
import PreviewNav from "../preview/PreviewNav";
import PreviewScreenFrame from "../preview/PreviewScreenFrame";

// 채팅목록 화면 프리뷰 컴포넌트
export default function ChatListScreenPreview() {
  const common = useThemeStore((state) => state.theme.common);

  return (
    <PreviewScreenFrame>
      <header className="flex gap-2 items-center p-2" style={{ color: common.mainTextColor }}>
        <span className="text-lg font-semibold">채팅</span>
        <div className="ml-auto flex gap-3">
          <Search size={16} />
          <MessageCirclePlusIcon size={16} />
          <Settings size={16} />
        </div>
      </header>
      <section className="flex gap-1 p-1">
        <PreviewButton label="전체" />
        <PreviewButton label="안읽음" />
        <PreviewButton label="친구" isSelected />
        <Menu size={16} className="w-6 h-6 border rounded-full border-gray-700 p-1" />
      </section>
      <section className="p-1">
        <PreviewAdBanner className="mb-2" />
      </section>
      <section className="flex flex-col">
        <PreviewChatRoomListItem name="어피치" message="오늘의 장보기 목록" isMine pinned />
        <PreviewChatRoomListItem name="춘식이" message="좋은 하루 보내~" muted unreadCount={2} />
        <PreviewChatRoomListItem name="탄천 러닝함께해요" message="러닝이 최고죠" memberCount={34} unreadCount={10} highlighted />
      </section>
      <PreviewNav selectedTab="chats" />
    </PreviewScreenFrame>
  );
}
