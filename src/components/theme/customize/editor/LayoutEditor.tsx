// src/components/theme/customize/editor/LayoutEditor.tsx
import TabIconGrid from "../tab/TabIconGrid";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import ThemeColorChip from "./ThemeColorChip";

// 탭 아이콘 레이아웃 에디터 컴포넌트
export default function LayoutEditor() {
  return (
    <div className="flex flex-col gap-6">
      <EditorSection title="탭바">
        <FieldRow>
          <ThemeColorChip section="tabBar" field="bgColor" label="탭바 배경색" />
        </FieldRow>
      </EditorSection>

      <p>탭 아이콘</p>
      <p>각 칸을 눌러 이미지를 채우세요</p>
      <TabIconGrid />
    </div>
  );
}