// src/components/theme/customize/editor/NotificationEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import { useThemeStore } from "@/store/customizeStore";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";

// 알림 배너 설정 에디터 컴포넌트
export default function NotificationEditor() {
  const notification = useThemeStore((state) => state.theme.notification);
  const setNotification = useThemeStore((state) => state.setNotification);

  return (
    <div className="flex flex-col gap-6">
      <EditorSection title="배너">
        <FieldRow>
          <ColorChip
            label="알림 배너 배경색"
            hex={notification.bgColor}
            onChange={(color) => setNotification({ bgColor: color })}
          />
        </FieldRow>
      </EditorSection>
    </div>
  );
}
