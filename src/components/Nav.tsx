import NavButton from "./NavButton";

const NAV_ITEMS = [
  { label: "홈화면", path: "/" },
  { label: "커뮤니티", path: "/community" },
  { label: "테마만들기", path: "/themes/123/customize" },
  { label: "테마관리", path: "/themes/manage" },
  { label: "마이페이지", path: "/mypage" },
] as const;

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 lg:h-25 bg-white max-w-360 mx-auto">
      <div className="w-full h-full flex items-center gap-4 py-3 px-4 sm:px-8 lg:px-20">
        {/* 왼쪽 */}
        <div className="shrink-0">
          <span>로고</span>
        </div>

        {/* 가운데 */}
        <div className="flex items-center gap-4 lg:gap-6 overflow-x-auto flex-1 min-w-0">
          {NAV_ITEMS.map((item) => (
            <NavButton key={item.path} label={item.label} path={item.path} />
          ))}
        </div>

        {/* 오른쪽 */}
        <div className="shrink-0 flex justify-end">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
        </div>
      </div>

    </nav>
  )
}