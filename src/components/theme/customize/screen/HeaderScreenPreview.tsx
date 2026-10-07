// src/components/theme/customize/screen/HeaderScreenPreview.tsx
import PreviewHeader from "../preview/PreviewHeader";
import DimmedChatListScreen from "./DimmedChatListScreen";

// 헤더를 강조한 화면 프리뷰 컴포넌트
export default function HeaderScreenPreview() {
  return (
    <DimmedChatListScreen className="absolute inset-1">
      <div className="absolute top-0 w-full">
        <PreviewHeader />
      </div>
    </DimmedChatListScreen>
  );
}
