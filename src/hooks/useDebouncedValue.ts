// src/hooks/useDebouncedValue.ts
import { useEffect, useState } from "react";

// 값이 delay(ms) 동안 바뀌지 않을 때만 갱신되는 값을 반환하는 훅
export default function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
