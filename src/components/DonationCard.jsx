export default function DonationCard({ donation, onAdvance }) {
  const steps = ["Pending", "Accepted", "Completed"];
  const currentIndex = steps.indexOf(donation.status);
  const nextIndex = Math.min(currentIndex + 1, steps.length - 1);
  const canAdvance = donation.status !== "Completed";

  const handleAdvance = () => {
    if (canAdvance) {
      onAdvance(donation.id);
    }
  };

  return (
    <div className="panel float-card flex flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl">{donation.type} Donation</h3>
          <p className="text-sm text-ink/70">{donation.location}</p>
        </div>
        <span className="chip">{donation.status}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-ink/70">
        <span>Amount: {donation.amount}</span>
        <span>{donation.date}</span>
      </div>
      <div className="timeline">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div className="timeline-step">
              <button
                type="button"
                className={`timeline-dot ${index <= currentIndex ? "active" : ""}`}
                onClick={index === nextIndex ? handleAdvance : undefined}
                aria-label={`Move to ${step}`}
              />
              <span>{step}</span>
            </div>
            {index < steps.length - 1 ? <span className="timeline-connector" /> : null}
          </div>
        ))}
      </div>
      <p className="text-xs text-ink/60">
        {canAdvance ? "Click the next stage to advance." : "Donation completed."}
      </p>
    </div>
  );
}
