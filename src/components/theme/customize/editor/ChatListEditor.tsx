// src/components/theme/customize/editor/ChatListEditor.tsx
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import ThemeColorChip from "./ThemeColorChip";

// 채팅목록(채팅방 제목, 마지막 메시지, 목록 배경) 설정 에디터 컴포넌트
export default function ChatListEditor() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs text-field-hint">
        기본 텍스트·배경 색상은 상단 '테마 기본 설정'에서 바꿀 수 있어요.
      </p>

      <EditorSection title="채팅방 제목">
        <FieldRow>
          <ThemeColorChip section="common" field="mainHighlightedTextColor" label="제목 눌림 텍스트" />
        </FieldRow>
      </EditorSection>

      <EditorSection title="마지막 메시지">
        <FieldRow>
          <ThemeColorChip section="chatList" field="paragraphTextColor" label="메시지 텍스트" />
          <ThemeColorChip section="chatList" field="paragraphHighlightedTextColor" label="메시지 눌림 텍스트" />
        </FieldRow>
      </EditorSection>

      <EditorSection title="목록">
        <FieldRow>
          <ThemeColorChip section="common" field="mainNormalBGColor" label="목록 배경" />
          <ThemeColorChip section="common" field="mainSelectedBGColor" label="목록 눌림 배경" />
          <ThemeColorChip section="common" field="featureTextColor" label="메뉴 버튼" />
        </FieldRow>
      </EditorSection>
    </div>
  );
}
