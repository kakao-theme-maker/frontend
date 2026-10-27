// src/components/theme/customize/editor/BubbleSideEditor.tsx
import { typeCodeOf } from "@/config/themeStyleMap";
import { useThemeStore } from "@/store/customizeStore";
import BubbleImageField from "./BubbleImageField";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";
import ThemeColorChip from "./ThemeColorChip";

interface BubbleSideEditorProps {
  side: "receive" | "send";
  title: string;
}

// 받는/보내는 말풍선 한쪽의 이미지·텍스트색·여백 설정 섹션 컴포넌트
export default function BubbleSideEditor({ side, title }: BubbleSideEditorProps) {
  const bubble = useThemeStore((state) => state.theme.bubble);
  const setBubble = useThemeStore((state) => state.setBubble);

  // 이미지 1은 개별 말풍선, 이미지 2는 연속 그룹 말풍선 (각각 자기 여백 값을 가짐)
  const imageFields = [
    { imageKey: `${side}01`, insetsKey: `${side}EdgeInsets`, name: "개별 말풍선" },
    { imageKey: `${side}02`, insetsKey: `${side}GroupEdgeInsets`, name: "연속 그룹 말풍선" },
  ] as const;
  const textColorKey = `${side}TextColor` as const;

  return (
    <EditorSection title={title}>
      <FieldRow>
        {imageFields.map(({ imageKey, insetsKey, name }, index) => (
          <BubbleImageField
            key={imageKey}
            typeCode={typeCodeOf("bubble", imageKey)}
            label={`배경 이미지 ${index + 1} (${name})`}
            alt={`${title} 배경 이미지 ${index + 1}`}
            value={bubble[imageKey]}
            onChange={(value) => setBubble({ [imageKey]: value })}
            insets={bubble[insetsKey]}
            onInsetsChange={(value) => setBubble({ [insetsKey]: value })}
          />
        ))}

        <ThemeColorChip section="bubble" field={textColorKey} label="텍스트 색상" />
      </FieldRow>
    </EditorSection>
  );
}