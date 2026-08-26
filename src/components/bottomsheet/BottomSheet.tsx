import type { ReactNode } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* 배경 딤 */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* 시트 */}
      <div
        className={`absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white
          transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex justify-center py-3">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {title && <h2 className="px-4 pb-3 text-lg font-semibold">{title}</h2>}

        <div className="px-4 pb-8">{children}</div>
      </div>
    </div>
  );
}