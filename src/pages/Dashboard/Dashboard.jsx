import { useState } from "react";
import AppIcon from "../../component/Common/AppIcon";

const tutors = [
  {
    name: "Angela Wilkins",
    subjects: "Matematika · Fisika",
    rating: "4.9",
    reviews: "124",
    role: "Tutor Pro",
    roleClass: "pro",
    credits: 10,
    avatar: "ph:user-circle-fill",
  },
  {
    name: "Budi Santoso",
    subjects: "Biologi · Kimia",
    rating: "4.7",
    reviews: "98",
    role: "Mentor Tutor",
    roleClass: "mentor",
    credits: 10,
    avatar: "ph:user-circle-fill",
  },
  {
    name: "Citra Mandira",
    subjects: "Sejarah · Geografi",
    rating: "4.8",
    reviews: "110",
    role: "Active Tutor",
    roleClass: "active",
    credits: 10,
    avatar: "ph:user-circle-fill",
  },
  {
    name: "Dian Prasetya",
    subjects: "Ekonomi · Akuntansi",
    rating: "4.6",
    reviews: "85",
    role: "Starter Tutor",
    roleClass: "starter",
    credits: 10,
    avatar: "ph:user-circle-fill",
  },
];

const weeklyData = [
  { day: "Sen", value: 15 },
  { day: "Sel", value: 22 },
  { day: "Rab", value: 30 },
  { day: "Kam", value: 9 },
  { day: "Jum", value: 27 },
  { day: "Sab", value: 19 },
  { day: "Min", value: 30 },
];

function WelcomeBanner({ setActive }) {
  return (
    <section className="welcome-banner">
      <div className="welcome-content">
        <h1>
          Halo, <span>User!</span>
        </h1>

        <p>
          Belajar sesuatu yang baru, atau bagikan ilmu yang
          <br className="desktop-break" /> kamu punya?
        </p>

        <div className="welcome-buttons">
          <button className="button-yellow" onClick={() => setActive("Cari tutor")}>
            <AppIcon name="fa7-solid:search" size={24} />
            Cari tutor sekarang
          </button>

          <button className="button-white" onClick={() => setActive("Jadi tutor")}>
            <AppIcon name="fluent:hat-graduation-12-regular" size={23} />
            Jadi tutor
          </button>
        </div>
      </div>

      <div className="banner-decoration" aria-hidden="true">
        <AppIcon name="solar:star-bold" size={30} />
        <AppIcon name="solar:book-bookmark-bold" size={72} />
      </div>
    </section>
  );
}

function SectionHeading({ icon, title, action, onAction }) {
  return (
    <div className="section-heading">
      <div className="section-title">
        <AppIcon name={icon} size={38} />
        <h2>{title}</h2>
      </div>

      {action && (
        <button className="text-link" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  );
}

function NextSession({ setActive }) {
  return (
    <section className="sessions-section">
      <SectionHeading
        icon="fa7-solid:calendar"
        title="Sesi berikutnya"
        action="Lihat Semua"
        onAction={() => setActive("Sesi")}
      />

      <article className="session-card">
        <div className="session-avatar">
          <AppIcon name="fa7-solid:user" size={55} />
        </div>

        <div className="session-info">
          <h3>Algoritma dan Pemrograman</h3>
          <p>dengan Bill Smith</p>

          <div className="session-meta">
            <span className="meta-pill">
              <AppIcon name="fa7-solid:calendar" size={13} />
              Rabu, 12 Mei 2026
            </span>

            <span className="meta-pill">
              <AppIcon name="solar:clock-circle-bold" size={13} />
              10:00 - 12:00
            </span>
          </div>
        </div>

        <button
          className="outline-button session-detail"
          onClick={() => alert("Detail sesi Algoritma dan Pemrograman")}
        >
          Detail Sesi
          <AppIcon name="solar:alt-arrow-right-linear" size={20} />
        </button>
      </article>
    </section>
  );
}

function TutorCard({ tutor, onProfile }) {
  return (
    <article className="tutor-card">
      <div className="tutor-avatar">
        <AppIcon name={tutor.avatar} size={98} />
      </div>

      <h3>{tutor.name}</h3>
      <p className="tutor-subjects">{tutor.subjects}</p>

      <div className="rating-line">
        <AppIcon name="solar:star-bold" size={17} className="rating-star" />
        <strong>{tutor.rating}</strong>
        <span>({tutor.reviews})</span>
        <span className={`tutor-badge ${tutor.roleClass}`}>{tutor.role}</span>
      </div>

      <div className="credit-line">
        <AppIcon name="bx:coin-stack" size={15} />
        <span>{tutor.credits} kredit / sesi</span>
      </div>

      <button className="outline-button profile-button" onClick={onProfile}>
        Lihat Profil
        <AppIcon name="solar:alt-arrow-right-linear" size={19} />
      </button>
    </article>
  );
}

function TutorRecommendations() {
  const [selectedTutor, setSelectedTutor] = useState(null);

  return (
    <section className="recommendations-section">
      <SectionHeading icon="fluent:hat-graduation-12-regular" title="Rekomendasi Tutor" />

      <div className="tutor-grid">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.name} tutor={tutor} onProfile={() => setSelectedTutor(tutor)} />
        ))}
      </div>

      {selectedTutor && (
        <div className="modal-backdrop" onClick={() => setSelectedTutor(null)}>
          <div
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedTutor(null)}
              aria-label="Tutup"
            >
              <AppIcon name="solar:close-circle-linear" size={25} />
            </button>

            <div className="tutor-avatar modal-avatar">
              <AppIcon name={selectedTutor.avatar} size={90} />
            </div>

            <h2 id="profile-modal-title">{selectedTutor.name}</h2>
            <p>{selectedTutor.subjects}</p>
            <div className="modal-rating">
              <AppIcon name="solar:star-bold" size={19} />
              {selectedTutor.rating} ({selectedTutor.reviews} ulasan)
            </div>

            <p className="modal-description">
              Tutor siap membantu kamu belajar dengan sesi yang terarah sesuai mata pelajaran
              yang dikuasai.
            </p>

            <button
              className="primary-button modal-action"
              onClick={() => alert(`Permintaan sesi dengan ${selectedTutor.name}`)}
            >
              Ajukan Sesi
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function CreditCard() {
  return (
    <section className="panel credit-panel">
      <h3>Saldo Kredit</h3>

      <div className="credit-balance">
        <strong>20</strong>
        <span>kredit</span>
      </div>

      <strong className="progress-label">20/50 kredit ke level berikutnya</strong>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: "40%" }} />
      </div>

      <p className="helper-text">30 kredit lagi untuk mencapai threshold</p>

      <button className="primary-button full-button" onClick={() => alert("Riwayat kredit")}>
        Lihat Riwayat Kredit
        <AppIcon name="solar:alt-arrow-right-linear" size={17} />
      </button>
    </section>
  );
}

function WeeklyProgress() {
  const max = Math.max(...weeklyData.map((item) => item.value));

  return (
    <section className="panel weekly-panel">
      <h3>Progres Mingguan</h3>

      <strong className="progress-label">20/50 kredit</strong>

      <div className="progress-track weekly-progress">
        <div className="progress-fill" style={{ width: "40%" }} />
      </div>

      <p className="helper-text">30 kredit lagi untuk mencapai threshold</p>

      <div className="weekly-chart">
        <div className="chart-threshold" />

        {weeklyData.map((item) => (
          <div className="chart-column" key={item.day}>
            <div className="bar-area">
              <div
                className={`chart-bar ${
                  item.day === "Rab" || item.day === "Jum" || item.day === "Min"
                    ? "bar-highlight"
                    : ""
                }`}
                style={{ height: `${(item.value / max) * 74}px` }}
                title={`${item.value} kredit`}
              />
            </div>
            <span>{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TeachBanner({ setActive }) {
  return (
    <section className="teach-banner">
      <div>
        <h2>Dapatkan kredit dengan mengajar!</h2>
        <p>Bagikan ilmu yang kamu kuasai dan dapatkan kredit untuk belajar hal baru.</p>
      </div>

      <button className="button-white teach-banner-button" onClick={() => setActive("Jadi tutor")}>
        <AppIcon name="fluent:hat-graduation-12-regular" size={23} />
        Jadi tutor
      </button>
    </section>
  );
}

export default function Dashboard({ setActive }) {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <WelcomeBanner setActive={setActive} />
        <NextSession setActive={setActive} />
        <TutorRecommendations />
        <TeachBanner setActive={setActive} />
      </div>

      <aside className="dashboard-right">
        <CreditCard />
        <WeeklyProgress />
      </aside>
    </div>
  );
}
