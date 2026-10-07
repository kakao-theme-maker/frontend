// src/hooks/useMediaQuery.ts
import { useSyncExternalStore } from "react";

// 미디어 쿼리 일치 여부를 반환하는 훅
export default function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
