import { Link } from "react-router-dom";
import FloatingDeck from "../components/FloatingDeck.jsx";

export default function Landing() {
  return (
    <section className="page-shell">
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="panel float-card p-8">
          <span className="chip">Need Feeder</span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl">
            Modern giving, coordinated in one place.
          </h1>
          <p className="mt-4 text-base text-ink/70">
            Explore NGOs, track every pledge, and orchestrate multi-city donations with a sleek,
            real-time experience built for presentations.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/login" className="btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Register
            </Link>
            <Link to="/donate" className="btn-ghost">
              Donate Now
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="panel p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Transparency</p>
              <p className="mt-2 text-sm text-ink/70">See the full impact chain.</p>
            </div>
            <div className="panel p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Tracking</p>
              <p className="mt-2 text-sm text-ink/70">Live status updates from NGOs.</p>
            </div>
            <div className="panel p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-ink/60">Multi-donation</p>
              <p className="mt-2 text-sm text-ink/70">One dashboard, many causes.</p>
            </div>
          </div>
        </div>
        <FloatingDeck />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="panel float-card p-6">
          <h2 className="font-display text-2xl">Donor control center</h2>
          <p className="mt-3 text-sm text-ink/70">
            Switch between donors, view transaction logs, and monitor each pledge with smooth
            animations and floating UI panels.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">Smart routing</span>
            <span className="chip">Fast approvals</span>
            <span className="chip">Secure logs</span>
          </div>
        </div>
        <div className="panel float-card p-6">
          <h2 className="font-display text-2xl">Presentation ready</h2>
          <p className="mt-3 text-sm text-ink/70">
            Crafted for demos with a light lavender palette, 3D motion layers, and interactive
            navigation that feels premium.
          </p>
          <Link to="/ngos" className="btn-primary mt-6 w-full">
            Explore NGOs
          </Link>
        </div>
      </div>
    </section>
  );
}
