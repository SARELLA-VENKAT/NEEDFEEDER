export default function StatCard({ label, value, note }) {
  return (
    <div className="card card-hover p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-ink/60">{label}</p>
      <p className="mt-4 font-display text-3xl">{value}</p>
      <p className="mt-2 text-sm text-ink/60">{note}</p>
    </div>
  );
}
