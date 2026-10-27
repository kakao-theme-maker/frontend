// src/components/theme/customize/editor/BubbleImageField.tsx
import ImageUpload from "@/components/common/ImageUpload";
import { formatAsset, formatEdgeInsets, parseAsset, parseEdgeInsets } from "@/utils/bubbleStyle";
import BubbleSliceEditor, { type SliceValues } from "./BubbleSliceEditor";
import EditorField from "./EditorField";

interface BubbleImageFieldProps {
  typeCode: string;
  label: string;
  alt: string;
  value: string;
  onChange: (value: string) => void;
  insets: string;
  onInsetsChange: (value: string) => void;
}

// 말풍선 배경 이미지와, 이미지 위에서 끌어 조절하는 늘어나는 지점·글자 여백을 함께 편집하는 필드 컴포넌트
export default function BubbleImageField({
  typeCode,
  label,
  alt,
  value,
  onChange,
  insets,
  onInsetsChange,
}: BubbleImageFieldProps) {
  const asset = parseAsset(value);
  const parsedInsets = parseEdgeInsets(insets);
  // 저장 형식 "url 첫째px 둘째px"에서 첫째는 위·아래, 둘째는 좌·우 늘어나는 지점
  const sliceValues: SliceValues = { capY: asset.width, capX: asset.height, insets: parsedInsets };

  // 바뀐 값만 저장 (늘어나는 지점 / 여백)
  const handleSliceChange = (next: SliceValues) => {
    if (next.capY !== sliceValues.capY || next.capX !== sliceValues.capX) {
      onChange(formatAsset(asset.url, next.capY, next.capX));
    }
    if (JSON.stringify(next.insets) !== JSON.stringify(sliceValues.insets)) {
      onInsetsChange(formatEdgeInsets(next.insets));
    }
  };

  return (
    <EditorField label={label}>
      <ImageUpload
        typeCode={typeCode}
        size={100}
        value={asset.url}
        onChange={(url) => onChange(formatAsset(url, asset.width, asset.height))}
        onRemove={() => onChange(formatAsset("", asset.width, asset.height))}
        alt={alt}
      />
      <BubbleSliceEditor url={asset.url} values={sliceValues} onChange={handleSliceChange} />
    </EditorField>
  );
}
