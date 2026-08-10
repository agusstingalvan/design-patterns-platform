import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  CircleDot,
  Database,
  FolderGit2,
  Gamepad2,
  Github,
  Layers3,
  Save,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const patterns = [
  {
    name: "Singleton",
    category: "Creacional",
    icon: CircleDot,
    use: "GameManager, AudioManager y configuracion global.",
    detail: "Una instancia, un punto de acceso claro.",
  },
  {
    name: "Flyweight",
    category: "Estructural",
    icon: Layers3,
    use: "Vegetación, tiles y enemigos con recursos visuales comunes.",
    detail: "Comparte estado común y evita duplicarlo por entidad.",
  },
  {
    name: "State Machine",
    category: "Comportamiento",
    icon: Gamepad2,
    use: "IA, personajes y fases de enemigos.",
    detail: "Cada comportamiento en su propio estado.",
  },
];

function CodePreview() {
  return (
    <div className="landing-preview relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white" />
          Unity Pattern Generator
        </div>
        <span>C#</span>
      </div>
      <div className="grid min-h-[380px] md:grid-cols-[0.78fr_1.22fr]">
        <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-white">Configuracion</p>
          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-2 text-white/50">Patron</p>
              <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white">
                <span>Singleton</span><span className="text-white/40">⌄</span>
              </div>
            </div>
            <div>
              <p className="mb-2 text-white/50">Clase principal</p>
              <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono text-white">GameManager</div>
            </div>
            <div className="rounded-md border border-white/15 bg-white/[0.06] p-3 text-xs leading-relaxed text-white/70">
              Persistencia entre escenas y creacion perezosa listas para configurar.
            </div>
          </div>
        </div>
        <div className="p-5 font-mono text-[12px] leading-6 sm:text-[13px]">
          <div className="mb-5 flex gap-5 border-b border-white/10 pb-3 text-xs text-white/50">
            <span className="border-b-2 border-white pb-3 -mb-[13px] text-white">GameManager.cs</span>
            <span>README.md</span>
          </div>
          <p className="text-white/70">using <span className="text-white">UnityEngine</span>;</p>
          <br />
          <p><span className="text-white/70">public class</span> <span className="text-white">GameManager</span> <span className="text-white">: MonoBehaviour</span></p>
          <p>{"{"}</p>
          <p className="pl-4"><span className="text-white/70">public static</span> GameManager Instance;</p>
          <br />
          <p className="pl-4"><span className="text-white/70">private void</span> <span className="text-white">Awake</span>()</p>
          <p className="pl-4">{"{"}</p>
          <p className="pl-8"><span className="text-white/70">if</span> (Instance == null)</p>
          <p className="pl-8">{"{"}</p>
          <p className="pl-12 text-white">Instance = this;</p>
          <p className="pl-12 text-white">DontDestroyOnLoad(gameObject);</p>
          <p className="pl-8">{"}"}</p>
          <p className="pl-4">{"}"}</p>
          <p>{"}"}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0e0c] text-white">
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 -z-10 landing-grid opacity-40" />
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-white/[0.08] blur-[120px]" />
          <div className="container px-5 py-20 md:px-8 md:py-28 lg:py-36">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/80">
                <Sparkles className="h-3.5 w-3.5" /> Patrones para Unity, sin instalar paquetes
              </p>
              <h1 className="text-balance text-5xl font-semibold tracking-[-0.065em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Menos estructura repetitiva. <span className="text-white/55">Mas juego.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-7 text-white/65 sm:text-lg">
                Configura patrones de diseno para Unity y genera una base C# lista para extender, guardar con tu equipo o enviar a GitHub.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-white px-6 font-semibold text-black hover:bg-white/85">
                  <Link href="/generator">Abrir generador <ArrowRight /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/15 bg-white/[0.03] text-white hover:bg-white/10 hover:text-white">
                  <a href="#como-funciona">Ver como funciona</a>
                </Button>
              </div>
              <p className="mt-5 text-xs text-white/40">Codigo visible en tiempo real. Exportacion individual o ZIP.</p>
            </div>
            <div className="mx-auto mt-16 max-w-5xl md:mt-20">
              <CodePreview />
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#111111]">
          <div className="container grid gap-px px-5 md:grid-cols-3 md:px-8">
            {[
              ["Sin boilerplate", "Elige una estructura probada en vez de partir de una pagina en blanco."],
               ["Sin perder control", "Personaliza clases, estados, callbacks y estado compartido."],
              ["Sin salir del flujo", "Copia, descarga, guarda o crea un Pull Request desde un mismo lugar."],
            ].map(([title, copy]) => (
              <div key={title} className="border-b border-white/10 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <p className="mb-2 text-sm font-medium text-white">{title}</p>
                <p className="text-sm leading-6 text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="container px-5 py-24 md:px-8 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="section-label">De problema a base funcional</p>
              <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Elegis problema. Generas estructura. Seguis creando.</h2>
              <p className="mt-6 max-w-md leading-7 text-white/60">La herramienta cubre la friccion inicial de implementar un patron. El diseno y decisiones de tu juego siguen siendo tuyos.</p>
            </div>
            <ol className="space-y-4">
              {[
                ["01", "Selecciona", "Escoge el patron que responde al problema de tu juego."],
                ["02", "Personaliza", "Ajusta nombres, variantes y parametros con vista de codigo inmediata."],
                ["03", "Integra", "Descarga archivos, guarda configuracion o abre un PR en tu repositorio."],
              ].map(([number, title, copy]) => (
                <li key={number} className="group grid grid-cols-[54px_1fr] gap-5 rounded-xl border border-white/10 bg-white/[0.025] p-5 transition-[transform,border-color,background-color] duration-200 ease-out md:p-6">
                  <span className="font-mono text-sm text-white">{number}</span>
                  <div><h3 className="text-lg font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-white/55">{copy}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#111111]">
          <div className="container px-5 py-24 md:px-8 md:py-32">
            <div className="max-w-2xl">
              <p className="section-label">Tres puntos de partida</p>
              <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Patrones elegidos para problemas reales de videojuegos.</h2>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {patterns.map(({ name, category, icon: Icon, use, detail }) => (
                <article key={name} className="group rounded-xl border border-white/10 bg-black p-6 transition-[transform,border-color] duration-200 ease-out hover:border-white/40 md:p-7">
                  <div className="flex items-start justify-between"><Icon className="h-6 w-6 text-white" /><span className="text-xs text-white/40">{category}</span></div>
                  <h3 className="mt-12 text-2xl font-medium tracking-tight">{name}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{use}</p>
                  <p className="mt-8 border-t border-white/10 pt-4 text-xs leading-5 text-white/40">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container px-5 py-24 md:px-8 md:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="rounded-2xl border border-white/10 bg-[#151515] p-7 md:p-10">
              <Save className="h-7 w-7 text-white" />
              <p className="section-label mt-12">Persistencia y equipos</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em]">Tus patrones no se pierden al cerrar la pestana.</h2>
              <p className="mt-5 max-w-md leading-7 text-white/60">Guarda configuraciones completas en proyectos, recuperalas cuando las necesites y compartelas con tu equipo.</p>
              <div className="mt-9 flex items-center gap-3 text-sm text-white/70"><Database className="h-4 w-4 text-white" /> Colecciones como repositorio de conocimiento del equipo.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#151515] p-7 md:p-10">
              <Github className="h-7 w-7 text-white" />
              <p className="section-label mt-12">GitHub integrado</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em]">De patron generado a Pull Request.</h2>
              <p className="mt-5 max-w-md leading-7 text-white/60">Inicia sesion con GitHub, elige repositorio y rama base. La plataforma crea una rama y abre un PR con los archivos generados.</p>
              <div className="mt-9 flex items-center gap-3 text-sm text-white/70"><FolderGit2 className="h-4 w-4 text-white" /> Menos copia y pega. Mas continuidad en tu flujo.</div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#111111]">
          <div className="container grid gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="section-label">Base antes que prompt</p>
              <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Dale a una IA contexto, no una adivinanza.</h2>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0b0e0c] p-6 md:p-8">
              <Bot className="h-6 w-6 text-white" />
              <p className="mt-6 text-lg leading-8 text-white/75">Cada patron puede incluir un README con su estructura e intencion. Una base clara para documentar, iterar o extender despues con asistencia de IA.</p>
              <p className="mt-6 text-sm text-white/45">La herramienta complementa el trabajo con IA; no reemplaza decisiones de arquitectura.</p>
            </div>
          </div>
        </section>

        <section className="container px-5 py-24 md:px-8 md:py-32">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b1b1b] to-black p-8 md:p-12 lg:p-16">
            <Braces className="h-8 w-8 text-white" />
            <p className="section-label mt-12">Proyecto academico aplicado</p>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Desarrollado como Trabajo Final de Carrera para mejorar la Developer Experience en videojuegos.</h2>
            <div className="mt-9 grid gap-4 text-sm text-white/60 sm:grid-cols-2">
              <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-white" /> Universidad Nacional de Rafaela</p>
              <p className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-white" /> Licenciatura en Produccion de Videojuegos y Entretenimiento Digital</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
