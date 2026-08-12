
import { Gift, Search, Settings, UserPlus } from "lucide-react";
import { useThemeStore } from "@/store/customizeStore";
import PreviewButton from "../preview/PreviewButton";
import PreviewFriendChip from "../preview/PreviewFriendChip";
import PreviewNav from "../preview/PreviewNav";

export default function FriendsScreenPreview() {
  const common = useThemeStore((state) => state.theme.common);

  return (
    <div className="relative w-full h-full rounded-2xl p-2" style={{ backgroundColor: common.mainBGColor }}>
      {/* 헤더 */}
      <header className="flex gap-2 items-center">
        <img src={common.profileImage01} className="w-7 h-7 rounded-xl" />
        <span className="font-semibold text-base" style={{ color: common.mainTextColor }}>어피치</span>
        <div className="ml-auto flex gap-3">
          <Search size={16} color={common.mainTextColor} />
          <UserPlus size={16} color={common.mainTextColor} />
          <Gift size={16} color={common.mainTextColor} />
          <Settings size={16} color={common.mainTextColor} />
        </div>
      </header>
      {/* 친구, 소식 버튼 */}
      <section className="flex gap-1 py-4">
        <PreviewButton label="친구" isSelected />
        <PreviewButton label="소식" />
      </section>
      {/* 광고 */}
      <section>
        <div className="relative flex w-full h-16 bg-gray-100 rounded-lg p-4">
          <p className="absolute">광고</p>
        </div>
      </section>
      {/* 업데이트한 친구 */}
      <section className="flex flex-col gap-2 py-3">
        {/* sectionTitleStyle 없음 → mainDescriptionColor로 대체 */}
        <p style={{ color: common.mainDescriptionColor }} className="font-light text-[10px]">업데이트한 친구 4</p>
        <div className="flex gap-3">
          <PreviewFriendChip label="춘식이" variant="vertical" />
          <PreviewFriendChip label="라이언" variant="vertical" />
          <PreviewFriendChip label="카카오" variant="vertical" />
        </div>
      </section>
      {/* borderColor/Alpha 없음 → 기본 회색 hr로 대체 */}
      <hr className="py-1 opacity-30" />
      {/* 생일인 친구 */}
      <section>
        <p style={{ color: common.mainDescriptionColor }} className="font-light text-[10px]">생일인 친구 8</p>
        <div>
          <PreviewFriendChip label="스카피" description="오늘 · 내게 생일 선물 준 친구" />
          <PreviewFriendChip label="죠르디" description="오늘 · 내게 생일 선물 준 친구" isSelected />
          <PreviewFriendChip label="라이언" description="오늘" />
          <PreviewFriendChip label="춘식이" description="오늘" />
        </div>
      </section>
      <div className="flex justify-center py-2">
        <PreviewButton label="오늘 생일 친구 더보기" size="md" />
      </div>
      <PreviewNav selectedTab="friends" />
    </div>
  );
}