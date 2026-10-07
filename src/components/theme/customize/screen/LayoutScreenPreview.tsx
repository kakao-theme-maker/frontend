// src/components/theme/customize/screen/LayoutScreenPreview.tsx
import PreviewNav from "../preview/PreviewNav";
import DimmedChatListScreen from "./DimmedChatListScreen";

// 하단 탭바를 강조한 화면 프리뷰 컴포넌트
export default function LayoutScreenPreview() {
  return (
    <DimmedChatListScreen>
      <div className="absolute bottom-0 w-full">
        <PreviewNav selectedTab="friends" />
      </div>
    </DimmedChatListScreen>
  );
}
