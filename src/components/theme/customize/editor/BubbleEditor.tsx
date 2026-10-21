// src/components/theme/customize/editor/BubbleEditor.tsx
import BubbleSideEditor from "./BubbleSideEditor";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import ThemeColorChip from "./ThemeColorChip";

// 말풍선 설정 에디터 컴포넌트
export default function BubbleEditor() {
  return (
    <div className="flex flex-col gap-6">
      <BubbleSideEditor side="receive" title="받는 말풍선" />
      <BubbleSideEditor side="send" title="보내는 말풍선" />

      <EditorSection title="기타">
        <FieldRow>
          <ThemeColorChip section="bubble" field="unreadCountColor" label="안읽음 숫자 색상" />
        </FieldRow>
      </EditorSection>
    </div>
  );
}
