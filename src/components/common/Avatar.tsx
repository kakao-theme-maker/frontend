// src/components/common/Avatar.tsx
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_STYLES = {
  sm: "h-7 w-7",
  md: "h-10 w-10",
  lg: "h-11 w-11",
  xl: "h-24 w-24 sm:h-28 sm:w-28",
} as const;

// 프로필 이미지 또는 회색 원형 자리표시를 보여주는 아바타 컴포넌트
export default function Avatar({ src, alt = "", size = "md", className = "" }: AvatarProps) {
  const base = `shrink-0 rounded-full ${SIZE_STYLES[size]} ${className}`;

  return src ? (
    <img src={src} alt={alt} className={`${base} object-cover`} />
  ) : (
    <div aria-hidden="true" className={`${base} bg-slate-200`} />
  );
}
