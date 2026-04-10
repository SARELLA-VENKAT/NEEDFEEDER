export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[rgb(var(--accent))]">{subtitle}</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{title}</h1>
      </div>
    </div>
  );
}
