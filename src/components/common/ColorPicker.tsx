// src/components/common/ColorPicker.tsx
import { useState } from "react";
import {
  HexColorInput,
  HexColorPicker,
} from "react-colorful";

// HEX 컬러 피커와 입력창 컴포넌트
export default function ColorPicker() {
  const [color, setColor] = useState("#FFB6C1");

  return (
    <div>
      <HexColorPicker
        color={color}
        onChange={setColor}
      />

      <HexColorInput
        color={color}
        onChange={setColor}
        prefixed
      />

      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: color,
        }}
      />
    </div>
  );
}