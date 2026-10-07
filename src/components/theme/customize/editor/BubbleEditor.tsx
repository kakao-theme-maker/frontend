// src/components/theme/customize/editor/BubbleEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import { useThemeStore } from "@/store/customizeStore";
import BubbleSideEditor from "./BubbleSideEditor";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";

// 말풍선 설정 에디터 컴포넌트
export default function BubbleEditor() {
  const bubble = useThemeStore((state) => state.theme.bubble);
  const setBubble = useThemeStore((state) => state.setBubble);

  return (
    <div className="flex flex-col gap-6">
      <BubbleSideEditor side="receive" title="받는 말풍선" />
      <BubbleSideEditor side="send" title="보내는 말풍선" />

      <EditorSection title="기타">
        <FieldRow>
          <ColorChip
            label="안읽음 숫자 색상"
            hex={bubble.unreadCountColor}
            onChange={(color) => setBubble({ unreadCountColor: color })}
          />
        </FieldRow>
      </EditorSection>
    </div>
  );
}
