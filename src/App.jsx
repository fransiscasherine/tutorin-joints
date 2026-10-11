
import { useEffect, useState } from "react";
import LandingPage from "./pages/landing/LandingPage";
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
import PreTest from "./pages/mentee/test/PreTest";
import PostTest from "./pages/mentee/test/PostTest";
import { courseFor } from "./pages/mentee/test/testData";
import { booking, tutor as bookingMentor } from "./pages/mentee/sessionData";
import DashboardMentor from "./pages/mentor/dashboard/DashboardMentor";
import { updateProfile, useProfile } from "./state/profile";

import "./pages/mentee/dashboard/Dashboard.css";
import "./pages/mentee/cari tutor/CariTutor.css";
import "./pages/mentee/booking sesi/BookingSesi.css";
import "./pages/mentee/detail sesi/DetailSesi.css";

function AlternatePage({ active, setActive, onActivateMentor }) {
  const [error, setError] = useState("");
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
      {active === "Jadi mentor" && <>
        <button className="primary-button" onClick={() => {
          try { onActivateMentor(); } catch { setError("Peran mentor belum tersimpan. Periksa izin penyimpanan browser."); }
        }}><AppIcon name="fluent:hat-graduation-12-regular" size={20} />Aktifkan peran mentor</button>
        <p role="status">{error}</p>
      </>}
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
  const [entered, setEntered] = useState(() => window.location.hash === "#dashboard");
  useEffect(() => {
    const onHashChange = () => setEntered(window.location.hash === "#dashboard");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const profile = useProfile();
  const [preferredMode, setPreferredMode] = useState(() => {
    try { return localStorage.getItem("tutorin-dashboard-mode") === "mentor" ? "mentor" : "mentee"; }
    catch { return "mentee"; }
  });
  const dashboardMode = profile.mentorActive ? preferredMode : "mentee";
  const [active, updateActive] = useState("Beranda");
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [profileOrigin, setProfileOrigin] = useState("Beranda");
  const [bookingNote, setBookingNote] = useState("");
  const [assessmentSession, setAssessmentSession] = useState(null);
  const [assessmentOrigin, setAssessmentOrigin] = useState("Sesi");

  function setActive(page) {
    if (dashboardMode === "mentor" && ["Shop", "Mentor Favorit"].includes(page)) return;
    if (page === "Jadi mentor" && profile.mentorActive) { switchDashboard("mentor"); return; }
    updateActive(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function switchDashboard(mode) {
    if (mode === "mentor" && !profile.mentorActive) { updateActive("Jadi mentor"); return; }
    setPreferredMode(mode);
    try { localStorage.setItem("tutorin-dashboard-mode", mode); } catch { /* Mode switching still works without saved preferences. */ }
    updateActive("Beranda");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function activateMentor() {
    updateProfile({ ...profile, mentorActive: true });
    setPreferredMode("mentor");
    try { localStorage.setItem("tutorin-dashboard-mode", "mentor"); } catch { /* The role itself was already saved. */ }
    updateActive("Beranda");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function openTutor(tutor) {
    setProfileOrigin(active);
    setSelectedTutor(tutor);
    setActive("Profil mentor");
  }

  function openTest(mode, session) {
    setAssessmentSession(session);
    setAssessmentOrigin(active);
    setActive(mode === "pre" ? "Pre-test" : "Post-test");
  }

  const sessionPages = ["Booking Sesi", "Detail Sesi", "Pre-test", "Post-test"];

  if (!entered) return <LandingPage onChooseRole={(mode) => {
    switchDashboard(mode);
    window.location.hash = "dashboard";
    setEntered(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  }} />;

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
        isMentor={profile.mentorActive}
        dashboardMode={dashboardMode}
        onSwitchMode={switchDashboard}
      />

      <main className="main-area">
        <div className="topbar-row">
          <SearchBar />
          <Header
            onProfileClick={() => setActive("Akun")}
            onShopClick={dashboardMode === "mentee" ? () => setActive("Shop") : undefined}
          />
        </div>

        <div className="page-view" key={`${active}-${dashboardMode}`}>
          {active === "Beranda" && dashboardMode === "mentor" ? (
            <DashboardMentor onSessions={() => setActive("Sesi")} onHistory={() => setActive("Riwayat Kredit")} onSwitchMode={switchDashboard} />
          ) : active === "Beranda" ? (
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
            <Sesi setActive={setActive} onOpenTest={openTest} initialRoleFilter={dashboardMode === "mentor" ? "Mengajar" : "Semua"} />
          ) : active === "Pre-test" && assessmentSession ? (
            <PreTest key={`${assessmentSession.id}-pre`} session={assessmentSession} courseId={courseFor(assessmentSession.subject)}
              onBack={() => setActive(assessmentOrigin)} onPostTest={() => setActive("Post-test")} />
          ) : active === "Post-test" && assessmentSession ? (
            <PostTest key={`${assessmentSession.id}-post`} session={assessmentSession} courseId={courseFor(assessmentSession.subject)}
              onBack={() => setActive(assessmentOrigin)} />
          ) : active === "Riwayat Kredit" ? (
            <RiwayatKredit setActive={setActive} dashboardMode={dashboardMode} />
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
              onOpenTest={(mode) => openTest(mode, { id: booking.code, subject: booking.topic, tutor: bookingMentor.name })}
              onBack={() => setActive("Sesi")}
              onTeach={() => setActive("Jadi mentor")}
            />
          ) : (
            <AlternatePage active={active} setActive={setActive} onActivateMentor={activateMentor} />
          )}
        </div>
      </main>
    </div>
  );
}
