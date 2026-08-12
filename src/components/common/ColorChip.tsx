import { useState } from "react";
import { HexColorInput, HexColorPicker, } from "react-colorful";

type ColorChipProps = {
  label: string;
  hex: string;
  onChange: (color: string) => void;
};

export default function ColorChip({
  label,
  hex,
  onChange,
}: ColorChipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <p className="mb-2 text-sm">
        {label}
      </p>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <span
          className="h-5 w-5 rounded-md"
          style={{
            backgroundColor: hex,
          }}
        />

        <span className="text-sm">
          {hex}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full left-0 z-20 mt-2 rounded-lg bg-white p-3 shadow-lg">
            <HexColorPicker
              color={hex}
              onChange={onChange}
            />

            <HexColorInput
              color={hex}
              onChange={onChange}
              prefixed
              className="mt-3 w-full rounded border px-2 py-1"
            />
          </div>
        </>
      )}
    </div>
  );
}
