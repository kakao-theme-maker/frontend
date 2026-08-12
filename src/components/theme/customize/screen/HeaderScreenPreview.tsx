// HeaderScreenPreview.tsx
import PreviewHeader from "../preview/PreviewHeader";
import ChatListScreenPreview from "./ChatListScreenPreview";

export default function HeaderScreenPreview() {
  return (
    <div className="absolute inset-1">
      <ChatListScreenPreview />
      <div className="absolute inset-0 bg-black/50 rounded-2xl" />
      <div className="absolute top-0 w-full">
        <PreviewHeader />
      </div>
    </div>
  );
}