import { Outlet } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function MainLayout() {
  return (
    <div className="relation min-h-screen flex flex-col pt-16 sm:pt-20 lg:pt-25 max-w-7xl mx-auto ">
      <Nav />

      <main className="flex-1 bg-app-bg">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}