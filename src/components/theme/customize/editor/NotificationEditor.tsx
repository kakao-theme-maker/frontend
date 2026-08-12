// NotificationEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import { useThemeStore } from "@/store/customizeStore";

export default function NotificationEditor() {
  const notification = useThemeStore((state) => state.theme.notification);
  const setNotification = useThemeStore((state) => state.setNotification);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">배너</h3>
        <div className="flex gap-4">
          <ColorChip
            label="알림 배너 배경색"
            hex={notification.bgColor}
            onChange={(color) => setNotification({ bgColor: color })}
          />
        </div>
      </div>
    </div>
  );
}