// src/components/theme/customize/editor/ChatEditor.tsx
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import ThemeColorChip from "./ThemeColorChip";
import ThemeImageField from "./ThemeImageField";

// 채팅방(배경, 말풍선, 입력창) 설정 에디터 컴포넌트
export default function ChatEditor() {
  return (
    <div className="flex flex-col gap-6">
      <EditorSection title="배경">
        <FieldRow>
          <ThemeImageField section="chat" field="bgImage" label="배경 이미지" alt="채팅방 배경 이미지" removable={false} />
          <ThemeColorChip section="chat" field="bgColor" label="채팅방 배경색" />
        </FieldRow>
      </EditorSection>

      <EditorSection title="말풍선">
        <FieldRow>
          <ThemeColorChip section="bubble" field="receiveTextColor" label="받는 텍스트" />
          <ThemeColorChip section="bubble" field="sendTextColor" label="보내는 텍스트" />
          <ThemeColorChip section="bubble" field="unreadCountColor" label="안읽음 숫자" />
        </FieldRow>
      </EditorSection>

      <EditorSection title="입력창">
        <FieldRow>
          <ThemeColorChip section="input" field="bgColor" label="입력창 배경" />
          <ThemeColorChip section="input" field="buttonBGColor" label="버튼 배경" />
          <ThemeColorChip section="input" field="buttonFGColor" label="버튼 아이콘" />
          <ThemeColorChip section="input" field="buttonTextColor" label="버튼 텍스트" />
          <ThemeColorChip section="input" field="sendBGColor" label="전송 버튼 배경" />
          <ThemeColorChip section="input" field="sendFGColor" label="전송 버튼 아이콘" />
        </FieldRow>
      </EditorSection>
    </div>
  );
}