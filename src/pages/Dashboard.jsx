import { Link } from "react-router-dom";

export default function Dashboard({ user, totals, displayName }) {
  return (
    <section className="page-shell">
      <div className="panel float-card p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[rgb(var(--accent))]">
          Dashboard
        </p>
        <h1 className="mt-3 font-display text-3xl">Welcome back, {displayName}</h1>
        <p className="mt-2 text-sm text-ink/70">
          Your donation control center is synced across all active pledges.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/donate" className="btn-primary">
            Donate Now
          </Link>
          <Link to="/tracking" className="btn-ghost">
            Track Donations
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="panel float-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Total Donations</p>
          <p className="mt-3 font-display text-3xl">{totals.totalCount}</p>
          <p className="text-sm text-ink/60">Across all categories</p>
        </div>
        <div className="panel float-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Active Donations</p>
          <p className="mt-3 font-display text-3xl">{totals.activeCount}</p>
          <p className="text-sm text-ink/60">Pending or accepted</p>
        </div>
        <div className="panel float-card p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Completed</p>
          <p className="mt-3 font-display text-3xl">{totals.completedCount}</p>
          <p className="text-sm text-ink/60">Delivered with impact</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="panel float-card p-6">
          <h2 className="font-display text-2xl">Quick actions</h2>
          <p className="mt-2 text-sm text-ink/70">
            Open NGO discovery, review transactions, or update pledge routing.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/ngos" className="btn-ghost">
              Browse NGOs
            </Link>
            <Link to="/transactions" className="btn-ghost">
              View Transactions
            </Link>
          </div>
        </div>
        <div className="panel float-card p-6">
          <h2 className="font-display text-2xl">Member snapshot</h2>
          <p className="mt-2 text-sm text-ink/70">Email: {user.email}</p>
          <p className="mt-2 text-sm text-ink/70">Location: {user.location}</p>
          <p className="mt-2 text-sm text-ink/70">Member since: {user.memberSince}</p>
          <Link to="/profile" className="btn-primary mt-5 w-full">
            Open Profile
          </Link>
        </div>
      </div>
    </section>
  );
}
