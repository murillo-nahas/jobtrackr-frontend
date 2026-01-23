import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-row flex-1">
        <Sidebar />
        <main className="p-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
