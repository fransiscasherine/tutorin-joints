import { useState } from "react";
import AppIcon from "../common/AppIcon";
import UserProfile from "../common/UserProfile";

export default function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="header-actions">
        <button
          className="icon-button"
          aria-label="Marketplace"
          onClick={() => alert("Marketplace tutor")}
        >
          <AppIcon name="solar:shop-2-bold" size={23} />
        </button>

        <div className="notification-wrap">
          <button
            className="icon-button"
            aria-label="Notifikasi"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <AppIcon name="solar:bell-linear" size={23} />
          </button>

          {notificationsOpen && (
            <div className="notification-popover">
              <strong>Notifikasi</strong>
              <p>Belum ada notifikasi baru.</p>
            </div>
          )}
        </div>

        <UserProfile />
      </div>
    </header>
  );
}
