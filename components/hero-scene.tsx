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

  const scale = 1 + scrollProgress * 1.5;
  const translateY = scrollProgress * -6;
  const sceneOpacity = scrollProgress < 0.7 ? 1 : 1 - (scrollProgress - 0.7) / 0.3;
  const overlayOpacity = scrollProgress < 0.5 ? 0 : (scrollProgress - 0.5) / 0.5;

  return (
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

          <div className="absolute inset-0 vignette pointer-events-none" />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "oklch(0.14 0.05 50 / 0.3)" }}
          />
        </div>

        {/* ── Dark fade overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-100"
          style={{ background: "oklch(0.10 0.02 50)", opacity: overlayOpacity }}
        />

        {/* ── Hero text ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 z-10 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
        >
          {/* 🔥 NEW: gradient backdrop for readability */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

          <p
            className="font-(family-name:--font-lora) italic text-[#FFD580] text-sm tracking-widest mb-3 uppercase"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Frame Every Feeling
          </p>

          <h1
            className="font-(family-name:--font-cinzel) text-5xl md:text-7xl font-black text-center text-[#FFE4B5] leading-tight tracking-tight text-balance drop-shadow-2xl"
            style={{ textShadow: "0 4px 30px rgba(255,180,80,0.4)" }}
          >
            Teja Visual Arts
          </h1>

          <p
            className="font-(family-name:--font-lora) text-[#FFF3E0] text-center mt-4 max-w-md leading-relaxed text-base"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Cinematic video editing, colour grading & motion — crafted with warmth.
          </p>

          {/* Scroll hint */}
          <div className="mt-10 flex flex-col items-center gap-2">
            <span className="font-(family-name:--font-cinzel) text-xs tracking-[0.3em] text-primary/60 uppercase">
              Scroll to explore
            </span>
            <div className="w-px h-12 bg-primary/40 animate-pulse" />
          </div>
        </div>

        {/* ── Monitor carousel ── */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{
            opacity: phase === "monitor" ? (scrollProgress - 0.6) / 0.4 : 0,
            pointerEvents: phase === "monitor" ? "auto" : "none",
          }}
        >
          <MonitorCarousel />
        </div>

        {/* ── Studio label ── */}
        <div
          className="absolute bottom-6 left-6 z-30"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          <p className="font-(family-name:--font-cinzel) text-xs tracking-widest text-primary/50 uppercase">
            Studio — Est. 2025
          </p>
        </div>

      </div>
    </div>
  );
}