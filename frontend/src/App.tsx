import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing";
import MoodCheckin from "./pages/MoodCheckin";
import Journal from "./pages/Journal";
import Breathe from "./pages/Breathe";
import Resources from "./pages/Resources";
import Crisis from "./pages/Crisis";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/checkin" element={<MoodCheckin />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/breathe" element={<Breathe />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/crisis" element={<Crisis />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
