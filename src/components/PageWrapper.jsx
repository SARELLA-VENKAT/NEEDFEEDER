import { useEffect, useState } from "react";

export default function PageWrapper({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return <main className={`page ${ready ? "page-in" : ""}`}>{children}</main>;
}
