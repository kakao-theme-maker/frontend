import PreviewHeader from "@/components/theme/customize/preview/PreviewHeader";
import { useThemeStore } from "@/store/customizeStore";
import { ArrowUp, CalendarDaysIcon, ChevronRight, Plus, Smile } from "lucide-react";

export default function ChatScreenPreview() {
  const common = useThemeStore(
    (state) => state.theme.common
  )

  const chat = useThemeStore(
    (state) => state.theme.chat
  )

  const bubble = useThemeStore(
    (state) => state.theme.bubble
  )

  const input = useThemeStore(
    (state) => state.theme.input
  )

  // "url 22px 17px" -> url, capX(좌우 cap), capY(상하 cap)
  function parseBubbleImage(backgroundImage: string) {
    const parts = backgroundImage.trim().split(/\s+/);
    const url = parts[0];
    const capY = parseInt(parts[1]) || 0; // 좌우 cap 값
    const capX = parseInt(parts[2]) || 0; // 상하 cap 값
    return { url, capX, capY };
  }

  // "10px 17px 7px 11px" -> top right bottom left
  function parseEdgeInsets(insets: string) {
    const [top, left, bottom, right] = insets
      .trim()
      .split(/\s+/)
      .map((v) => parseInt(v) || 0);
    return { top, right, bottom, left };
  }
  // 최종적으로 borderImageSlice 값 계산 (inset + cap)
  function getBubbleStyle(backgroundImage: string, titleEdgeInsets: string) {
    const { url, capX, capY } = parseBubbleImage(backgroundImage);
    const { top, right, bottom, left } = parseEdgeInsets(titleEdgeInsets);

    const sliceTop = top + capY;
    const sliceRight = right + capX;
    const sliceBottom = bottom + capY;
    const sliceLeft = left + capX;

    return {
      borderImageSource: `url(${url})`,
      borderImageSlice: `${sliceTop} ${sliceRight} ${sliceBottom} ${sliceLeft} fill`,
      borderWidth: '10px', // 고정
    };
  }


  return (
    <div className="flex flex-col relative w-full h-full rounded-2xl">
      {/* 헤더 */}
      <PreviewHeader />
      {/* 배경 */}
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
                <div className="w-max h-7 flex items-center justify-center"
                  style={getBubbleStyle(
                    bubble.receive01,
                    bubble.receiveEdgeInsets
                  )}>
                  <span>어피치피치한</span>
                </div>
                <div className="w-max h-7 flex items-center justify-center"
                  style={getBubbleStyle(
                    bubble.receive02,
                    bubble.receiveGroupEdgeInsets
                  )}>
                  <span>봄~봄~봄이 왔어요</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* 채팅 입력 */}
      <div className=" flex gap-2 items-center text-center p-2"
        style={{ backgroundColor: input.bgColor, }}>
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: input.buttonBGColor,
              opacity: 30,
            }}
          />
          <Plus size={16} color={input.buttonFGColor} className="relative" />
        </div>
        <div className="relative flex flex-1 h-6 items-center justify-between px-2 rounded-full">
          {/* 배경 전용 레이어 - 얘만 알파 적용 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: input.buttonBGColor,
              opacity: 30,
            }}
          />

          {/* 콘텐츠는 배경 레이어 위에 별도로 - opacity 영향 없음 */}
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
