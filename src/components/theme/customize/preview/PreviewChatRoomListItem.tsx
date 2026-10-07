// src/components/theme/customize/preview/PreviewChatRoomListItem.tsx
import { BellOff, Pin } from "lucide-react";
import { useThemeStore } from "@/store/customizeStore";

interface PreviewChatRoomListItemProps {
  name: string;
  message: string;
  isMine?: boolean;
  pinned?: boolean;
  muted?: boolean;
  memberCount?: number;
  unreadCount?: number;
  highlighted?: boolean;
}

// 채팅방 목록 아이템 프리뷰 컴포넌트
export default function PreviewChatRoomListItem({
  name,
  message,
  isMine = false,
  pinned = false,
  muted = false,
  memberCount,
  unreadCount,
  highlighted = false,
}: PreviewChatRoomListItemProps) {
  const common = useThemeStore((state) => state.theme.common);

  return (
    <div className={`flex flex-row items-center gap-2 px-1 py-2 ${highlighted ? "relative" : ""}`}>
      {highlighted && (
        <div
          className="absolute -inset-x-1 inset-y-0 rounded-2xl"
          style={{ backgroundColor: common.mainBGColor, opacity: 0.2 }}
        />
      )}
      <img src={common.profileImage01} className="w-10 h-10 object-cover rounded-2xl" />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1" style={{ color: common.mainTextColor }}>
          {isMine && (
            <span
              className="w-3 h-3 flex items-center justify-center text-white rounded-full text-[8px]"
              style={{ backgroundColor: common.mainTextColor }}
            >
              나
            </span>
          )}
          <span>{name}</span>
          {pinned && <Pin size={10} fill={common.mainTextColor} style={{ opacity: 0.4 }} />}
          {muted && <BellOff size={10} fill={common.mainTextColor} style={{ opacity: 0.4 }} />}
          {memberCount !== undefined && <span style={{ opacity: 0.4 }}>{memberCount}</span>}
          <span className="ml-auto text-[10px]" style={{ opacity: 0.4 }}>오후 12:30</span>
        </div>
        <div className="flex">
          <span className="text-[11px]" style={{ color: common.mainDescriptionColor }}>{message}</span>
          {unreadCount !== undefined && (
            <span className="px-1.5 py-0 ml-auto bg-orange-600 text-[10px] text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
