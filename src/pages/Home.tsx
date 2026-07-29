import ThemeCard from "@/components/home/ThemeCard"
import { ArrowRight, Loader, Sliders, } from "lucide-react"

export default function Home() {
  return (
    <div className="py-8 px-20">
      <header>
        <h1 className="sr-only">komentum - 나만의 카카오톡 테마 만들기</h1>
        <p className="text-5xl font-bold">안녕하세요 다현님</p>
        <p className="text-xl text-gray-400 pt-4 pb-8">오늘은 어떤 테마를 만들어 볼까요</p>
      </header>

      <section className="flex justify-between">
        <h2 className="sr-only">테마 생성 모드 선택</h2>
        <div className="flex gap-4 w-full">
          <div className="flex-1  p-10 rounded-4xl
        bg-linear-150 from-blue-100 to-purple-100">
            <div className="flex gap-4 items-center">
              <Loader className="w-12 h-12 text-blue-500 bg-white p-3.5 rounded-2xl" />
              <span className="font-semibold text-3xl">간편모드</span>
            </div>
            <div className="py-2 text-xl text-slate-500">
              <p>몇 번의 터치로</p>
              <p>나만의 테마를 완성하세요</p>
            </div>
            <ArrowRight className="ml-auto w-15 h-15 bg-blue-600 text-white rounded-full p-4" />
          </div>
          <div className="flex-1 w-full p-10 rounded-4xl
        bg-linear-150 from-[#111737] to-[#1B2355]">
            <div className="flex gap-4 items-center">
              <Sliders className="w-12 h-12 text-white bg-white/30 p-3.5 rounded-2xl" />
              <span className="font-semibold text-3xl text-white">디자이너 모드</span>
            </div>
            <div className="py-2 text-xl text-slate-400">
              <p>몇 번의 터치로</p>
              <p>나만의 테마를 완성하세요</p>
            </div>
            <ArrowRight className="ml-auto w-15 h-15 bg-white text-blue-600 rounded-full p-4" />
          </div>
        </div>

      </section>

      <section>
        <div className="flex justify-between">
          <h2 className="py-8 text-[32px] font-bold">내가 최근에 만든 디자인</h2>
          <span className="py-8 text-[32px] font-bold text-blue-600">전체보기</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          <ThemeCard />
          <ThemeCard />
          <ThemeCard />
          <ThemeCard />
          <ThemeCard />
          <ThemeCard />
          <ThemeCard />
          <ThemeCard />
        </div>
      </section>

      <section>
        <div className="flex justify-between">
          <h2 className="py-8 text-[32px] font-bold">다른 사람들의 테마 둘러보기</h2>
          <span className="py-8 text-[32px] font-bold text-blue-600">더보기</span>
        </div>
      </section>
    </ div>
  )
}
