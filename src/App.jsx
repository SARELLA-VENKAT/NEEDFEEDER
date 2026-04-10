import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import SideDrawer from "./components/SideDrawer.jsx";
import FabMenu from "./components/FabMenu.jsx";
import Footer from "./components/Footer.jsx";
import PageWrapper from "./components/PageWrapper.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import CssBackground from "./components/CssBackground.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import ToastHost from "./components/ToastHost.jsx";
import Loading from "./components/Loading.jsx";

const Landing = lazy(() => import("./pages/Landing.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Donate = lazy(() => import("./pages/Donate.jsx"));
const NGOListing = lazy(() => import("./pages/NGOListing.jsx"));
const Tracking = lazy(() => import("./pages/Tracking.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Transactions = lazy(() => import("./pages/Transactions.jsx"));
import { initialDonations } from "./data/donations.js";

const statusFlow = ["Pending", "Accepted", "Completed"];

export default function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem("need-feeder-theme");
    if (stored) {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [user, setUser] = useState({
    name: "",
    nickname: "",
    email: "",
    location: "Chennai, India",
    memberSince: "2022"
  });
  const [isAuthed, setIsAuthed] = useState(false);
  const [donations, setDonations] = useState(initialDonations);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const totals = useMemo(() => {
    const totalCount = donations.length;
    const activeCount = donations.filter((item) => item.status !== "Completed").length;
    const completedCount = donations.filter((item) => item.status === "Completed").length;
    return { totalCount, activeCount, completedCount };
  }, [donations]);

  const handleLogin = (data) => {
    setIsAuthed(true);
    setUser((prev) => ({
      ...prev,
      nickname: data.nickname || prev.nickname,
      email: data.email || prev.email
    }));
    addToast("Signed in", `Welcome back, ${data.nickname || "donor"}.`);
  };

  const handleRegister = (data) => {
    setIsAuthed(true);
    setUser((prev) => ({
      ...prev,
      name: data.name || prev.name,
      nickname: data.nickname || prev.nickname,
      email: data.email || prev.email
    }));
    addToast("Account created", `Glad to have you, ${data.nickname || "donor"}.`);
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setUser((prev) => ({
      ...prev,
      name: "",
      nickname: "",
      email: ""
    }));
    setDrawerOpen(false);
    setFabOpen(false);
    addToast("Signed out", "You are now logged out.");
    navigate("/");
  };

  const displayName = user.nickname || user.name || "Guest";

  const addDonation = (data) => {
    const newDonation = {
      id: `${Date.now()}`,
      ...data,
      status: "Pending",
      date: new Date().toLocaleDateString()
    };
    setDonations((prev) => [newDonation, ...prev]);
    addToast("Donation submitted", `${data.type} donation is now tracking.`);
  };

  const advanceStatus = (id) => {
    setDonations((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }
        const currentIndex = statusFlow.indexOf(item.status);
        const nextStatus = statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)];
        if (nextStatus !== item.status) {
          addToast("Status updated", `${item.type} moved to ${nextStatus}.`);
        }
        return { ...item, status: nextStatus };
      })
    );
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
    }
    window.localStorage.setItem("need-feeder-theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const addToast = (title, message, duration) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="app-shell min-h-screen transition-colors duration-500">
      <CssBackground />
      <ScrollToTop />
      <div className="relative z-10">
        <TopBar
          onOpenDrawer={() => setDrawerOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
          isAuthed={isAuthed}
          displayName={displayName}
        />
        <SideDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          theme={theme}
          onThemeToggle={toggleTheme}
          isAuthed={isAuthed}
          onLogout={handleLogout}
          displayName={displayName}
        />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Landing />
                </PageWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <Login onLogin={handleLogin} />
                </PageWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <PageWrapper>
                  <Register onRegister={handleRegister} />
                </PageWrapper>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthGuard isAuthed={isAuthed}>
                  <PageWrapper>
                    <Dashboard user={user} totals={totals} displayName={displayName} />
                  </PageWrapper>
                </AuthGuard>
              }
            />
            <Route
              path="/donate"
              element={
                <PageWrapper>
                  <Donate onDonate={addDonation} onNotify={addToast} />
                </PageWrapper>
              }
            />
            <Route
              path="/ngos"
              element={
                <PageWrapper>
                  <NGOListing onNotify={addToast} />
                </PageWrapper>
              }
            />
            <Route
              path="/tracking"
              element={
                <AuthGuard isAuthed={isAuthed}>
                  <PageWrapper>
                    <Tracking donations={donations} onAdvance={advanceStatus} />
                  </PageWrapper>
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard isAuthed={isAuthed}>
                  <PageWrapper>
                    <Profile
                      user={user}
                      donations={donations}
                      isAuthed={isAuthed}
                      onLogout={handleLogout}
                      displayName={displayName}
                    />
                  </PageWrapper>
                </AuthGuard>
              }
            />
            <Route
              path="/transactions"
              element={
                <PageWrapper>
                  <Transactions onNotify={addToast} />
                </PageWrapper>
              }
            />
          </Routes>
        </Suspense>
        <Footer />
      </div>
      <ToastHost toasts={toasts} onRemove={removeToast} />
      <FabMenu open={fabOpen} onToggle={() => setFabOpen((prev) => !prev)} />
    </div>
  );
}
