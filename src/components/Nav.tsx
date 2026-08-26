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
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 bg-white max-w-360 mx-auto">
      <div className="w-full h-full flex items-center px-4 sm:px-6 lg:px-8">
        {/* 왼쪽 */}
        <div className="flex-1 flex justify-start">
          <span className="text-base font-bold">로고</span>
        </div>

        {/* 가운데 */}
        <div className="flex-1 flex justify-center items-center gap-2 sm:gap-4">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.path}
              label={item.label}
              path={item.path}
            />
          ))}
        </div>

        {/* 오른쪽 */}
        <div className="flex-1 flex justify-end">
          <div className="w-7 h-7 rounded-full bg-gray-400" />
        </div>
      </div>
    </nav>
  );
}