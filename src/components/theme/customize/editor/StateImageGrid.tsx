// src/components/theme/customize/editor/StateImageGrid.tsx
import ImageUpload from "@/components/common/ImageUpload";

interface StateImageColumn<K extends string> {
  key: K;
  selectedKey: K;
  label: string;
}

interface StateImageGridProps<K extends string> {
  columns: readonly StateImageColumn<K>[];
  values: Record<K, string>;
  onChange: (key: K, url: string) => void;
  getAlt: (label: string, selected: boolean) => string;
}

// 항목별 안눌림/눌림 이미지를 한 번에 설정하는 그리드 컴포넌트
export default function StateImageGrid<K extends string>({
  columns,
  values,
  onChange,
  getAlt,
}: StateImageGridProps<K>) {
  const rows = [
    { title: "안눌림", selected: false },
    { title: "눌림", selected: true },
  ];

  return (
    <div
      className="grid items-center gap-x-3 gap-y-3"
      style={{ gridTemplateColumns: `56px repeat(${columns.length}, 48px)` }}
    >
      <div />
      {columns.map((column) => (
        <span
          key={column.key}
          className="text-center text-xs font-medium text-field-label"
        >
          {column.label}
        </span>
      ))}

      {rows.map((row) => (
        <div key={row.title} className="contents">
          <span className="text-sm text-field-label">{row.title}</span>
          {columns.map((column) => {
            const key = row.selected ? column.selectedKey : column.key;

            return (
              <ImageUpload
                key={key}
                size={48}
                value={values[key]}
                onChange={(url) => onChange(key, url)}
                onRemove={() => onChange(key, "")}
                alt={getAlt(column.label, row.selected)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
