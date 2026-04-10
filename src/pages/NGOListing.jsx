import { useState } from "react";
import NGOCard from "../components/NGOCard.jsx";
import Modal from "../components/Modal.jsx";
import { ngos } from "../data/ngos.js";

export default function NGOListing({ onNotify }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (ngo) => {
    setSelected(ngo);
    if (onNotify) {
      onNotify("NGO profile opened", ngo.name);
    }
  };

  return (
    <section className="page-shell">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[rgb(var(--accent))]">NGO Listings</p>
          <h1 className="mt-2 font-display text-3xl">Curated partner NGOs</h1>
          <p className="mt-2 text-sm text-ink/70">Explore verified partners by category.</p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ngos.map((ngo) => (
          <NGOCard key={ngo.id} ngo={ngo} onSelect={handleSelect} />
        ))}
      </div>
      <Modal
        open={Boolean(selected)}
        title={selected ? selected.name : "NGO Profile"}
        onClose={() => setSelected(null)}
        actions={
          <button type="button" className="btn-primary" onClick={() => setSelected(null)}>
            Done
          </button>
        }
      >
        {selected ? (
          <div className="space-y-3">
            <p className="text-sm text-ink/70">Location: {selected.location}</p>
            <p className="text-sm text-ink/70">Category: {selected.category}</p>
            <p>{selected.mission}</p>
            <p className="text-sm text-ink/70">Focus: {selected.focus}</p>
            <p className="text-sm text-ink/70">Needs: {selected.needs}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-ink/60">{selected.lastUpdate}</p>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
