"use client";

import { useEffect, useRef, useState } from "react";
import MonitorCarousel from "./monitor-carousel";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [phase, setPhase] = useState<"scene" | "monitor">("scene");

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      setScrollProgress(progress);
      setPhase(progress > 0.6 ? "monitor" : "scene");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interpolated values for zoom effect
  const scale = 1 + scrollProgress * 1.5;
  const translateY = scrollProgress * -6;
  const sceneOpacity = scrollProgress < 0.7 ? 1 : 1 - (scrollProgress - 0.7) / 0.3;
  const overlayOpacity = scrollProgress < 0.5 ? 0 : (scrollProgress - 0.5) / 0.5;

  return (
    /* Sticky scroll container — 300vh gives room to scroll through the zoom */
    <div ref={containerRef} className="relative h-[300vh]" id="hero">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Background studio scene ── */}
        <div
          ref={sceneRef}
          className="absolute inset-0 film-grain"
          style={{
            transform: `scale(${scale}) translateY(${translateY}%)`,
            transformOrigin: "50% 52%",
            transition: "transform 0.05s linear",
            opacity: sceneOpacity,
          }}
        >
          <img
            src="/images/studio-scene.jpg"
            alt="Cozy anime video editing studio with warm golden light"
            className="w-full h-full object-cover object-center"
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 vignette pointer-events-none" />

          {/* Warm ambient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "oklch(0.14 0.05 50 / 0.3)" }}
          />
        </div>

        {/* ── Dark fade overlay as zoom progresses ── */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-100"
          style={{ background: "oklch(0.10 0.02 50)", opacity: overlayOpacity }}
        />

        {/* ── Hero text (fades out as scroll progresses) ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 z-10 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
        >
          <p className="font-[family-name:var(--font-lora)] italic text-primary/80 text-sm tracking-widest mb-3 uppercase">
            Frame Every Feeling
          </p>
          <h1 className="font-[family-name:var(--font-cinzel)] text-5xl md:text-7xl font-black text-center text-foreground leading-tight tracking-tight text-balance drop-shadow-2xl">
            Teja Visual Arts
          </h1>
          <p className="font-[family-name:var(--font-lora)] text-muted-foreground text-center mt-4 max-w-md leading-relaxed text-base">
            Cinematic video editing, colour grading & motion — crafted with warmth.
          </p>

          {/* Scroll hint */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.3em] text-primary/60 uppercase">
              Scroll to explore
            </span>
            <div className="w-px h-12 bg-primary/40 animate-pulse" />
          </div>
        </div>

        {/* ── Monitor carousel — fades in after zoom ── */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{
            opacity: phase === "monitor" ? (scrollProgress - 0.6) / 0.4 : 0,
            pointerEvents: phase === "monitor" ? "auto" : "none",
          }}
        >
          <MonitorCarousel />
        </div>

        {/* ── Floating studio label ── */}
        <div
          className="absolute bottom-6 left-6 z-30"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-primary/50 uppercase">
            Studio — Est. 2019
          </p>
        </div>
      </div>
    </div>
  );
}
