import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) => (isActive ? "nav-pill active" : "nav-pill");

export default function SideDrawer({
  open,
  onClose,
  theme,
  onThemeToggle,
  isAuthed,
  onLogout,
  displayName
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      {open ? <div className="drawer-overlay" onClick={onClose} /> : null}
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg tracking-[0.16em]">Need Feeder</span>
          <button type="button" className="btn-ghost focus-ring" onClick={onClose}>
            Close
          </button>
        </div>
        {isAuthed ? <div className="signed-badge mt-6">Signed in: {displayName}</div> : null}
        <div className="mt-8 flex flex-col gap-4">
          <NavLink to="/" className={linkClass} onClick={onClose}>
            Home
          </NavLink>
          <NavLink to="/ngos" className={linkClass} onClick={onClose}>
            NGOs
          </NavLink>
          <NavLink to="/donate" className={linkClass} onClick={onClose}>
            Donate
          </NavLink>
          <NavLink to="/tracking" className={linkClass} onClick={onClose}>
            Tracking
          </NavLink>
          <NavLink to="/transactions" className={linkClass} onClick={onClose}>
            Transactions
          </NavLink>
          <NavLink to="/profile" className={linkClass} onClick={onClose}>
            Profile
          </NavLink>
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.22em] text-ink/60">Theme</span>
            <button
              type="button"
              className="theme-toggle-future focus-ring"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
              role="switch"
              aria-checked={theme === "dark"}
              data-checked={theme === "dark"}
            >
              <span className="theme-toggle-knob" />
            </button>
          </div>
          {isAuthed ? (
            <button type="button" className="btn-primary w-full focus-ring" onClick={onLogout}>
              Log out
            </button>
          ) : null}
        </div>
      </aside>
    </>
  );
}
