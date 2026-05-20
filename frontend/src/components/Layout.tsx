import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { DISCLAIMER } from "../utils/constants";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="text-center py-4 px-4 text-text-secondary text-xs border-t border-gray-100">
        {DISCLAIMER}
      </footer>
    </div>
  );
}
