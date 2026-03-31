export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-cinzel)] text-sm font-bold tracking-widest text-primary uppercase">
          Teja Visual Arts
        </p>
        <p className="font-[family-name:var(--font-lora)] italic text-xs text-muted-foreground">
          &ldquo;Every frame is a painting. Every cut is a heartbeat.&rdquo;
        </p>
        <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-widest text-muted-foreground/50 uppercase">
          &copy; {new Date().getFullYear()} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
