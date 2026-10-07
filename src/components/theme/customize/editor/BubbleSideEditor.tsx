// src/components/theme/customize/editor/BubbleSideEditor.tsx
import ColorChip from "@/components/common/ColorChip";
import Input from "@/components/common/Input";
import { useThemeStore } from "@/store/customizeStore";
import BubbleImageField from "./BubbleImageField";
import EditorField from "./EditorField";
import EditorSection from "./EditorSection";
import FieldRow from "./FieldRow";

interface BubbleSideEditorProps {
  side: "receive" | "send";
  title: string;
}

// 받는/보내는 말풍선 한쪽의 이미지·텍스트색·여백 설정 섹션 컴포넌트
export default function BubbleSideEditor({ side, title }: BubbleSideEditorProps) {
  const bubble = useThemeStore((state) => state.theme.bubble);
  const setBubble = useThemeStore((state) => state.setBubble);

  const imageKeys = [`${side}01`, `${side}02`] as const;
  const textColorKey = `${side}TextColor` as const;
  const edgeInsetsFields = [
    { key: `${side}EdgeInsets`, label: "개별 말풍선" },
    { key: `${side}GroupEdgeInsets`, label: "연속 그룹 말풍선" },
  ] as const;

  return (
    <EditorSection title={title}>
      <FieldRow>
        {imageKeys.map((key, index) => (
          <BubbleImageField
            key={key}
            label={`배경 이미지 ${index + 1}`}
            alt={`${title} 배경 이미지 ${index + 1}`}
            value={bubble[key]}
            onChange={(value) => setBubble({ [key]: value })}
          />
        ))}

        <ColorChip
          label="텍스트 색상"
          hex={bubble[textColorKey]}
          onChange={(color) => setBubble({ [textColorKey]: color })}
        />
      </FieldRow>

      <p className="mb-1.5 mt-4 text-sm text-field-label">여백 (padding)</p>
      <FieldRow>
        {edgeInsetsFields.map((field) => (
          <EditorField key={field.key} label={field.label} hint>
            <Input
              type="text"
              variant="dashed"
              value={bubble[field.key]}
              onChange={(e) => setBubble({ [field.key]: e.target.value })}
            />
          </EditorField>
        ))}
      </FieldRow>
    </EditorSection>
  );
}
