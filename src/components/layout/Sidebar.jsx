import AppIcon from "../common/AppIcon";
import NavbarItem from "./NavbarItem";

const menu = [
  { label: "Beranda", icon: "fa7-solid:home" },
  { label: "Cari tutor", icon: "fa7-solid:search" },
  { label: "Sesi", icon: "fa7-solid:calendar" },
  { label: "Akun", icon: "fa7-solid:user" },
];

export default function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand-avatar">
          <AppIcon name="fa7-solid:user" size={27} />
        </div>

        <a className="brand" href="#" onClick={() => setActive("Beranda")}>
          Tutor<span>.in</span>
        </a>

        <button
          className="collapse-btn"
          aria-label="Tutup sidebar"
          onClick={() => document.body.classList.toggle("sidebar-collapsed")}
        >
          <AppIcon name="solar:alt-arrow-left-bold" size={22} />
        </button>
      </div>

      <nav className="side-nav">
        {menu.map((item) => (
          <NavbarItem
            key={item.label}
            item={item}
            active={active}
            onSelect={setActive}
          />
        ))}
      </nav>

      <div className="teach-card">
        <div className="mascot-scene">
          <div className="mascot-orbit" />
          <AppIcon name="noto:bear" size={95} className="mascot-bear" />
          <AppIcon name="noto:green-book" size={36} className="mascot-book" />
          <AppIcon name="solar:star-bold" size={20} className="mascot-star star-one" />
          <AppIcon name="solar:star-bold" size={15} className="mascot-star star-two" />
        </div>

        <h3>Bersama, kita saling tumbuh!</h3>
        <p>Ajarkan apa yang kamu kuasai, pelajari apa yang kamu butuhkan.</p>

        <button className="mini-cta" onClick={() => setActive("Jadi tutor")}>
          Mulai Mengajar
          <AppIcon name="solar:alt-arrow-right-linear" size={17} />
        </button>
      </div>
    </aside>
  );
}
