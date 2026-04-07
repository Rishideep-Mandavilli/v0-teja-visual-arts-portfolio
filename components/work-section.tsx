"use client";

import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "The Student's Journey",
    category: "Short Film",
    year: "2025",
    thumb: "/images/thestudent'sjourney.mp4",
    description: "A lone journey through amber hills and forgotten roads.",
    tags: ["Editing", "Color Grade", "Sound Design"],
  },
  {
    id: 2,
    title: "Night Market",
    category: "Commercial",
    year: "2023",
    thumb: "/images/project-2.jpg",
    description: "Rain-lit lanterns and the warmth of street food culture.",
    tags: ["Commercial", "Color Grade"],
  },
  {
    id: 3,
    title: "Lavender Dusk",
    category: "Music Video",
    year: "2023",
    thumb: "/images/project-3.jpg",
    description: "A dreamy countryside ode to slow summer evenings.",
    tags: ["Music Video", "VFX"],
  },
  {
    id: 4,
    title: "Temple Autumn",
    category: "Documentary",
    year: "2022",
    thumb: "/images/project-4.jpg",
    description: "Ancient stones and falling leaves.",
    tags: ["Documentary", "Editing"],
  },
];

export default function WorkSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => {
          const isVideo = project.thumb.endsWith(".mp4");
          return (
            <div
              key={project.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-black"
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {isVideo ? (
                <video
                  src={project.thumb}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src={project.thumb}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-linear-to-t from-black to-transparent">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className={`text-sm text-gray-300 overflow-hidden transition-all duration-500 ${hovered === project.id ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                  {project.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}