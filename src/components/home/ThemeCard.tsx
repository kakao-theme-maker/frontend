import defaultIcon from "@/assets/images/commonIcoTheme.png";

export default function ThemeCard() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-300 bg-white">
      <img
        src={defaultIcon}
        alt=""
        className="aspect-square w-full object-cover"
      />

      <div className="flex flex-col p-3 sm:p-3.5">
        <span className="truncate text-base font-bold sm:text-lg">
          어피치 테마
        </span>

        <span className="text-xs text-slate-400 sm:text-sm">
          2026.07.16
        </span>
      </div>
    </div>
  );
}