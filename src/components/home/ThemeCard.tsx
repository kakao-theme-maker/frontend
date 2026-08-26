import defaultIcon from '@/assets/images/commonIcoTheme.png'

export default function ThemeCard() {
  return (
    <div className="w-full flex flex-col bg-white rounded-2xl border border-slate-300">
      <img src={defaultIcon} alt="" className="w-full rounded-t-2xl" />
      <div className="flex flex-col p-3 sm:p-4">
        <span className="text-lg sm:text-xl lg:text-[30px] font-bold">어피치 테마</span>
        <span className="text-sm sm:text-base lg:text-[20px] text-slate-400">2026.07.16</span>
      </div>
    </div>
  )
}