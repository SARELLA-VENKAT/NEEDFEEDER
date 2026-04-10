export default function FloatingDeck() {
  return (
    <div className="grid gap-4">
      <div className="panel float-card p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--accent))]">
          Live Signals
        </p>
        <p className="mt-2 font-display text-2xl">312 active pledges</p>
        <p className="mt-2 text-sm text-ink/70">Momentum across 14 cities and 46 partners.</p>
      </div>
      <div className="panel float-card p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--accent))]">
          Impact Score
        </p>
        <p className="mt-2 font-display text-2xl">98.2</p>
        <p className="mt-2 text-sm text-ink/70">Based on delivery time and completion rate.</p>
      </div>
      <div className="panel float-card p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--accent))]">Fast Actions</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="chip">Donate</span>
          <span className="chip">Track</span>
          <span className="chip">Share</span>
        </div>
      </div>
    </div>
  );
}
