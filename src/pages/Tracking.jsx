import DonationCard from "../components/DonationCard.jsx";

export default function Tracking({ donations, onAdvance }) {
  return (
    <section className="page-shell">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[rgb(var(--accent))]">Donation tracking</p>
          <h1 className="mt-2 font-display text-3xl">Track donation status</h1>
          <p className="mt-2 text-sm text-ink/70">Monitor progress across all active pledges.</p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {donations.map((donation) => (
          <DonationCard key={donation.id} donation={donation} onAdvance={onAdvance} />
        ))}
      </div>
    </section>
  );
}
