import NavButton from "./NavButton";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-25 bg-white max-w-360 mx-auto">
      <div className="w-full h-full flex items-center py-3 px-20 overflow-x-scroll">
        {/* 왼쪽 */}
        <div className="flex-1">
          <span>로고</span>
        </div>

        {/* 가운데 */}
        <div className="flex items-center gap-6">
          <NavButton label="홈화면" path="/" isSelected />
          <NavButton label="커뮤니티" path="/community" />
          <NavButton label="테마만들기" path="/themes/123/customize" />
          <NavButton label="테마관리" path="/themes/manage" />
          <NavButton label="마이페이지" path="/mypage" />
        </div>

        {/* 오른쪽 */}
        <div className="flex-1 flex justify-end">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
        </div>
      </div>

    </nav>
  )
}
