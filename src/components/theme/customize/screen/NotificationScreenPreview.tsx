import ChatListScreenPreview from "./ChatListScreenPreview";
import { useThemeStore } from "@/store/customizeStore";
import { X } from "lucide-react";

export default function NotificationScreenPreview() {
  const common = useThemeStore((state) => state.theme.common);
  const notification = useThemeStore((state) => state.theme.notification);

  return (
    <div className="absolute inset-0">
      <ChatListScreenPreview />
      <div className="absolute inset-0 bg-black/50 rounded-2xl" />

      {/* 상단알림 */}
      <div
        className="absolute top-0 flex w-full h-12 rounded-t-2xl p-2 gap-2"
        style={{ backgroundColor: notification.bgColor }}
      >
        <img src={common.profileImage01} className="w-7 h-7 rounded-xl shadow-sm" />
        <div className="flex flex-col justify-center gap-1 leading-none">
          <span className="text-[10px]" style={{ color: common.mainTextColor }}>
            어피치
          </span>
          <span className="text-[10px]" style={{ color: common.mainDescriptionColor }}>
            ㅋㅋㅋㅋㅋㅋㅋㅋ
          </span>
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gray-500/50" />
      </div>

      {/* 하단 배너 */}
      <div className="absolute inset-x-0 bottom-0 font-light text-[10px] text-white">
        <div
          className="absolute bottom-20 w-max h-7 p-1 flex gap-1 items-center rounded-full left-1/2 -translate-x-1/2"
          style={{ backgroundColor: notification.bgColor }}
        >
          <img
            src={common.profileImage01}
            className="w-5 h-5 rounded-full shadow-sm"
          />
          <p>일이삼사오육필팔구십일이</p>
          <X size={12} className="text-white/30 mr-1" />
        </div>

        <div
          className="absolute bottom-10 w-full h-8 flex items-center justify-center gap-1"
          style={{ backgroundColor: notification.bgColor }}
        >
          <span>추석 귀성길 교통상황, 서울서 부산</span>
          <span className="text-yellow-400">7시간</span>
          <X size={12} className="absolute right-3 text-white/30" />
        </div>
      </div>
    </div>
  );
}