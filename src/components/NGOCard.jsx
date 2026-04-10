export default function NGOCard({ ngo, onSelect }) {
  return (
    <div className="panel float-card flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-brand text-xl">{ngo.name}</h3>
        <span className="chip">{ngo.category}</span>
      </div>
      <p className="text-sm text-ink/70">{ngo.location}</p>
      <p className="text-sm text-ink/60">{ngo.description}</p>
      <div className="mt-auto flex flex-col gap-2">
        <button type="button" className="btn-ghost w-full" onClick={() => onSelect(ngo)}>
          View profile
        </button>
        <button type="button" className="btn-primary w-full">
          Donate to this NGO
        </button>
      </div>
    </div>
  );
}
