import ThemeCard from "@/components/home/ThemeCard"
import { ArrowRight, Loader, Sliders, } from "lucide-react"

const RECENT_THEMES = Array.from({ length: 8 }, (_, i) => i);

export default function Home() {
  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 lg:px-20">
      <header>
        <h1 className="sr-only">komentum - 나만의 카카오톡 테마 만들기</h1>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">안녕하세요 다현님</p>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 pt-3 pb-6 sm:pt-4 sm:pb-8">오늘은 어떤 테마를 만들어 볼까요</p>
      </header>

      <section>
        <h2 className="sr-only">테마 생성 모드 선택</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1 p-6 sm:p-8 lg:p-10 rounded-3xl lg:rounded-4xl
        bg-linear-150 from-blue-100 to-purple-100">
            <div className="flex gap-4 items-center">
              <Loader className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shrink-0 text-blue-500 bg-white p-2.5 sm:p-3 lg:p-3.5 rounded-2xl" />
              <span className="font-semibold text-xl sm:text-2xl lg:text-3xl">간편모드</span>
            </div>
            <div className="py-2 text-base sm:text-lg lg:text-xl text-slate-500">
              <p>몇 번의 터치로</p>
              <p>나만의 테마를 완성하세요</p>
            </div>
            <ArrowRight className="ml-auto w-11 h-11 sm:w-13 sm:h-13 lg:w-15 lg:h-15 bg-primary text-white rounded-full p-3 sm:p-3.5 lg:p-4" />
          </div>
          <div className="flex-1 w-full p-6 sm:p-8 lg:p-10 rounded-3xl lg:rounded-4xl
        bg-linear-150 from-brand-dark to-brand-dark-2">
            <div className="flex gap-4 items-center">
              <Sliders className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shrink-0 text-white bg-white/30 p-2.5 sm:p-3 lg:p-3.5 rounded-2xl" />
              <span className="font-semibold text-xl sm:text-2xl lg:text-3xl text-white">디자이너 모드</span>
            </div>
            <div className="py-2 text-base sm:text-lg lg:text-xl text-slate-400">
              <p>몇 번의 터치로</p>
              <p>나만의 테마를 완성하세요</p>
            </div>
            <ArrowRight className="ml-auto w-11 h-11 sm:w-13 sm:h-13 lg:w-15 lg:h-15 bg-white text-primary rounded-full p-3 sm:p-3.5 lg:p-4" />
          </div>
        </div>

      </section>

      <section>
        <div className="flex justify-between items-center">
          <h2 className="py-6 sm:py-8 text-xl sm:text-2xl lg:text-3xl font-bold">내가 최근에 만든 디자인</h2>
          <span className="py-6 sm:py-8 text-sm sm:text-base lg:text-3xl font-bold text-primary shrink-0">전체보기</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {RECENT_THEMES.map((id) => (
            <ThemeCard key={id} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center">
          <h2 className="py-6 sm:py-8 text-xl sm:text-2xl lg:text-3xl font-bold">다른 사람들의 테마 둘러보기</h2>
          <span className="py-6 sm:py-8 text-sm sm:text-base lg:text-3xl font-bold text-primary shrink-0">더보기</span>
        </div>
      </section>
    </ div>
  )
}