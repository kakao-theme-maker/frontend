// LayoutScreenPreview.tsx
import PreviewNav from "../preview/PreviewNav";
import ChatListScreenPreview from "./ChatListScreenPreview";

export default function LayoutScreenPreview() {
  return (
    <div className="absolute inset-0">
      <ChatListScreenPreview />
      <div className="absolute inset-0 bg-black/50 rounded-2xl" />
      <div className="absolute bottom-0 w-full">
        <PreviewNav selectedTab="friends" />
      </div>
    </div>
  );
}