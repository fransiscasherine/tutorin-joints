import AppIcon from "../common/AppIcon";
import NavbarItem from "./NavbarItem";
import mascot from "../../assets/mascot.png";

const menu = [
  { label: "Beranda", icon: "fa7-solid:home" },
  { label: "Cari mentor", icon: "fa7-solid:search" },
  { label: "Mentor Favorit", icon: "solar:heart-linear" },
  { label: "Sesi", icon: "fa7-solid:calendar" },
  { label: "Riwayat Kredit", icon: "solar:wallet-linear" },
  { label: "Shop", icon: "solar:shop-2-linear" },
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
        <div className="mascot-scene"><img className="sidebar-mascot" src={mascot} alt="" width="139" height="116" /></div>

        <h3>Bersama, kita saling tumbuh!</h3>
        <p>Ajarkan apa yang kamu kuasai, pelajari apa yang kamu butuhkan.</p>

        <button className="mini-cta" onClick={() => setActive("Jadi mentor")}>
          Mulai Mengajar
          <AppIcon name="solar:alt-arrow-right-linear" size={17} />
        </button>
      </div>
    </aside>
  );
}
