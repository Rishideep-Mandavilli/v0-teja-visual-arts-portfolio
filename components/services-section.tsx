"use client";

import { Film, Palette, Zap, Music, Camera, Layers } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Video Editing",
    desc: "Narrative-driven editing that breathes life into your footage. From rough assembly to final cut.",
  },
  {
    icon: Palette,
    title: "Color Grading",
    desc: "Cinematic colour palettes that evoke feeling — warm golden hours, cool noir shadows, vivid naturalism.",
  },
  {
    icon: Zap,
    title: "Motion Graphics",
    desc: "Kinetic titles, animated infographics, and seamless transitions that serve the story.",
  },
  {
    icon: Music,
    title: "Sound Design",
    desc: "Ambient layers, foley, and music supervision. The edit is only half the experience.",
  },
  {
    icon: Camera,
    title: "Short Films",
    desc: "Full post-production pipelines for short films: rough cut to DCP-ready deliverable.",
  },
  {
    icon: Layers,
    title: "Visual Effects",
    desc: "Compositing, rotoscoping, matte painting — invisible work that makes the impossible feel real.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 relative">
      {/* Divider line */}
      <div className="max-w-7xl mx-auto">
        <div
          className="w-full h-px mb-16"
          style={{ background: "linear-gradient(to right, transparent, oklch(0.30 0.06 50), transparent)" }}
        />

        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.4em] text-primary uppercase mb-3">
              Services
            </p>
            <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl font-bold text-foreground text-balance">
              What I Craft
            </h2>
          </div>
          <p className="font-[family-name:var(--font-lora)] italic text-muted-foreground max-w-xs leading-relaxed">
            Every service is offered with full creative commitment and cinematic intention.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="group rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 cursor-default"
                style={{
                  background: "oklch(0.18 0.03 50)",
                  border: "1px solid oklch(0.26 0.05 50)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.72 0.18 55 / 0.5)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px oklch(0.72 0.18 55 / 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.26 0.05 50)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.72 0.18 55 / 0.12)" }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="font-[family-name:var(--font-cinzel)] text-base font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="font-[family-name:var(--font-lora)] text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
