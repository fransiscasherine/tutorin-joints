import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import SearchBar from "./components/common/SearchBar";
import AppIcon from "./components/common/AppIcon";
import Dashboard from "./pages/Dashboardmentee/dashboard/Dashboard";
import "./pages/mentee/Dashboard.css";

function AlternatePage({ active, setActive }) {
  const pages = {
    "Cari tutor": {
      icon: "fa7-solid:search",
      title: "Cari tutor",
      description: "Temukan tutor yang sesuai dengan mata pelajaran yang kamu butuhkan.",
    },
    Sesi: {
      icon: "fa7-solid:calendar",
      title: "Sesi belajar",
      description: "Lihat dan kelola jadwal sesi belajar kamu.",
    },
    Akun: {
      icon: "fa7-solid:user",
      title: "Akun saya",
      description: "Kelola informasi dan preferensi akunmu.",
    },
    "Jadi tutor": {
      icon: "fluent:hat-graduation-12-regular",
      title: "Mulai mengajar",
      description: "Bagikan keahlianmu, bantu pelajar lain, dan dapatkan kredit.",
    },
  };

  const page = pages[active];

  if (!page) return null;

  return (
    <div className="alternate-page">
      <div className="alternate-icon">
        <AppIcon name={page.icon} size={42} />
      </div>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
      <button className="primary-button" onClick={() => setActive("Beranda")}>
        <AppIcon name="solar:alt-arrow-left-linear" size={18} />
        Kembali ke Beranda
      </button>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Beranda");

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} />

      <main className="main-area">
        <div className="topbar-row">
          <SearchBar />
          <Header />
        </div>

        {active === "Beranda" ? (
          <Dashboard setActive={setActive} />
        ) : (
          <AlternatePage active={active} setActive={setActive} />
        )}
      </main>
    </div>
  );
}
