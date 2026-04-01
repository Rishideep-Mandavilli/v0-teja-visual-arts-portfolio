"use client";

const skills = [
  { label: "Video Editing", value: 95 },
  { label: "Color Grading", value: 90 },
  { label: "Motion Graphics", value: 78 },
  { label: "Sound Design", value: 72 },
  { label: "Visual Effects", value: 65 },
];

const tools = ["DaVinci Resolve", "Adobe Premiere", "After Effects", "Final Cut Pro", "Audition", "Fusion"];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* warm ambient blob */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "oklch(0.72 0.18 55 / 0.04)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — desk lamp illustration / image */}
          <div className="relative">
            {/* Studio desk visual */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 0 60px 10px oklch(0.72 0.18 55 / 0.15)",
                border: "1px solid oklch(0.28 0.05 50)",
              }}
            >
              <img
                src="/images/studio-scene.jpg"
                alt="Teja's editing studio"
                className="w-full h-80 object-cover object-center"
                style={{ filter: "brightness(0.8) contrast(1.05)" }}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.10 0.025 45 / 0.8) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Floating stat cards */}
            <div
              className="absolute -bottom-6 -right-6 rounded-xl p-4 backdrop-blur-md"
              style={{
                background: "oklch(0.19 0.035 50 / 0.95)",
                border: "1px solid oklch(0.30 0.06 50)",
                boxShadow: "0 0 30px oklch(0.72 0.18 55 / 0.2)",
              }}
            >
              <p className="font-(family-name:--font-cinzel) text-3xl font-bold text-primary">5+</p>
              <p className="font-(family-name:--font-lora) text-xs text-muted-foreground mt-0.5">Years of craft</p>
            </div>
            <div
              className="absolute -top-4 -left-4 rounded-xl p-4 backdrop-blur-md"
              style={{
                background: "oklch(0.19 0.035 50 / 0.95)",
                border: "1px solid oklch(0.30 0.06 50)",
              }}
            >
              <p className="font-(family-name:--font-cinzel) text-3xl font-bold text-primary">120+</p>
              <p className="font-(family-name:--font-lora) text-xs text-muted-foreground mt-0.5">Projects edited</p>
            </div>
          </div>

          {/* Right — text & skills */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-(family-name:--font-cinzel) text-xs tracking-[0.4em] text-primary uppercase mb-3">
                About Me
              </p>
              <h2 className="font-(family-name:--font-cinzel) text-4xl font-bold text-foreground leading-tight mb-5 text-balance">
                A Quiet Studio,
                <br />
                <span className="text-primary italic font-(family-name:--font-lora)">Loud Stories</span>
              </h2>
              <p className="font-(family-name:--font-lora) text-muted-foreground leading-relaxed">
                I&apos;m Teja — a video editor and colourist who believes every cut is an emotion.
                Working from a warm, cluttered studio that smells like coffee and old film,
                I shape raw footage into cinematic experiences that linger long after the final frame.
              </p>
              <p className="font-(family-name:--font-lora) text-muted-foreground leading-relaxed mt-4">
                Inspired by the painterly warmth of Studio Ghibli and the soul of classic cinema,
                I bring that same quiet magic to every commercial, documentary, and short film I touch.
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-4">
              {skills.map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-(family-name:--font-cinzel) text-xs tracking-wide text-foreground/80 uppercase">
                      {skill.label}
                    </span>
                    <span className="font-(family-name:--font-cinzel) text-xs text-primary">
                      {skill.value}%
                    </span>
                  </div>
                  <div
                    className="w-full h-1 rounded-full"
                    style={{ background: "oklch(0.25 0.04 50)" }}
                  >
                    <div
                      className="h-1 rounded-full"
                      style={{
                        width: `${skill.value}%`,
                        background: "linear-gradient(to right, oklch(0.62 0.16 40), oklch(0.72 0.18 55))",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div>
              <p className="font-(family-name:--font-cinzel) text-xs tracking-widest text-muted-foreground uppercase mb-3">
                Tools of the trade
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-(family-name:--font-lora) text-sm text-foreground/70 border border-border rounded-full px-3 py-1 hover:border-primary/60 hover:text-primary transition-colors duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
