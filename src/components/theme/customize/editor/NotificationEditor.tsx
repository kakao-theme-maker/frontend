// src/components/theme/customize/editor/NotificationEditor.tsx
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import ThemeColorChip from "./ThemeColorChip";

// 알림 배너 설정 에디터 컴포넌트
export default function NotificationEditor() {
  return (
    <div className="flex flex-col gap-6">
      <EditorSection title="배너">
        <FieldRow>
          <ThemeColorChip section="notification" field="bgColor" label="알림 배너 배경색" />
        </FieldRow>
      </EditorSection>
    </div>
  );
}
