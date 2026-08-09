import { ArrowUpRight, GitFork, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative flex min-h-screen flex-col justify-between overflow-hidden border-t border-white/10 bg-black px-5 py-8 text-white md:px-8 md:py-10">
      <div className="footer-grid pointer-events-none absolute inset-0 landing-grid" />
      <div className="footer-orbit footer-orbit-one" />
      <div className="footer-orbit footer-orbit-two" />
      <div className="relative flex items-center justify-between text-sm font-medium">
        <span className="flex items-center gap-2"><GitFork className="h-5 w-5" /> Game Design Patterns</span>
        <a className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white" href="https://www.unraf.edu.ar/" target="_blank" rel="noreferrer">
          <Image src="/unraf-logo.webp" alt="Universidad Nacional de Rafaela" width={72} height={28} className="h-7 w-auto object-contain" />
          <span>UNRaf · TFC 2025</span>
        </a>
      </div>
      <div className="relative max-w-6xl py-16">
        <p className="text-sm font-medium uppercase tracking-[0.14em]">Listo para dejar de repetir estructura</p>
        <h2 className="mt-5 text-balance text-6xl font-semibold tracking-[-0.075em] sm:text-7xl md:text-8xl lg:text-9xl">Menos boilerplate.<br />Mas juego.</h2>
        <Link href="/generator" className="mt-10 inline-flex items-center gap-2 border-b-2 border-white pb-2 text-lg font-semibold transition-opacity hover:opacity-65">
          Generar mi patron <ArrowUpRight className="h-5 w-5" />
        </Link>
      </div>
      <div className="relative flex flex-col gap-4 border-t border-white/20 pt-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <p>Desarrollado por <a className="font-medium underline underline-offset-4" href="https://agustingalvan.netlify.app/" target="_blank" rel="noreferrer">Agustin Galvan</a>. Licenciatura en Produccion de Videojuegos y Entretenimiento Digital.</p>
        <a className="inline-flex items-center gap-2 font-medium hover:underline" href="https://github.com/agusstingalvan/design-patterns-platform" target="_blank" rel="noreferrer"><Github className="h-4 w-4" /> Ver repositorio</a>
      </div>
    </footer>
  );
}
