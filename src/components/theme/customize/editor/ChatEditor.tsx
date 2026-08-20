import ColorChip from "@/components/common/ColorChip";
import ImageUpload from "@/components/common/ImageUpload";
import { useThemeStore } from "@/store/customizeStore";

export default function ChatEditor() {
  const chat = useThemeStore((state) => state.theme.chat);
  const bubble = useThemeStore((state) => state.theme.bubble);
  const input = useThemeStore((state) => state.theme.input);

  const setChat = useThemeStore((state) => state.setChat);
  const setBubble = useThemeStore((state) => state.setBubble);
  const setInput = useThemeStore((state) => state.setInput);

  return (
    <div className="flex flex-col gap-6">
      {/* 배경 */}
      <div>
        <h3 className="text-sm font-semibold mb-2">배경</h3>
        <div className="flex flex-wrap items-start gap-4">
          <div>
            <span className="mb-1.5 block text-sm text-[#5B6C9B]">배경 이미지</span>
            <ImageUpload
              value={chat.bgImage}
              onChange={(url) => setChat({ bgImage: url })}
              alt="채팅방 배경 이미지"
            />
          </div>
          <ColorChip
            label="채팅방 배경색"
            hex={chat.bgColor}
            onChange={(color) => setChat({ bgColor: color })}
          />
        </div>
      </div>

      {/* 말풍선 */}
      <div>
        <h3 className="text-sm font-semibold mb-2">말풍선</h3>
        <div className="flex gap-4">
          <ColorChip
            label="받는 텍스트"
            hex={bubble.receiveTextColor}
            onChange={(color) => setBubble({ receiveTextColor: color })}
          />
          <ColorChip
            label="보내는 텍스트"
            hex={bubble.sendTextColor}
            onChange={(color) => setBubble({ sendTextColor: color })}
          />
          <ColorChip
            label="안읽음 숫자"
            hex={bubble.unreadCountColor}
            onChange={(color) => setBubble({ unreadCountColor: color })}
          />
        </div>
      </div>

      {/* 입력창 */}
      <div>
        <h3 className="text-sm font-semibold mb-2">입력창</h3>
        <div className="flex gap-4 flex-wrap">
          <ColorChip
            label="입력창 배경"
            hex={input.bgColor}
            onChange={(color) => setInput({ bgColor: color })}
          />
          <ColorChip
            label="버튼 배경"
            hex={input.buttonBGColor}
            onChange={(color) => setInput({ buttonBGColor: color })}
          />
          <ColorChip
            label="버튼 아이콘"
            hex={input.buttonFGColor}
            onChange={(color) => setInput({ buttonFGColor: color })}
          />
          <ColorChip
            label="버튼 텍스트"
            hex={input.buttonTextColor}
            onChange={(color) => setInput({ buttonTextColor: color })}
          />
          <ColorChip
            label="전송 버튼 배경"
            hex={input.sendBGColor}
            onChange={(color) => setInput({ sendBGColor: color })}
          />
          <ColorChip
            label="전송 버튼 아이콘"
            hex={input.sendFGColor}
            onChange={(color) => setInput({ sendFGColor: color })}
          />
        </div>
      </div>
    </div>
  );
}