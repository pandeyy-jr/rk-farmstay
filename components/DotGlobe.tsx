"use client";

import { useEffect, useRef } from "react";

/**
 * Rotating dotted-earth canvas: a fibonacci dot-sphere with glowing orbit
 * "strings" and travelling pulses. Pure 2D canvas, ~700 dots — cheap.
 * Renders one static frame under prefers-reduced-motion and pauses offscreen.
 */
export function DotGlobe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    // Fibonacci sphere points
    const N = 850;
    const pts: Array<[number, number, number]> = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let angle = 0.6;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.5;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // orbit strings (tilted ellipses)
      ctx.lineWidth = 1.1;
      for (const [tilt, color, phase] of [
        [0.5, "184,111,74", 0],
        [-0.35, "105,118,90", 2.1],
        [1.15, "201,162,77", 4.2],
      ] as Array<[number, string, number]>) {
        ctx.strokeStyle = `rgba(${color},0.4)`;
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2 + 0.05; t += 0.06) {
          const ex = Math.cos(t) * R * 1.45;
          const ey = Math.sin(t) * R * 1.45 * Math.sin(tilt) * 0.42;
          const px = cx + ex * Math.cos(phase) - ey * Math.sin(phase) * 0.3;
          const py = cy + ex * Math.sin(phase) * 0.28 + ey;
          if (t === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // travelling pulses along the first orbit
      const t = (performance.now() / 4200) % 1;
      for (const off of [0, 0.5]) {
        const tt = (t + off) % 1;
        const a = tt * Math.PI * 2;
        const px = cx + Math.cos(a) * R * 1.45 * Math.cos(0) - Math.sin(a) * R * 0.61 * 0.3;
        const py = cy + Math.cos(a) * R * 1.45 * 0.28 * 0 + Math.sin(a) * R * 0.61;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 9);
        g.addColorStop(0, "rgba(184,111,74,0.9)");
        g.addColorStop(1, "rgba(184,111,74,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      // dot sphere
      for (const [x, y, z] of pts) {
        const rx = x * cosA + z * sinA;
        const rz = -x * sinA + z * cosA;
        const depth = (rz + 1) / 2; // 0 back, 1 front
        const px = cx + rx * R;
        const py = cy + y * R * 0.92;
        const s = 1 + depth * 2.1;
        ctx.fillStyle =
          depth > 0.72
            ? `rgba(25,59,45,${0.45 + depth * 0.5})`
            : `rgba(105,118,90,${0.2 + depth * 0.4})`;
        ctx.fillRect(px, py, s, s);
      }

      if (!reduced && running) angle += 0.0032;
    };

    draw();
    if (!reduced) {
      const loop = () => {
        draw();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (!reduced) {
          if (running) {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(function loop() {
              draw();
              raf = requestAnimationFrame(loop);
            });
          } else {
            cancelAnimationFrame(raf);
          }
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}
