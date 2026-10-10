import AppIcon from "./AppIcon";

export default function UserProfile() {
  return (
    <button className="user-chip" onClick={() => alert("Profil pengguna")}>
      <span className="user-avatar">
        <AppIcon name="solar:user-bold" size={24} />
      </span>
      <strong>User</strong>
    </button>
  );
}
