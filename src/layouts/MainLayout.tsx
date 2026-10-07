// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Nav와 Footer가 포함된 공통 레이아웃 컴포넌트
export default function MainLayout() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col pt-14 sm:pt-16">
      <Nav />

      <main className="flex-1 bg-app-bg">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}