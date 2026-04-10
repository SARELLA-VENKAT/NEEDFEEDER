import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nickname: "", email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(form);
    navigate("/dashboard");
  };

  return (
    <section className="page-shell">
      <div className="panel float-card mx-auto max-w-xl p-8">
        <h1 className="font-display text-3xl">Welcome back</h1>
        <p className="mt-2 text-sm text-ink/70">Sign in to continue your donation flow.</p>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm">
            Nickname
            <input
              type="text"
              required
              value={form.nickname}
              onChange={(event) => setForm({ ...form, nickname: event.target.value })}
              className="field mt-2"
            />
          </label>
          <label className="block text-sm">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="field mt-2"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="field mt-2"
            />
          </label>
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
