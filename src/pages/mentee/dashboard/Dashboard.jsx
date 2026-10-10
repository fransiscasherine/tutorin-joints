import AppIcon from "../../../components/common/AppIcon";
import MentorCard from "../../../components/common/MentorCard";
import { dateKey, formatDate, useTutorData } from "../../../state/tutorStore";
import { EmptyState } from "../../../components/common/ActivityUI";
import { tutors } from "../../../state/tutors";
import { isUpcomingSession } from "../sesi/sessionUtils";

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
          <button className="button-yellow" onClick={() => setActive("Cari mentor")}>
            <AppIcon name="fa7-solid:search" size={24} />
            Cari mentor sekarang
          </button>

          <button className="button-white" onClick={() => setActive("Jadi mentor")}>
            <AppIcon name="fluent:hat-graduation-12-regular" size={23} />
            Jadi mentor
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
  const { sessions } = useTutorData();
  const session = sessions.filter(isUpcomingSession)
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))[0];
  return (
    <section className="sessions-section">
      <SectionHeading
        icon="fa7-solid:calendar"
        title="Sesi berikutnya"
        action="Lihat Semua"
        onAction={() => setActive("Sesi")}
      />

      {session ? <article className="session-card">
        <div className="session-avatar">
          <AppIcon name="fa7-solid:user" size={55} />
        </div>

        <div className="session-info">
          <h3>{session.subject}</h3>
          <p>{session.role === "mentor" ? `Mengajar ${session.learner}` : `Belajar dengan mentor ${session.tutor}`}</p>

          <div className="session-meta">
            <span className="meta-pill">
              <AppIcon name="fa7-solid:calendar" size={13} />
              {formatDate(session.date, { weekday: "long" })}
            </span>

            <span className="meta-pill">
              <AppIcon name="solar:clock-circle-bold" size={13} />
              {session.time} WIB / {session.duration} menit
            </span>
          </div>
        </div>

        <button
          className="outline-button session-detail"
          onClick={() => setActive("Sesi")}
        >
          Detail Sesi
          <AppIcon name="solar:alt-arrow-right-linear" size={20} />
        </button>
      </article> : <EmptyState title="Belum ada sesi mendatang" description="Temukan mentor untuk mulai belajar." />}
    </section>
  );
}

function TutorRecommendations({ onTutorProfile }) {

  return (
    <section className="recommendations-section">
      <SectionHeading icon="fluent:hat-graduation-12-regular" title="Rekomendasi Mentor" />

      <div className="tutor-grid">
        {tutors.map((tutor) => (
          <MentorCard key={tutor.name} tutor={tutor} onProfile={() => onTutorProfile(tutor)} />
        ))}
      </div>

    </section>
  );
}

export function CreditCard({ onHistory }) {
  const { balance } = useTutorData();
  const target = (Math.floor(balance / 50) + 1) * 50;
  return (
    <section className="panel credit-panel">
      <h3>Saldo Kredit</h3>

      <div className="credit-balance">
        <strong>{balance}</strong>
        <span>kredit</span>
      </div>

      <strong className="progress-label">{balance}/{target} kredit ke level berikutnya</strong>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${balance / target * 100}%` }} />
      </div>

      <p className="helper-text">{target - balance} kredit lagi ke level berikutnya</p>

      <button className="primary-button full-button" onClick={onHistory}>
        Lihat Riwayat Kredit
        <AppIcon name="solar:alt-arrow-right-linear" size={17} />
      </button>
    </section>
  );
}

export function WeeklyProgress() {
  const { transactions } = useTutorData();
  const monday = new Date();
  monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
  const weeklyData = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, index) => {
    const date = new Date(monday);
    date.setDate(date.getDate() + index);
    return { day, value: transactions.filter((item) => item.date === dateKey(date) && item.amount > 0).reduce((sum, item) => sum + item.amount, 0) };
  });
  const max = Math.max(1, ...weeklyData.map((item) => item.value));
  const earned = weeklyData.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="panel weekly-panel">
      <h3>Progres Mingguan</h3>

      <strong className="progress-label">{earned}/50 kredit masuk</strong>

      <div className="progress-track weekly-progress">
        <div className="progress-fill" style={{ width: `${Math.min(earned / 50, 1) * 100}%` }} />
      </div>

      <p className="helper-text">{earned >= 50 ? "Target mingguan tercapai!" : `${50 - earned} kredit lagi ke target mingguan`}</p>

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

export function TeachBanner({ setActive }) {
  return (
    <section className="teach-banner">
      <div>
        <h2>Dapatkan kredit dengan mengajar!</h2>
        <p>Bagikan ilmu yang kamu kuasai dan dapatkan kredit untuk belajar hal baru.</p>
      </div>

      <button className="button-white teach-banner-button" onClick={() => setActive("Jadi mentor")}>
        <AppIcon name="fluent:hat-graduation-12-regular" size={23} />
        Jadi mentor
      </button>
    </section>
  );
}

export default function Dashboard({ setActive, onTutorProfile }) {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <WelcomeBanner setActive={setActive} />
        <NextSession setActive={setActive} />
        <TutorRecommendations onTutorProfile={onTutorProfile} />
        <TeachBanner setActive={setActive} />
      </div>

      <aside className="dashboard-right">
        <CreditCard onHistory={() => setActive("Riwayat Kredit")} />
        <WeeklyProgress />
      </aside>
    </div>
  );
}
