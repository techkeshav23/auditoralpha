"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion, useTween } from "../hooks";

/**
 * Dust caught in the torch beam. Particles drift over the whole ledger; the
 * canvas wears the same radial mask as the lit layer, so they only show in the light.
 */
export function Motes({ count = 70 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || prefersReducedMotion()) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.5 + Math.random() * 1.4,
      a: 0.25 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * 6,
      vy: -2 - Math.random() * 7,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let last = 0;
    let visible = false;
    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.phase += dt * 0.8;
        m.x += (m.vx + Math.sin(m.phase) * 4) * dt;
        m.y += m.vy * dt;
        if (m.y < -4) m.y = h + 4;
        if (m.x < -4) m.x = w + 4;
        if (m.x > w + 4) m.x = -4;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 214, 160, ${m.a * (0.6 + 0.4 * Math.sin(m.phase * 2))})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className="na-motes" />;
}

/** A soft lamp that follows the mouse across the whole page (desktop only). */
export function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--cx", `${x}px`);
          el.style.setProperty("--cy", `${y}px`);
          el.dataset.on = "";
        });
    };
    const leave = () => delete el.dataset.on;
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} aria-hidden className="na-cursor-light" />;
}

/** Pulls its child a little towards the mouse, like a lamp drawn to a hand. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={className ?? "inline-flex max-sm:w-full"}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
        const box = e.currentTarget.getBoundingClientRect();
        const dx = (e.clientX - (box.left + box.width / 2)) * 0.18;
        const dy = (e.clientY - (box.top + box.height / 2)) * 0.3;
        e.currentTarget.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
      style={{ transition: "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
    >
      {children}
    </span>
  );
}

/** A figure that counts up once `run` turns true. */
export function CountUp({ to, run, duration = 1600 }: { to: number; run: boolean; duration?: number }) {
  const shown = useTween(run ? to : 0, duration);
  return <>{Math.round(shown).toLocaleString("en-GB")}</>;
}
