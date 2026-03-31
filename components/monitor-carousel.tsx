"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "The Wanderer",
    category: "Short Film",
    year: "2024",
    thumb: "/images/project-1.jpg",
    description: "A lone journey through amber hills and forgotten roads.",
  },
  {
    id: 2,
    title: "Night Market",
    category: "Commercial",
    year: "2023",
    thumb: "/images/project-2.jpg",
    description: "Rain-lit lanterns and the warmth of street food culture.",
  },
  {
    id: 3,
    title: "Lavender Dusk",
    category: "Music Video",
    year: "2023",
    thumb: "/images/project-3.jpg",
    description: "A dreamy countryside ode to slow summer evenings.",
  },
  {
    id: 4,
    title: "Temple Autumn",
    category: "Documentary",
    year: "2022",
    thumb: "/images/project-4.jpg",
    description: "Ancient stones and falling leaves — where time rests.",
  },
];

export default function MonitorCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const prev = useCallback(() => {
    setDirection("left");
    setActive((v) => (v - 1 + projects.length) % projects.length);
  }, []);

  const next = useCallback(() => {
    setDirection("right");
    setActive((v) => (v + 1) % projects.length);
  }, []);

  const project = projects[active];

  return (
    /* CRT-style monitor frame */
    <div className="relative flex flex-col items-center">
      {/* Monitor outer bezel */}
      <div
        className="monitor-glow relative rounded-2xl overflow-hidden"
        style={{
          background: "oklch(0.12 0.025 45)",
          border: "3px solid oklch(0.30 0.06 50)",
          width: "min(720px, 92vw)",
          boxShadow: `
            0 0 0 6px oklch(0.20 0.04 48),
            0 0 60px 20px oklch(0.72 0.18 55 / 0.35),
            0 0 120px 50px oklch(0.65 0.14 60 / 0.12)
          `,
        }}
      >
        {/* Screen scanline overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, oklch(0 0 0 / 0.08) 0px, transparent 1px, transparent 3px)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Screen content */}
        <div className="relative aspect-video overflow-hidden">
          <img
            key={project.id}
            src={project.thumb}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ filter: "brightness(0.9) contrast(1.05) saturate(1.1)" }}
          />

          {/* Warm amber tint overlay on screen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "oklch(0.55 0.12 55 / 0.08)", mixBlendMode: "multiply" }}
          />

          {/* Project info overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10"
            style={{ background: "linear-gradient(transparent, oklch(0.08 0.02 45 / 0.95))" }}
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-primary/70 uppercase mb-1">
                  {project.category} · {project.year}
                </p>
                <h3 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="font-[family-name:var(--font-lora)] italic text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              </div>

              {/* Play button */}
              <button
                aria-label={`Play ${project.title}`}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shrink-0 ml-4"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="absolute top-3 right-3 flex gap-1.5 z-10">
            {projects.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => setActive(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "bg-primary w-4" : "bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom bezel strip */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{ background: "oklch(0.15 0.03 47)" }}
        >
          <span className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-widest text-primary/50 uppercase">
            Teja Visual Arts · Portfolio
          </span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Monitor stand */}
      <div
        className="w-24 h-4 mt-0 rounded-b-sm"
        style={{ background: "oklch(0.22 0.04 48)", boxShadow: "0 4px 12px oklch(0 0 0 / 0.5)" }}
      />
      <div
        className="w-40 h-2 rounded-sm"
        style={{ background: "oklch(0.18 0.03 45)" }}
      />

      {/* Carousel nav arrows — outside monitor */}
      <button
        onClick={prev}
        aria-label="Previous project"
        className="absolute left-0 top-1/3 -translate-x-full -translate-y-1/2 mr-4 flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next project"
        className="absolute right-0 top-1/3 translate-x-full -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
