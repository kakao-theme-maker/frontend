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
import ThemePreview from "@/components/theme/customize/ThemePreview";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/mypage" element={<MyPage />} />

        <Route path="/community" element={<Community />} />
        <Route path="/community/write" element={<Write />} />

        <Route path="/themes" element={<ThemeList />} />
        <Route path="/themes/manage" element={<Manage />} />
        {/* <Route path="/themes/:id/preview" element={<ThemePreview />} /> */}
        <Route path="/themes/:id/customize" element={<CustomizeLayout />}>
          <Route index element={<CustomizeMain />} />
          <Route path="chat" element={<CustomizeChat />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
