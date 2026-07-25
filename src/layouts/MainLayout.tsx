import { Outlet } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function MainLayout() {
  return (
    <div className="relation min-h-screen flex flex-col pt-25 max-w-360 mx-auto ">
      <Nav />

      <main className="flex-1 bg-[#F8F9FC]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}