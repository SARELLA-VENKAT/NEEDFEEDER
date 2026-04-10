import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) => (isActive ? "nav-pill active" : "nav-pill");

export default function TopBar({ onOpenDrawer, theme, onThemeToggle, isAuthed, displayName }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[rgb(var(--line))] bg-[rgb(var(--panel)/0.9)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button type="button" className="btn-ghost focus-ring" onClick={onOpenDrawer}>
            Menu
          </button>
          <span className="font-display text-xl tracking-[0.16em]">Need Feeder</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/ngos" className={linkClass}>
            NGOs
          </NavLink>
          <NavLink to="/donate" className={linkClass}>
            Donate
          </NavLink>
          <NavLink to="/tracking" className={linkClass}>
            Tracking
          </NavLink>
          <NavLink to="/transactions" className={linkClass}>
            Transactions
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            Profile
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {isAuthed ? <span className="signed-badge">Signed in: {displayName}</span> : null}
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
      </div>
    </header>
  );
}
