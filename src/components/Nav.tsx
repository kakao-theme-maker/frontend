// src/components/Nav.tsx
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Avatar from "@/components/common/Avatar";
import { kakaoLogin } from "@/config/auth";
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

// 상단 네비게이션 바 컴포넌트
// - 비로그인: 홈화면/커뮤니티 + 로그인 링크
// - 로그인: 데스크톱(md 이상)은 가로 메뉴, 모바일은 햄버거 메뉴(드롭다운)
export default function Nav() {
  const { data: me, isLoading } = useMe();
  const { pathname, search } = useLocation();
  const [open, setOpen] = useState(false);

  const items = me ? NAV_ITEMS : GUEST_NAV_ITEMS;

  // 페이지가 바뀌면 모바일 메뉴 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-14 bg-white sm:h-16">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 justify-start md:flex-1">
          <Link to="/" aria-label="홈으로">
            <img src={logo} alt="로고" className="h-7 w-auto sm:h-8" />
          </Link>
        </div>

        {/* 가로 메뉴: 로그인 상태에선 md 이상에서만, 비로그인(2개)은 항상 표시 */}
        <div className={`${me ? "hidden md:flex" : "flex"} flex-1 justify-center md:flex-none`}>
          <div className="flex items-center gap-2 lg:gap-4">
            {items.map((item) => (
              <NavButton key={item.path} label={item.label} path={item.path} />
            ))}
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-2 md:ml-0 md:flex-1">
          {me ? (
            <>
              <Avatar size="sm" src={me.profileImage || undefined} alt="내 프로필" />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={open}
                className="rounded-full p-1.5 text-black transition-colors hover:bg-primary-soft md:hidden"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </>
          ) : (
            !isLoading && (
              <button
                type="button"
                onClick={() => kakaoLogin(pathname + search)}
                className="whitespace-nowrap text-sm text-muted transition-colors hover:text-primary sm:text-base"
              >
                로그인
              </button>
            )
          )}
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {me && open && (
        <div className="absolute inset-x-0 top-full border-t border-slate-100 bg-white shadow-md md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-2 py-2">
            {items.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive ? "bg-primary-soft text-primary" : "text-black hover:bg-slate-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}