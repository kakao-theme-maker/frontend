// src/components/theme/customize/editor/FriendsEditor.tsx
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import ThemeColorChip from "./ThemeColorChip";
import ThemeImageField from "./ThemeImageField";

// 친구 화면(헤더, 섹션 제목, 친구 목록, 친구 추가 버튼) 설정 에디터 컴포넌트
export default function FriendsEditor() {
  return (
    <div className="flex flex-col gap-6">
      <EditorSection title="헤더">
        <FieldRow>
          <ThemeColorChip section="friends" field="headerTextColor" label="타이틀·아이콘" />
          <ThemeColorChip section="common" field="featureTextColor" label="서비스 버튼" />
        </FieldRow>
      </EditorSection>

      <EditorSection title="섹션 제목">
        <FieldRow>
          <ThemeColorChip section="friends" field="sectionTitleTextColor" label="제목 텍스트" />
          <ThemeColorChip section="friends" field="sectionTitleBorderColor" label="구분선" />
        </FieldRow>
      </EditorSection>

      <EditorSection title="친구 목록">
        <FieldRow>
          <ThemeColorChip section="common" field="mainNormalBGColor" label="목록 배경" />
          <ThemeColorChip section="common" field="mainSelectedBGColor" label="목록 눌림 배경" />
          <ThemeColorChip section="common" field="mainDescriptionHighlightedColor" label="설명 눌림 텍스트" />
        </FieldRow>
      </EditorSection>

      <EditorSection title="친구 추가 버튼">
        <FieldRow>
          <ThemeImageField
            section="friends"
            field="addFriendImage"
            label="버튼 이미지"
            alt="친구 추가 버튼 이미지"
            removable={false}
          />
        </FieldRow>
      </EditorSection>
    </div>
  );
}
