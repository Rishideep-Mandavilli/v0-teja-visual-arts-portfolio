"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// R3F must be client-only; dynamic import avoids SSR issues
const StudioScene3D = dynamic(() => import("./studio-scene-3d"), { ssr: false });

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect        = containerRef.current.getBoundingClientRect();
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled    = -rect.top;
      const progress    = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero text fades out in the first 30% of scroll
  const heroTextOpacity = Math.max(0, 1 - scrollProgress * 3.5);

  return (
    /* 300 vh sticky scroll container */
    <div ref={containerRef} className="relative h-[300vh]" id="hero">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Full-screen 3D canvas ── */}
        <div className="absolute inset-0 film-grain">
          <StudioScene3D scrollProgress={scrollProgress} />
          {/* Subtle vignette on top of canvas */}
          <div className="absolute inset-0 vignette pointer-events-none" />
        </div>

        {/* ── Hero text (fades as you scroll) ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 z-10 pointer-events-none"
          style={{ opacity: heroTextOpacity, transition: "opacity 0.1s linear" }}
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

        {/* ── Studio label bottom-left ── */}
        <div
          className="absolute bottom-6 left-6 z-30 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
        >
          <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-primary/50 uppercase">
            Studio — Est. 2019
          </p>
        </div>

        {/* ── Scroll progress pill (visible while scrolling through scene) ── */}
        {scrollProgress > 0.05 && scrollProgress < 0.98 && (
          <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 pointer-events-none">
            <div className="w-20 h-0.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
