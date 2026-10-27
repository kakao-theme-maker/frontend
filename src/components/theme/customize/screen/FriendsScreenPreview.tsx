// src/components/theme/customize/screen/FriendsScreenPreview.tsx
import { Gift, Search, Settings } from "lucide-react";
import { useThemeStore } from "@/store/customizeStore";
import PreviewAdBanner from "../preview/PreviewAdBanner";
import PreviewButton from "../preview/PreviewButton";
import PreviewFriendChip from "../preview/PreviewFriendChip";
import PreviewNav from "../preview/PreviewNav";
import PreviewScreenFrame from "../preview/PreviewScreenFrame";

// 친구 화면 프리뷰 컴포넌트
export default function FriendsScreenPreview() {
  const common = useThemeStore((state) => state.theme.common);
  const friends = useThemeStore((state) => state.theme.friends);

  return (
    <PreviewScreenFrame>
      <header className="flex gap-2 items-center">
        <img src={common.profileImage01} className="w-7 h-7 rounded-xl" />
        <span className="font-semibold text-base" style={{ color: friends.headerTextColor }}>어피치</span>
        <div className="ml-auto flex items-center gap-3">
          <Search size={16} color={friends.headerTextColor} />
          <img src={friends.addFriendImage} alt="친구 추가" className="h-4 object-contain" />
          <Gift size={16} color={common.featureTextColor} />
          <Settings size={16} color={friends.headerTextColor} />
        </div>
      </header>
      <section className="flex gap-1 py-4">
        <PreviewButton label="친구" isSelected />
        <PreviewButton label="소식" />
      </section>
      <section>
        <PreviewAdBanner />
      </section>
      <section className="flex flex-col gap-2 py-3">
        <p style={{ color: friends.sectionTitleTextColor }} className="font-light text-[10px]">업데이트한 친구 4</p>
        <div className="flex gap-3">
          <PreviewFriendChip label="춘식이" variant="vertical" />
          <PreviewFriendChip label="라이언" variant="vertical" />
          <PreviewFriendChip label="카카오" variant="vertical" />
        </div>
      </section>
      <hr className="my-1" style={{ borderColor: friends.sectionTitleBorderColor }} />
      <section>
        <p style={{ color: friends.sectionTitleTextColor }} className="font-light text-[10px]">생일인 친구 8</p>
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
    </PreviewScreenFrame>
  );
}
