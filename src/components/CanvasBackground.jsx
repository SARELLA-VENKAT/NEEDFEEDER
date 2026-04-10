import { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let animationId;

    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * 1,
      y: Math.random() * 1,
      r: 0.6 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005
    }));

    const resize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * 1.2);
      canvas.height = Math.floor(height * 1.2);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) {
          p.vx *= -1;
        }
        if (p.y < 0 || p.y > 1) {
          p.vy *= -1;
        }
        const x = p.x * canvas.width;
        const y = p.y * canvas.height;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.r * 60);
        gradient.addColorStop(0, "rgba(167, 144, 255, 0.35)");
        gradient.addColorStop(1, "rgba(167, 144, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 60, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-bg" aria-hidden="true" />;
}
