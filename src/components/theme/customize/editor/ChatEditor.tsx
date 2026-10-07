// src/components/theme/customize/editor/ChatEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import ImageUpload from "@/components/common/ImageUpload";
import { useThemeStore } from "@/store/customizeStore";
import EditorField from "./EditorField";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";

// 채팅방(배경, 말풍선, 입력창) 설정 에디터 컴포넌트
export default function ChatEditor() {
  const chat = useThemeStore((state) => state.theme.chat);
  const bubble = useThemeStore((state) => state.theme.bubble);
  const input = useThemeStore((state) => state.theme.input);

  const setChat = useThemeStore((state) => state.setChat);
  const setBubble = useThemeStore((state) => state.setBubble);
  const setInput = useThemeStore((state) => state.setInput);

  return (
    <div className="flex flex-col gap-6">
      <EditorSection title="배경">
        <FieldRow>
          <EditorField label="배경 이미지">
            <ImageUpload
              value={chat.bgImage}
              onChange={(url) => setChat({ bgImage: url })}
              alt="채팅방 배경 이미지"
            />
          </EditorField>
          <ColorChip
            label="채팅방 배경색"
            hex={chat.bgColor}
            onChange={(color) => setChat({ bgColor: color })}
          />
        </FieldRow>
      </EditorSection>

      <EditorSection title="말풍선">
        <FieldRow>
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
        </FieldRow>
      </EditorSection>

      <EditorSection title="입력창">
        <FieldRow>
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
        </FieldRow>
      </EditorSection>
    </div>
  );
}
