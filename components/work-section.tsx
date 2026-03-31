"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "The Wanderer",
    category: "Short Film",
    year: "2024",
    thumb: "/images/project-1.jpg",
    description:
      "A lone journey through amber hills and forgotten roads. Winner of Best Editing at Indie Film Fest 2024.",
    tags: ["Editing", "Color Grade", "Sound Design"],
  },
  {
    id: 2,
    title: "Night Market",
    category: "Commercial",
    year: "2023",
    thumb: "/images/project-2.jpg",
    description:
      "Rain-lit lanterns and the warmth of street food culture — a 60-second brand campaign.",
    tags: ["Commercial", "Color Grade", "Motion Graphics"],
  },
  {
    id: 3,
    title: "Lavender Dusk",
    category: "Music Video",
    year: "2023",
    thumb: "/images/project-3.jpg",
    description:
      "A dreamy countryside ode to slow summer evenings, shot on 16mm and hand-coloured.",
    tags: ["Music Video", "Film Scan", "VFX"],
  },
  {
    id: 4,
    title: "Temple Autumn",
    category: "Documentary",
    year: "2022",
    thumb: "/images/project-4.jpg",
    description:
      "Ancient stones and falling leaves — a 20-minute documentary on forgotten sacred spaces.",
    tags: ["Documentary", "Editing", "Color Grade"],
  },
];

export default function WorkSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.4em] text-primary uppercase mb-3">
            Selected Work
          </p>
          <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
            Stories in Light
            <br />
            <span className="text-primary">& Shadow</span>
          </h2>
        </div>
        <p className="font-[family-name:var(--font-lora)] italic text-muted-foreground max-w-xs leading-relaxed">
          Each project is a world carefully assembled — frame by frame, breath by breath.
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="group relative rounded-xl overflow-hidden cursor-pointer"
            style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Image */}
            <img
              src={project.thumb}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Default overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.08 0.02 45 / 0.9) 0%, transparent 60%)",
              }}
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: "oklch(0.10 0.025 45 / 0.6)",
                opacity: hovered === project.id ? 1 : 0,
              }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-cinzel)] text-[10px] tracking-widest text-primary border border-primary/40 rounded-full px-2.5 py-0.5 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-primary/60 uppercase mb-1">
                {project.category} · {project.year}
              </p>
              <h3 className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-foreground">
                {project.title}
              </h3>
              <p
                className="font-[family-name:var(--font-lora)] italic text-sm text-muted-foreground mt-2 leading-relaxed transition-all duration-500 overflow-hidden"
                style={{
                  maxHeight: hovered === project.id ? "80px" : "0px",
                  opacity: hovered === project.id ? 1 : 0,
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Corner number */}
            <div className="absolute top-4 right-4 font-[family-name:var(--font-cinzel)] text-xs text-foreground/30">
              0{project.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
