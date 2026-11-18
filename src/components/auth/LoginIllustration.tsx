// src/components/auth/LoginIllustration.tsx
import { Star } from "lucide-react";

// 로그인 화면 왼쪽의 환영 문구와 COLOR / ICON 장식 카드 컴포넌트
export default function LoginIllustration() {
  return (
    <div className="hidden flex-col justify-center gap-10 lg:flex">
      <p className="text-3xl font-bold">만나서 반가워요</p>

      <div aria-hidden="true" className="relative h-[420px] w-[420px] [zoom:0.85]">
        <div className="absolute left-4 top-6 flex h-40 w-72 -rotate-12 items-end rounded-3xl bg-white/80 p-6 shadow-[0_10px_40px_rgba(3,82,255,0.08)]">
          <div className="flex flex-col gap-2">
            <span className="text-2xl tracking-wide">COLOR</span>
            <div className="flex overflow-hidden rounded-full">
              <span className="h-5 w-10 bg-[#AFC0E6]" />
              <span className="h-5 w-10 bg-[#5B84E0]" />
              <span className="h-5 w-10 bg-[#0B4BDB]" />
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-56 flex h-56 w-96 items-center justify-between rounded-3xl bg-white/80 p-8 shadow-[0_10px_40px_rgba(3,82,255,0.08)]">
          <span className="text-3xl">ICON</span>
          <div className="relative h-28 w-40">
            <span
              className="absolute right-0 top-0 h-10 w-10 bg-[#AFC0E6]"
              style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
            />
            <span className="absolute bottom-0 left-2 h-12 w-12 rotate-[30deg] rounded-xl bg-[#0B4BDB]" />
            <Star
              size={52}
              fill="currentColor"
              strokeWidth={0}
              className="absolute bottom-0 right-6 text-[#5B84E0]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
