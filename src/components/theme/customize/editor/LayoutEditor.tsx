// src/components/theme/customize/editor/LayoutEditor.tsx
import TabIconGrid from "../tab/TabIconGrid";

// 탭 아이콘 레이아웃 에디터 컴포넌트
export default function LayoutEditor() {
  return (
    <div className="">
      <p>탭 아이콘</p>
      <p>각 칸을 눌러 이미지를 채우세요</p>
      <TabIconGrid />
    </div>
  );
}