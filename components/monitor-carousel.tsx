"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "The Student's Journey",
    category: "Short Film",
    year: "2025",
    thumb: "/images/thestudentsjourney.mp4",
    description: "A journey of group of students who just became friends.",
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

  const prev = useCallback(() => {
    setActive((v) => (v - 1 + projects.length) % projects.length);
  }, []);

  const next = useCallback(() => {
    setActive((v) => (v + 1) % projects.length);
  }, []);

  const project = projects[active];
  const isVideo = project.thumb.toLowerCase().endsWith(".mp4");

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="monitor-glow relative rounded-2xl overflow-hidden bg-[#1a1a1a]"
        style={{
          border: "3px solid oklch(0.30 0.06 50)",
          width: "min(720px, 92vw)",
          boxShadow: `0 0 60px 20px oklch(0.72 0.18 55 / 0.2)`,
        }}
      >
        {/* Scanline Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-20"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 3px)", backgroundSize: "100% 4px" }}
        />

        <div className="relative aspect-video overflow-hidden bg-black">
          {isVideo ? (
            <video
              key={project.thumb}
              src={project.thumb}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={project.thumb}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-30 bg-linear-to-t from-black/90 to-transparent">
            <p className="text-[10px] tracking-widest text-primary/70 uppercase">{project.category} · {project.year}</p>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-xs text-gray-400 italic">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button onClick={prev} className="absolute left-[-50px] top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors">
        <ChevronLeft size={32} />
      </button>
      <button onClick={next} className="absolute right-[-50px] top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors">
        <ChevronRight size={32} />
      </button>
    </div>
  );
}