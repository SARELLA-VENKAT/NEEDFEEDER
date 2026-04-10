export default function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--line))] bg-[rgb(var(--panel)/0.7)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center text-xs uppercase tracking-[0.22em] text-ink/60 md:flex-row md:text-left">
        <span>Need Feeder</span>
        <span>Connecting donors to charitable causes</span>
        <span>Modern UI demo build</span>
      </div>
    </footer>
  );
}
