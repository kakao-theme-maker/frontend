import { BellOff, MessageCirclePlusIcon, Pin, Search, Settings, Menu } from "lucide-react";
import { useThemeStore } from "@/store/customizeStore";
import PreviewButton from "../preview/PreviewButton";
import PreviewNav from "../preview/PreviewNav";

export default function ChatListScreenPreview() {
  const common = useThemeStore(
    (state) => state.theme.common
  )
  // const primary = useThemeStore((state) => state.theme.primary);
  // const header = useThemeStore((state) => state.theme.headerStyle);
  // const common = useThemeStore((state) => state.theme.common);

  return (
    <div className="relative w-full h-full rounded-2xl p-2" style={{ backgroundColor: common.mainBGColor }}>
      {/* 헤더 */}
      <header className="flex gap-2 items-center p-2" style={{ color: common.mainTextColor }}>
        <span className="text-lg font-semibold">채팅</span>
        <div className="ml-auto flex gap-3">
          <Search size={16} />
          <MessageCirclePlusIcon size={16} />
          <Settings size={16} />
        </div>
      </header>
      {/* 친구, 소식 버튼 */}
      <section className="flex gap-1 p-1">
        <PreviewButton label="전체" />
        <PreviewButton label="안읽음" />
        <PreviewButton label="친구" isSelected />
        <Menu size={16} className="w-6 h-6 border rounded-full border-gray-700 p-1" />
      </section>
      {/* 광고 */}
      <section className="p-1">
        <div className="relative flex w-full h-16 bg-gray-100 rounded-lg p-4 mb-2">
          <p className="absolute">광고</p>
        </div>
      </section>
      {/* 채팅방 목록 */}
      <section className="flex flex-col">
        <div className="flex flex-row items-center gap-2 px-1 py-2">
          <img src={common.profileImage01} className="w-10 h-10 object-cover rounded-2xl" />
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-1" style={{ color: common.mainTextColor }}>
              <span
                className="w-3 h-3 flex items-center justify-center text-white rounded-full text-[8px]"
                style={{ backgroundColor: common.mainTextColor }}
              >
                나
              </span>
              <span>어피치</span>
              <Pin size={10} fill={common.mainTextColor} style={{ opacity: 0.4 }} />
              <span className="ml-auto text-[10px]" style={{ opacity: 0.4 }}>오후 12:30</span>
            </div>
            <span className="text-[11px]" style={{ color: common.mainDescriptionColor }}>오늘의 장보기 목록</span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 px-1 py-2">
          <img src={common.profileImage01} className="w-10 h-10 object-cover rounded-2xl" />
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-1" style={{ color: common.mainTextColor }}>
              <span>춘식이</span>
              <BellOff size={10} fill={common.mainTextColor} style={{ opacity: 0.4 }} />
              <span className="ml-auto text-[10px]" style={{ opacity: 0.4 }}>오후 12:30</span>
            </div>
            <div className="flex">
              <span className="text-[11px]" style={{ color: common.mainDescriptionColor }}>좋은 하루 보내~</span>
              <span className="px-1.5 py-0 ml-auto bg-orange-600 text-[10px] text-white rounded-full">2</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row relative items-center gap-2 px-1 py-2">
          <div
            className="absolute -inset-x-1 inset-y-0 rounded-2xl"
            style={{ backgroundColor: common.mainBGColor, opacity: 0.2 }}
          />
          <img src={common.profileImage01} className="w-10 h-10 object-cover rounded-2xl" />
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-1" style={{ color: common.mainTextColor }}>
              <span>탄천 러닝함께해요</span>
              <span style={{ opacity: 0.4 }}>34</span>
              <span className="ml-auto text-[10px]" style={{ opacity: 0.4 }}>오후 12:30</span>
            </div>
            <div className="flex">
              <span className="text-[11px]" style={{ color: common.mainDescriptionColor }}>러닝이 최고죠</span>
              <span className="px-1.5 py-0 ml-auto bg-orange-600 text-[10px] text-white rounded-full">10</span>
            </div>
          </div>
        </div>
      </section>
      {/* 네비게이션 */}
      <PreviewNav selectedTab="chats" />
    </div>
  );
}