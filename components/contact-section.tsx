"use client";

import { useState } from "react";
import { Send, Mail, Instagram, Youtube } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Warm glow */}
      <div
        className="absolute -bottom-60 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "oklch(0.72 0.18 55 / 0.06)", filter: "blur(100px)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Top divider */}
        <div
          className="w-full h-px mb-16"
          style={{ background: "linear-gradient(to right, transparent, oklch(0.30 0.06 50), transparent)" }}
        />

        <div className="text-center mb-12">
          <p className="font-(family-name:--font-cinzel) text-xs tracking-[0.4em] text-primary uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-(family-name:--font-cinzel) text-4xl md:text-5xl font-bold text-foreground text-balance mb-4">
            {"Let's Make Something"}
            <br />
            <span className="text-primary italic font-(family-name:--font-lora)">Beautiful Together</span>
          </h2>
          <p className="font-(family-name:--font-lora) text-muted-foreground leading-relaxed">
            Have a project in mind? I&apos;d love to hear your story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left — social / contact info */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div
              className="rounded-xl p-5"
              style={{ background: "oklch(0.18 0.03 50)", border: "1px solid oklch(0.26 0.05 50)" }}
            >
              <p className="font-(family-name:--font-cinzel) text-xs tracking-widest text-primary uppercase mb-4">
                Reach Out
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hello@tejavisualarts.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="font-(family-name:--font-lora) text-sm">rishideep.edu@gmail.com</span>
                </a>
                <a
                  href="https://www.instagram.com/tejavisualarts/"
                  aria-label="Instagram"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4 shrink-0" />
                  <span className="font-(family-name:--font-lora) text-sm">@tejavisualarts</span>
                </a>
                <a
                  href="http://www.youtube.com/@Teja_Visual_Arts"
                  aria-label="YouTube"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Youtube className="w-4 h-4 shrink-0" />
                  <span className="font-(family-name:--font-lora) text-sm">Teja Visual Arts</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div
              className="rounded-xl p-5"
              style={{ background: "oklch(0.18 0.03 50)", border: "1px solid oklch(0.26 0.05 50)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="font-(family-name:--font-cinzel) text-xs tracking-widest text-primary uppercase">
                  Available
                </p>
              </div>
              <p className="font-(family-name:--font-lora) text-sm text-muted-foreground leading-relaxed">
                Accepting new projects in 2026. Contact me for more details.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="font-(family-name:--font-cinzel) text-xs tracking-widest text-muted-foreground uppercase block mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg text-sm font-(family-name:--font-lora) text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  style={{
                    background: "oklch(0.18 0.03 50)",
                    border: "1px solid oklch(0.26 0.05 50)",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-(family-name:--font-cinzel) text-xs tracking-widest text-muted-foreground uppercase block mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg text-sm font-(family-name:--font-lora) text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  style={{
                    background: "oklch(0.18 0.03 50)",
                    border: "1px solid oklch(0.26 0.05 50)",
                  }}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="font-(family-name:--font-cinzel) text-xs tracking-widest text-muted-foreground uppercase block mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-lg text-sm font-(family-name:--font-lora) text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all duration-300"
                style={{
                  background: "oklch(0.18 0.03 50)",
                  border: "1px solid oklch(0.26 0.05 50)",
                }}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-(family-name:--font-cinzel) text-sm tracking-widest uppercase text-primary-foreground transition-all duration-300 hover:brightness-110 active:scale-95"
              style={{ background: "oklch(0.62 0.16 50)" }}
            >
              {sent ? (
                <>Sent with warmth</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
