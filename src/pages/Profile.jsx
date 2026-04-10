import { Link } from "react-router-dom";

export default function Profile({ user, donations, isAuthed, onLogout, displayName }) {
  return (
    <section className="page-shell">
      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="panel float-card p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[rgb(var(--accent))]">Profile</p>
          {isAuthed ? (
            <>
              <h1 className="mt-2 font-display text-3xl">{displayName}</h1>
              <p className="mt-4 text-sm text-ink/70">Email: {user.email}</p>
              <p className="mt-2 text-sm text-ink/70">Location: {user.location}</p>
              <p className="mt-2 text-sm text-ink/70">Member since: {user.memberSince}</p>
              <button type="button" className="btn-ghost mt-6 w-full" onClick={onLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <h1 className="mt-2 font-display text-3xl">Welcome</h1>
              <p className="mt-4 text-sm text-ink/70">
                You are logged out. Sign in to view your profile and donation history.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn-ghost">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="panel float-card p-8">
          <h2 className="font-display text-2xl">Donation history</h2>
          {isAuthed ? (
            <div className="mt-4 space-y-4">
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="rounded-xl border border-[rgb(var(--line))] bg-[rgb(var(--panel)/0.8)] p-4"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>{donation.type}</span>
                    <span className="text-ink/60">{donation.date}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink/70">{donation.amount}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
                    {donation.status}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink/70">Sign in to view donation history.</p>
          )}
        </div>
      </div>
    </section>
  );
}
