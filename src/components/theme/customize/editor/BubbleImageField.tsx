// src/components/theme/customize/editor/BubbleImageField.tsx
import ImageUpload from "@/components/common/ImageUpload";
import Input from "@/components/common/Input";
import { formatAsset, parseAsset } from "@/utils/bubbleStyle";
import EditorField from "./EditorField";

interface BubbleImageFieldProps {
  label: string;
  alt: string;
  value: string;
  onChange: (value: string) => void;
}

// 말풍선 배경 이미지와 가로/세로 값을 함께 편집하는 필드 컴포넌트
export default function BubbleImageField({ label, alt, value, onChange }: BubbleImageFieldProps) {
  const asset = parseAsset(value);

  return (
    <EditorField label={label}>
      <ImageUpload
        size={100}
        value={asset.url}
        onChange={(url) => onChange(formatAsset(url, asset.width, asset.height))}
        onRemove={() => onChange(formatAsset("", asset.width, asset.height))}
        alt={alt}
      />
      <div className="mt-2 flex gap-2">
        <Input
          type="number"
          variant="dashed"
          className="w-16"
          value={asset.width}
          onChange={(e) => onChange(formatAsset(asset.url, Number(e.target.value), asset.height))}
        />
        <Input
          type="number"
          variant="dashed"
          className="w-16"
          value={asset.height}
          onChange={(e) => onChange(formatAsset(asset.url, asset.width, Number(e.target.value)))}
        />
      </div>
    </EditorField>
  );
}
