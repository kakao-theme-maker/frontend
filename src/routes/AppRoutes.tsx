// src/routes/AppRoutes.tsx
import Home from "@/pages/Home";
import CustomizeChat from "@/pages/theme/customize/CustomizeChat";
import CustomizeLayout from "@/pages/theme/customize/CustomizeLayout";
import NotFound from "@/pages/NotFound";
import ThemeList from "@/pages/theme/ThemeList";
import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import CustomizeMain from "@/pages/theme/customize/CustomizeMain";
import Community from "@/pages/community/Community";
import MyPage from "@/pages/MyPage";
import Manage from "@/pages/theme/Manage";
import Write from "@/pages/community/Write";
import Detail from "@/pages/community/Detail";
import Login from "@/pages/Login";
import RequireAuth from "@/components/auth/RequireAuth";

// 앱 전체 라우트 정의 (RequireAuth 아래 라우트는 로그인 필요)
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/community" element={<Community />} />
        <Route path="/community/:postId" element={<Detail />} />

        <Route element={<RequireAuth />}>
          <Route path="/mypage" element={<MyPage />} />

          <Route path="/community/write" element={<Write />} />

          <Route path="/themes" element={<ThemeList />} />
          <Route path="/themes/manage" element={<Manage />} />
          <Route path="/themes/:id/customize" element={<CustomizeLayout />}>
            <Route index element={<CustomizeMain />} />
            <Route path="chat" element={<CustomizeChat />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
