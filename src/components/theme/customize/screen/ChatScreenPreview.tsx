// src/components/theme/customize/screen/ChatScreenPreview.tsx
import { ArrowUp, CalendarDaysIcon, ChevronRight, Plus, Smile } from "lucide-react";
import { useThemeStore } from "@/store/customizeStore";
import PreviewBubble from "../preview/PreviewBubble";
import PreviewHeader from "../preview/PreviewHeader";
import PreviewTintLayer from "../preview/PreviewTintLayer";

// 채팅방 화면 프리뷰 컴포넌트
export default function ChatScreenPreview() {
  const common = useThemeStore((state) => state.theme.common);
  const chat = useThemeStore((state) => state.theme.chat);
  const bubble = useThemeStore((state) => state.theme.bubble);
  const input = useThemeStore((state) => state.theme.input);

  return (
    <div className="flex flex-col relative w-full h-full rounded-2xl">
      <PreviewHeader />
      <div className="relative flex-1 min-h-0">
        <div className="w-full h-full"
          style={{
            backgroundColor: chat.bgColor,
            backgroundImage: `url(${chat.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        <div className="absolute top-0 w-full">
          <div className="flex justify-center">
            <div className="w-max h-max flex gap-1 items-center text-[10px]
        bg-gray-900/20 text-white rounded-full py-1 px-2 font-thin">
              <CalendarDaysIcon size={12} />
              <span> 2024년 12월 20일 월요일</span>
              <ChevronRight size={12} />
            </div>
          </div>

          <div className="flex flex-col gap-2 p-2">
            <div className="flex flex-row gap-1">
              <img
                src={common.profileImage01}
                className="w-7 h-7 rounded-xl"
              />
              <div className="flex flex-col gap-1 "
                style={{ color: bubble.receiveTextColor }}>
                <span>어피치</span>
                <PreviewBubble image={bubble.receive01} edgeInsets={bubble.receiveEdgeInsets}>
                  어피치피치한
                </PreviewBubble>
                <PreviewBubble image={bubble.receive02} edgeInsets={bubble.receiveGroupEdgeInsets}>
                  봄~봄~봄이 왔어요
                </PreviewBubble>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className=" flex gap-2 items-center text-center p-2"
        style={{ backgroundColor: input.bgColor, }}>
        <div className="relative w-6 h-6 flex items-center justify-center">
          <PreviewTintLayer color={input.buttonBGColor} />
          <Plus size={16} color={input.buttonFGColor} className="relative" />
        </div>
        <div className="relative flex flex-1 h-6 items-center justify-between px-2 rounded-full">
          <PreviewTintLayer color={input.buttonBGColor} />

          <span className="relative" style={{ color: input.buttonTextColor }}>
            카카오톡 테마
          </span>
          <span className="relative">
            <Smile size={20} />
          </span>
        </div>
        <span className="flex w-6 h-6 bg-gray-200 rounded-full items-center justify-center"
          style={{ backgroundColor: input.sendBGColor, }}>
          <ArrowUp size={20} color={input.sendFGColor} />
        </span>
      </div>
    </div >
  )
}
