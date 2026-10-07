// src/components/Nav.tsx
import { Link, useLocation } from "react-router-dom";
import Avatar from "@/components/common/Avatar";
import useMe from "@/hooks/useMe";
import logo from "@/assets/logo.svg";
import NavButton from "./NavButton";

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "홈화면", path: "/" },
  { label: "커뮤니티", path: "/community" },
  { label: "테마만들기", path: "/themes/new/customize" },
  { label: "테마관리", path: "/themes/manage" },
  { label: "마이페이지", path: "/mypage" },
];

// 비로그인일 때 보이는 메뉴 (홈화면, 커뮤니티)
const GUEST_NAV_ITEMS = NAV_ITEMS.slice(0, 2);

// 상단 네비게이션 바 컴포넌트 (비로그인이면 로그인 링크, 로그인이면 전체 메뉴와 프로필)
export default function Nav() {
  const { data: me, isLoading } = useMe();
  const { pathname, search } = useLocation();

  const items = me ? NAV_ITEMS : GUEST_NAV_ITEMS;
  // 로그인 후 지금 보던 페이지로 돌아오도록 현재 주소를 전달 (로그인 페이지에서는 제외)
  const loginState = pathname === "/login" ? undefined : { from: pathname + search };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-14 bg-white sm:h-16">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 justify-start lg:flex-1">
          <img src={logo} alt="로고" className="h-8 w-auto" />
        </div>

        <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none]">
          <div className="mx-auto flex w-max items-center gap-2 sm:gap-4">
            {items.map((item) => (
              <NavButton
                key={item.path}
                label={item.label}
                path={item.path}
              />
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end lg:flex-1">
          {me ? (
            <Avatar size="sm" src={me.profile_image || undefined} alt="내 프로필" />
          ) : (
            !isLoading && (
              <Link
                to="/login"
                state={loginState}
                className="text-sm text-muted transition-colors hover:text-primary sm:text-base"
              >
                로그인
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
