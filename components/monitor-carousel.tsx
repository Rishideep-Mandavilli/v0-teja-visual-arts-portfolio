"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "The Student's Journey",
    category: "Short Film",
    year: "2025",
    // This matches your sidebar exactly
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
      {/* The Monitor Frame */}
      <div
        className="monitor-glow relative rounded-2xl overflow-hidden bg-[#0a0a0a]"
        style={{
          border: "3px solid #333",
          width: "min(800px, 92vw)",
          aspectRatio: "16/9",
          boxShadow: `0 0 60px 20px rgba(255, 100, 50, 0.15)`,
        }}
      >
        {/* CRT Scanline Overlay (Visual Polish) */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 3px)", backgroundSize: "100% 4px" }}
        />

        <div className="relative w-full h-full">
          {isVideo ? (
            <video
              key={project.thumb} // Forces reload when switching projects
              src={project.thumb}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img
              src={project.thumb}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Project Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-30 bg-gradient-to-t from-black via-black/60 to-transparent">
            <p className="text-[10px] tracking-widest text-orange-500/80 uppercase mb-1 font-mono">
              {project.category} // {project.year}
            </p>
            <h3 className="text-3xl font-bold text-white uppercase tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-md line-clamp-2 italic">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prev}
        className="absolute left-[-60px] top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-orange-500 transition-all active:scale-90"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button
        onClick={next}
        className="absolute right-[-60px] top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-orange-500 transition-all active:scale-90"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>
    </div>
  );
}