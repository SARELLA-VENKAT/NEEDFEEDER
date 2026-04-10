import { transactions } from "../data/transactions.js";

export default function Transactions({ onNotify }) {
  const handleExport = () => {
    const header = "NGO,Type,Amount,Status,Date";
    const rows = transactions.map(
      (item) => `${item.ngo},${item.type},${item.amount},${item.status},${item.date}`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "need-feeder-transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
    if (onNotify) {
      onNotify("Export ready", "Transactions CSV downloaded.");
    }
  };

  return (
    <section className="page-shell">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[rgb(var(--accent))]">Transactions</p>
          <h1 className="mt-2 font-display text-3xl">Donation transactions</h1>
          <p className="mt-2 text-sm text-ink/70">Review receipts and confirmation details.</p>
        </div>
        <button type="button" className="btn-ghost" onClick={handleExport}>
          Export CSV
        </button>
      </div>

      <div className="mt-10 grid gap-6">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="panel float-card grid gap-4 p-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-ink/60">NGO</p>
              <p className="mt-2 font-display text-lg">{item.ngo}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Type</p>
              <p className="mt-2 text-sm text-ink/70">{item.type}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Amount</p>
              <p className="mt-2 text-sm text-ink/70">{item.amount}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Status</p>
              <p className="mt-2 text-sm text-[rgb(var(--accent))]">{item.status}</p>
              <p className="mt-1 text-xs text-ink/60">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
