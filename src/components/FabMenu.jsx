import { Link } from "react-router-dom";

export default function FabMenu({ open, onToggle }) {
  return (
    <div className="fab">
      {open ? (
        <>
          <Link to="/donate" className="fab-item focus-ring">
            Donate
          </Link>
          <Link to="/tracking" className="fab-item focus-ring">
            Track
          </Link>
          <Link to="/ngos" className="fab-item focus-ring">
            NGOs
          </Link>
        </>
      ) : null}
      <button
        type="button"
        className="fab-button focus-ring"
        onClick={onToggle}
        aria-expanded={open}
        aria-label="Quick actions"
      >
        {open ? "x" : "+"}
      </button>
    </div>
  );
}
