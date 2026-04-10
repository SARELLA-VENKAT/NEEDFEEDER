import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `text-xs uppercase tracking-[0.2em] transition-colors ${
    isActive ? "text-bronze" : "text-ink/70 hover:text-bronze"
  }`;

export default function NavBar({ isAuthed, user, theme, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const toggleTheme = () => {
    onThemeToggle(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-antique/70 bg-linen/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="font-display text-2xl tracking-[0.18em]">
          Need Feeder
        </Link>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-antique text-ink/70 transition hover:text-bronze md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="text-xs uppercase tracking-[0.2em]">{open ? "Close" : "Menu"}</span>
        </button>
        <div className="hidden items-center gap-6 md:flex">
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
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="btn-outline" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          {!isAuthed ? (
            <>
              <Link to="/login" className="btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          ) : (
            <span className="hidden text-xs uppercase tracking-[0.2em] text-ink/70 md:inline-flex">
              Signed in as {user.name}
            </span>
          )}
        </div>
        {open ? (
          <div className="w-full rounded-2xl border border-antique/70 bg-fog/90 p-4 md:hidden">
            <div className="flex flex-col gap-4 text-center">
              <button type="button" className="btn-outline" onClick={toggleTheme}>
                {theme === "dark" ? "Light" : "Dark"}
              </button>
              <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/ngos" className={linkClass} onClick={() => setOpen(false)}>
                NGOs
              </NavLink>
              <NavLink to="/donate" className={linkClass} onClick={() => setOpen(false)}>
                Donate
              </NavLink>
              <NavLink to="/tracking" className={linkClass} onClick={() => setOpen(false)}>
                Tracking
              </NavLink>
              <NavLink to="/transactions" className={linkClass} onClick={() => setOpen(false)}>
                Transactions
              </NavLink>
              <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>
                Profile
              </NavLink>
              {!isAuthed ? (
                <div className="flex flex-col gap-3">
                  <Link to="/login" className="btn-outline" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary" onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
