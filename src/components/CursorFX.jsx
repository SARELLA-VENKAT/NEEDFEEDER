import { useEffect, useState } from "react";

export default function CursorFX() {
  const [dot, setDot] = useState({ x: 0, y: 0, visible: false });
  const [glow, setGlow] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return undefined;
    }

    let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let dotPos = { ...target };
    let glowPos = { ...target };
    let rafId;

    const handleMove = (event) => {
      target = { x: event.clientX, y: event.clientY };
      setDot((prev) => ({ ...prev, visible: true }));
      setGlow((prev) => ({ ...prev, visible: true }));
    };

    const animate = () => {
      dotPos = {
        x: dotPos.x + (target.x - dotPos.x) * 0.18,
        y: dotPos.y + (target.y - dotPos.y) * 0.18
      };
      glowPos = {
        x: glowPos.x + (target.x - glowPos.x) * 0.08,
        y: glowPos.y + (target.y - glowPos.y) * 0.08
      };
      setDot((prev) => ({ ...prev, x: dotPos.x, y: dotPos.y }));
      setGlow((prev) => ({ ...prev, x: glowPos.x, y: glowPos.y }));
      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[60] h-4 w-4 rounded-full border border-bronze/70 bg-bronze/20 shadow-soft transition-opacity duration-300 ${
          dot.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `translate(${dot.x - 8}px, ${dot.y - 8}px)` }}
      />
      <div
        className={`pointer-events-none fixed left-0 top-0 z-50 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(139,106,62,0.18)_0%,rgba(139,106,62,0.08)_35%,transparent_65%)] blur-2xl transition-opacity duration-500 ${
          glow.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `translate(${glow.x - 128}px, ${glow.y - 128}px)` }}
      />
    </>
  );
}
