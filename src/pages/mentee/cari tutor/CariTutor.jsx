import { useMemo, useState } from "react";
import AppIcon from "../../../components/common/AppIcon";

const tutors = [
  {
    name: "Angela Wilkins",
    subjects: "Matematika - Fisika",
    subjectList: ["Matematika", "Fisika"],
    rating: 4.9,
    reviews: "124",
    credits: 10,
    badge: "Tutor Pro",
    badgeClass: "pro",
  },
  {
    name: "Rob Banks",
    subjects: "Akuntansi",
    subjectList: ["Akuntansi"],
    rating: 4.9,
    reviews: "124",
    credits: 10,
    badge: "Trusted Tutor",
    badgeClass: "trusted",
  },
  {
    name: "Dion Prasetyo",
    subjects: "Bahasa Inggris - Sejarah",
    subjectList: ["Bahasa Inggris", "Sejarah"],
    rating: 4.8,
    reviews: "98",
    credits: 12,
    badge: "Active Tutor",
    badgeClass: "active",
  },
  {
    name: "Nina Kartika",
    subjects: "Kimia - Biologi",
    subjectList: ["Kimia", "Biologi"],
    rating: 4.7,
    reviews: "110",
    credits: 15,
    badge: "Starter Tutor",
    badgeClass: "starter",
  },
  {
    name: "Rafi Ahmad",
    subjects: "Ekonomi - Akuntansi",
    subjectList: ["Ekonomi", "Akuntansi"],
    rating: 4.6,
    reviews: "87",
    credits: 8,
    badge: "Trusted Tutor",
    badgeClass: "trusted",
  },
];

const subjectOptions = [
  "Matematika",
  "Fisika",
  "Akuntansi",
  "Bahasa Inggris",
  "Sejarah",
  "Kimia",
  "Biologi",
  "Ekonomi",
];

const ratingOptions = [
  { label: "4.9 ke atas", value: "4.9" },
  { label: "4.8 ke atas", value: "4.8" },
  { label: "4.7 ke atas", value: "4.7" },
  { label: "4.6 ke atas", value: "4.6" },
];

const availabilityOptions = ["Hari ini", "Besok", "Minggu ini"];

const weeklyData = [
  { day: "Sen", value: 20 },
  { day: "Sel", value: 25 },
  { day: "Rab", value: 33 },
  { day: "Kam", value: 15 },
  { day: "Jum", value: 30 },
  { day: "Sab", value: 22 },
  { day: "Min", value: 33 },
];

function FilterSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);

  function selectOption(optionValue) {
    onChange(optionValue);
    setOpen(false);
  }

  return (
    <div className={`filter-select ${value ? "active" : ""} ${open ? "open" : ""}`}>
      <button
        className="filter-select-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
      >
        <span>{value || label}</span>
        <AppIcon name="solar:alt-arrow-down-linear" size={20} />
      </button>

      {open && (
        <div className="filter-menu" role="listbox" aria-label={label}>
          <button
            className={`filter-option ${!value ? "selected" : ""}`}
            type="button"
            role="option"
            aria-selected={!value}
            onClick={() => selectOption("")}
          >
            {label}
          </button>

        {options.map((option) => {
          const optionValue = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;

          return (
            <button
              className={`filter-option ${value === optionValue ? "selected" : ""}`}
              key={optionValue}
              type="button"
              role="option"
              aria-selected={value === optionValue}
              onClick={() => selectOption(optionValue)}
            >
              {optionLabel}
            </button>
          );
        })}
        </div>
      )}
    </div>
  );
}

function TutorSearchCard({ tutor, onProfile, onBooking }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleFavoriteClick() {
    setIsFavorite((currentFavorite) => !currentFavorite);
  }

  return (
    <article className="search-tutor-card">
      <button className="search-avatar" type="button" onClick={onProfile} aria-label={tutor.name}>
        <AppIcon name="fa7-solid:user" size={60} />
      </button>

      <div className="search-tutor-info">
        <div className="search-tutor-title">
          <h2>{tutor.name}</h2>
          <span className={`search-badge ${tutor.badgeClass}`}>{tutor.badge}</span>
        </div>

        <p>{tutor.subjects}</p>

        <div className="search-meta">
          <span>
            <AppIcon name="solar:star-bold" size={17} />
            <strong>{tutor.rating.toFixed(1)}</strong> ({tutor.reviews})
          </span>

          <span>
            <AppIcon name="bx:coin-stack" size={17} />
            {tutor.credits} kredit / sesi
          </span>

        </div>
      </div>

      <div className="search-actions">
        <button className="primary-button book-button" type="button" onClick={() => onBooking(tutor)}>
          Booking Sesi
        </button>

        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          type="button"
          aria-label={`${isFavorite ? "Hapus dari favorit" : "Simpan"} ${tutor.name}`}
          aria-pressed={isFavorite}
          onClick={handleFavoriteClick}
        >
          <AppIcon className="favorite-icon favorite-icon-outline" name="solar:heart-linear" size={27} />
          <AppIcon className="favorite-icon favorite-icon-filled" name="solar:heart-bold" size={27} />
        </button>
      </div>
    </article>
  );
}

function CreditSummary() {
  return (
    <section className="panel search-credit-panel">
      <h3>Saldo Kredit</h3>

      <div className="search-credit-balance">
        <strong>20</strong>
        <span>kredit</span>
      </div>

      <strong className="progress-label">20/50 kredit ke level berikutnya</strong>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: "40%" }} />
      </div>

      <p className="helper-text">30 kredit lagi untuk mencapai threshold</p>

      <button className="primary-button full-button" type="button">
        Lihat Riwayat Kredit
        <AppIcon name="solar:alt-arrow-right-linear" size={17} />
      </button>
    </section>
  );
}

function SearchWeeklyProgress() {
  const max = Math.max(...weeklyData.map((item) => item.value));

  return (
    <section className="panel search-weekly-panel">
      <h3>Progres Mingguan</h3>

      <strong className="progress-label">20/50 kredit</strong>

      <div className="progress-track weekly-progress">
        <div className="progress-fill" style={{ width: "40%" }} />
      </div>

      <p className="helper-text">30 kredit lagi untuk mencapai threshold</p>

      <div className="weekly-chart search-weekly-chart">
        <div className="chart-threshold" />

        {weeklyData.map((item) => (
          <div className="chart-column" key={item.day}>
            <div className="bar-area">
              <div
                className={`chart-bar ${item.value >= 30 ? "bar-highlight" : ""}`}
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

export default function CariTutor({ onProfile = () => {}, onBooking = () => {} }) {
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState("");
  const [availability, setAvailability] = useState("");

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchesSubject = !subject || tutor.subjectList.includes(subject);
      const matchesRating = !rating || tutor.rating >= Number(rating);
      const matchesAvailability = !availability || tutor.availability === availability;

      return matchesSubject && matchesRating && matchesAvailability;
    });
  }, [availability, rating, subject]);

  const hasActiveFilter = Boolean(subject || rating || availability);

  function clearFilters() {
    setSubject("");
    setRating("");
    setAvailability("");
  }

  return (
    <div className="cari-tutor-layout">
      <div className="cari-tutor-main">
        <div className="filter-row" aria-label="Filter tutor">
          <strong>Filter by</strong>
          <FilterSelect
            label="Mata pelajaran"
            value={subject}
            onChange={setSubject}
            options={subjectOptions}
          />
          <FilterSelect label="Rating" value={rating} onChange={setRating} options={ratingOptions} />


          {hasActiveFilter && (
            <button className="clear-filter-button" type="button" onClick={clearFilters}>
              Reset
            </button>
          )}
        </div>

        <div className="search-tutor-list">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <TutorSearchCard key={tutor.name} tutor={tutor} onProfile={onProfile} onBooking={onBooking} />
            ))
          ) : (
            <div className="empty-state search-empty-state">
              <AppIcon name="solar:magnifer-linear" size={38} />
              <h3>Tutor tidak ditemukan</h3>
              <p>Coba ubah filter mata pelajaran atau rating.</p>
              <button className="primary-button" type="button" onClick={clearFilters}>
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>

      <aside className="cari-tutor-side">
        <CreditSummary />
        <SearchWeeklyProgress />
      </aside>
    </div>
  );
}
