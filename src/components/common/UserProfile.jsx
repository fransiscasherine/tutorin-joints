import AppIcon from "./AppIcon";

export default function UserProfile({ onClick }) {
  return (
    <button className="user-chip" onClick={onClick} aria-label="Buka profil saya">
      <span className="user-avatar">
        <AppIcon name="solar:user-bold" size={24} />
      </span>
      <strong>User</strong>
    </button>
  );
}
