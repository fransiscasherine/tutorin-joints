import AppIcon from "../common/AppIcon";

export default function NavbarItem({ item, active, onSelect }) {
  return (
    <button
      className={`nav-item ${active === item.label ? "selected" : ""}`}
      onClick={() => onSelect(item.label)}
    >
      <AppIcon name={item.icon} size={23} />
      <span>{item.label}</span>
    </button>
  );
}
