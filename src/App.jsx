
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import SearchBar from "./components/common/SearchBar";
import AppIcon from "./components/common/AppIcon";

import Dashboard from "./pages/mentee/dashboard/Dashboard";
import CariTutor from "./pages/mentee/cari tutor/CariTutor";
import Profil from "./pages/mentee/profil mentee/Profil";
import ProfilMentor from "./pages/mentee/profil mentor/ProfilMentor";
import RiwayatKredit from "./pages/mentee/riwayat kredit/RiwayatKredit";
import Sesi from "./pages/mentee/sesi/Sesi";
import Shop from "./pages/mentee/shop/Shop";
import Favorit from "./pages/mentee/favorit/Favorit";
import BookingSesi from "./pages/mentee/booking sesi/BookingSesi";
import DetailSesi from "./pages/mentee/detail sesi/DetailSesi";

import "./pages/mentee/dashboard/Dashboard.css";
import "./pages/mentee/cari tutor/CariTutor.css";
import "./pages/mentee/booking sesi/BookingSesi.css";
import "./pages/mentee/detail sesi/DetailSesi.css";

function AlternatePage({ active, setActive }) {
  const pages = {
    "Cari mentor": {
      icon: "fa7-solid:search",
      title: "Cari mentor",
      description:
        "Temukan mentor yang sesuai dengan mata pelajaran yang kamu butuhkan.",
    },
    "Jadi mentor": {
      icon: "fluent:hat-graduation-12-regular",
      title: "Mulai mengajar",
      description:
        "Bagikan keahlianmu, bantu pelajar lain, dan dapatkan kredit.",
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
      <button
        className="primary-button"
        onClick={() => setActive("Beranda")}
      >
        <AppIcon name="solar:alt-arrow-left-linear" size={18} />
        Kembali ke Beranda
      </button>
    </div>
  );
}

export default function App() {
  const [active, updateActive] = useState("Beranda");
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [profileOrigin, setProfileOrigin] = useState("Beranda");
  const [bookingNote, setBookingNote] = useState("");

  function setActive(page) {
    updateActive(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function openTutor(tutor) {
    setProfileOrigin(active);
    setSelectedTutor(tutor);
    setActive("Profil mentor");
  }

  const sessionPages = ["Booking Sesi", "Detail Sesi"];

  return (
    <div className="app-shell">
      <Sidebar
        active={
          sessionPages.includes(active)
            ? "Sesi"
            : active === "Profil mentor"
              ? profileOrigin
              : active
        }
        setActive={setActive}
      />

      <main className="main-area">
        <div className="topbar-row">
          <SearchBar />
          <Header
            onProfileClick={() => setActive("Akun")}
            onShopClick={() => setActive("Shop")}
          />
        </div>

        <div className="page-view" key={active}>
          {active === "Beranda" ? (
            <Dashboard
              setActive={setActive}
              onTutorProfile={openTutor}
              onDetailSession={() => setActive("Detail Sesi")}
              onProfile={() => setActive("Profil mentor")}
            />
          ) : active === "Cari tutor" || active === "Cari mentor" ? (
            <CariTutor
              onProfile={openTutor}
              onBooking={() => setActive("Booking Sesi")}
            />
          ) : active === "Profil mentor" ? (
            <ProfilMentor
              tutor={selectedTutor}
              setActive={setActive}
              backPage={profileOrigin}
              onBack={() => setActive(profileOrigin)}
            />
          ) : active === "Mentor Favorit" ? (
            <Favorit
              onTutorProfile={openTutor}
              setActive={setActive}
            />
          ) : active === "Akun" ? (
            <Profil setActive={setActive} />
          ) : active === "Sesi" ? (
            <Sesi setActive={setActive} />
          ) : active === "Riwayat Kredit" ? (
            <RiwayatKredit setActive={setActive} />
          ) : active === "Shop" ? (
            <Shop setActive={setActive} />
          ) : active === "Booking Sesi" ? (
            <BookingSesi
              bookingNote={bookingNote}
              onBack={() => setActive("Cari tutor")}
              onBookingNoteChange={setBookingNote}
              onSessionDetail={() => setActive("Detail Sesi")}
              onHome={() => setActive("Beranda")}
              onTeach={() => setActive("Jadi mentor")}
            />
          ) : active === "Detail Sesi" ? (
            <DetailSesi
              bookingNote={bookingNote}
              onBack={() => setActive("Sesi")}
              onTeach={() => setActive("Jadi mentor")}
            />
          ) : (
            <AlternatePage active={active} setActive={setActive} />
          )}
        </div>
      </main>
    </div>
  );
}
