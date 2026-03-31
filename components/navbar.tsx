"use client";

import { useEffect, useState } from "react";

const links = ["Work", "About", "Services", "Contact"];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-[family-name:var(--font-cinzel)] text-lg font-bold tracking-widest text-primary uppercase"
        >
          Teja Visual Arts
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-[family-name:var(--font-lora)] text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/50 text-primary font-[family-name:var(--font-cinzel)] text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}
