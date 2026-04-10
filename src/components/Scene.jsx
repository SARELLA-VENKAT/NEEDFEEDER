import { useEffect, useRef } from "react";

export default function Scene() {
  const orbOne = useRef(null);
  const orbTwo = useRef(null);
  const slabOne = useRef(null);
  const slabTwo = useRef(null);

  useEffect(() => {
    let rafId;

    const update = () => {
      const y = window.scrollY || 0;
      if (orbOne.current) {
        orbOne.current.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
      }
      if (orbTwo.current) {
        orbTwo.current.style.transform = `translate3d(0, ${y * -0.05}px, 0)`;
      }
      if (slabOne.current) {
        slabOne.current.style.transform = `perspective(1200px) rotateX(12deg) rotateY(-10deg) translate3d(0, ${y * 0.08}px, 0)`;
      }
      if (slabTwo.current) {
        slabTwo.current.style.transform = `perspective(1200px) rotateX(-8deg) rotateY(12deg) translate3d(0, ${y * -0.07}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-orb orb-1" ref={orbOne} />
      <div className="scene-orb orb-2" ref={orbTwo} />
      <div className="scene-slab slab-1" ref={slabOne} />
      <div className="scene-slab slab-2" ref={slabTwo} />
    </div>
  );
}
