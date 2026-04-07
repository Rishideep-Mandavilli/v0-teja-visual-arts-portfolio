"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "The Student's Journey",
    category: "Short Film",
    year: "2025",
    thumb: "/images/thestudent'sjourney.mp4",
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const project = projects[active];
  const isVideo = project.thumb.toLowerCase().endsWith(".mp4");

  const prev = useCallback(() => {
    setActive((v) => (v - 1 + projects.length) % projects.length);
    setIsPlaying(true);
  }, []);

  const next = useCallback(() => {
    setActive((v) => (v + 1) % projects.length);
    setIsPlaying(true);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Re-run play logic when project changes
  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [active, isVideo]);

  return (
    <div className="relative flex flex-col items-center group/monitor">
      {/* Monitor Frame */}
      <div
        className="monitor-glow relative rounded-2xl overflow-hidden bg-[#050505] cursor-pointer"
        style={{
          border: "4px solid #222",
          width: "min(800px, 92vw)",
          aspectRatio: "16/9",
          boxShadow: `0 0 80px 10px rgba(255, 80, 0, 0.1)`,
        }}
        onClick={togglePlay}
      >
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 4px)", backgroundSize: "100% 4px" }}
        />

        <div className="relative w-full h-full flex items-center justify-center">
          {isVideo ? (
            <video
              ref={videoRef}
              key={project.thumb}
              src={project.thumb}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img src={project.thumb} alt={project.title} className="w-full h-full object-cover" />
          )}

          {/* Central Play Button (appears when paused) */}
          {!isPlaying && isVideo && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
              <div className="w-20 h-20 rounded-full border-2 border-orange-500 flex items-center justify-center bg-black/40 text-orange-500 animate-pulse">
                <Play size={40} fill="currentColor" />
              </div>
            </div>
          )}

          {/* Controls Overlay (Bottom Right) */}
          <div className="absolute bottom-6 right-6 z-50 flex gap-3 opacity-0 group-hover/monitor:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
              className="p-3 rounded-full bg-black/60 text-white hover:text-orange-500 border border-white/10"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="p-3 rounded-full bg-black/60 text-white hover:text-orange-500 border border-white/10"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
          </div>

          {/* Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-30 bg-linear-to-t from-black via-black/40 to-transparent pointer-events-none">
            <p className="text-[10px] tracking-[0.3em] text-orange-500/90 uppercase mb-2 font-mono font-bold">
              SYSTEM // {project.category}
            </p>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button onClick={prev} className="absolute left-[-80px] top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-orange-500 transition-all">
        <ChevronLeft size={60} strokeWidth={1} />
      </button>
      <button onClick={next} className="absolute right-[-80px] top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-orange-500 transition-all">
        <ChevronRight size={60} strokeWidth={1} />
      </button>
    </div>
  );
}