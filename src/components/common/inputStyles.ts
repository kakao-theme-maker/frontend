// src/components/common/inputStyles.ts
export type InputVariant = "plain" | "outline" | "dashed" | "bare";

export const INPUT_DECOR_STYLES: Record<InputVariant, string> = {
  plain: "",
  outline:
    "rounded-lg border border-slate-200 bg-slate-50 focus-visible:ring-2 focus-visible:ring-primary/40",
  dashed:
    "rounded-lg border border-dashed border-field-border bg-primary-soft focus-visible:ring-2 focus-visible:ring-primary/40",
  bare: "bg-transparent",
};
