import { useState } from "react";
import Modal from "../components/Modal.jsx";

export default function Donate({ onDonate, onNotify }) {
  const [form, setForm] = useState({
    type: "Food",
    amount: "",
    location: ""
  });
  const [success, setSuccess] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(form);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!pending) {
      return;
    }
    onDonate(pending);
    setSuccess(true);
    setConfirmOpen(false);
    setPending(null);
    setForm({ type: "Food", amount: "", location: "" });
    if (onNotify) {
      onNotify("Donation confirmed", "Your donation is now in the tracking queue.");
    }
  };

  return (
    <section className="page-shell">
      <div className="panel float-card mx-auto max-w-4xl p-8">
        <h1 className="font-display text-3xl">Make a donation</h1>
        <p className="mt-2 text-sm text-ink/70">
          Capture pledge details and instantly launch tracking.
        </p>
        {success ? (
          <div className="mt-6 rounded-2xl border border-[rgb(var(--accent-2))] bg-[rgb(var(--accent-2)/0.12)] px-4 py-3 text-sm text-ink">
            Donation submitted successfully. Tracking is now active.
          </div>
        ) : null}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm">
            Donation type
            <select
              value={form.type}
              onChange={(event) => setForm({ ...form, type: event.target.value })}
              className="field mt-2"
            >
              <option value="Food">Food</option>
              <option value="Clothes">Clothes</option>
              <option value="Money">Money</option>
            </select>
          </label>
          <label className="block text-sm">
            Amount or quantity
            <input
              type="text"
              required
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: event.target.value })}
              placeholder="e.g. 20 meal kits"
              className="field mt-2"
            />
          </label>
          <label className="block text-sm">
            Location
            <input
              type="text"
              required
              value={form.location}
              onChange={(event) => setForm({ ...form, location: event.target.value })}
              placeholder="City, Country"
              className="field mt-2"
            />
          </label>
          <button type="submit" className="btn-primary w-full">
            Submit Donation
          </button>
        </form>
      </div>
      <Modal
        open={confirmOpen}
        title="Confirm donation"
        onClose={() => setConfirmOpen(false)}
        actions={
          <>
            <button type="button" className="btn-ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-primary" onClick={handleConfirm}>
              Confirm
            </button>
          </>
        }
      >
        {pending ? (
          <div className="space-y-2">
            <p>Type: {pending.type}</p>
            <p>Amount: {pending.amount}</p>
            <p>Location: {pending.location}</p>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
