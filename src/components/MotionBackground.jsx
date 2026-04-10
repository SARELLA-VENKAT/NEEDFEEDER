import { useEffect, useRef } from "react";

export default function MotionBackground() {
  const orbA = useRef(null);
  const orbB = useRef(null);
  const orbC = useRef(null);
  const slabA = useRef(null);
  const slabB = useRef(null);

  useEffect(() => {
    let rafId;
    let cursor = { x: 0, y: 0 };

    const onMove = (event) => {
      cursor = { x: event.clientX, y: event.clientY };
    };

    const update = () => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const x = (cursor.x / w - 0.5) * 30;
      const y = (cursor.y / h - 0.5) * 30;
      const scrollY = window.scrollY || 0;

      if (orbA.current) {
        orbA.current.style.transform = `translate3d(${x * 0.6}px, ${y * 0.6 + scrollY * 0.03}px, 0)`;
      }
      if (orbB.current) {
        orbB.current.style.transform = `translate3d(${x * -0.4}px, ${y * -0.4 + scrollY * -0.02}px, 0)`;
      }
      if (orbC.current) {
        orbC.current.style.transform = `translate3d(${x * 0.3}px, ${y * -0.2 + scrollY * 0.04}px, 0)`;
      }
      if (slabA.current) {
        slabA.current.style.transform = `perspective(1200px) rotateX(10deg) rotateY(-12deg) translate3d(${x * 0.5}px, ${scrollY * 0.05}px, 0)`;
      }
      if (slabB.current) {
        slabB.current.style.transform = `perspective(1200px) rotateX(-8deg) rotateY(10deg) translate3d(${x * -0.4}px, ${scrollY * -0.04}px, 0)`;
      }
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="motion-bg" aria-hidden="true">
      <div className="bg-mesh" />
      <div className="bg-orb orb-a" ref={orbA} />
      <div className="bg-orb orb-b" ref={orbB} />
      <div className="bg-orb orb-c" ref={orbC} />
      <div className="bg-slab slab-a" ref={slabA} />
      <div className="bg-slab slab-b" ref={slabB} />
    </div>
  );
}
