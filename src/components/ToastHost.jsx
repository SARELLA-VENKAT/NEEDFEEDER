import { useEffect } from "react";

export default function ToastHost({ toasts, onRemove }) {
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration || 3000)
    );
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [toasts, onRemove]);

  return (
    <div className="toast-host" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <p className="text-sm font-semibold">{toast.title}</p>
          {toast.message ? <p className="text-xs text-ink/70">{toast.message}</p> : null}
        </div>
      ))}
    </div>
  );
}
