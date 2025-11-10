import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code2,
  Gamepad2,
  GitFork,
  Layers,
  LayoutTemplate,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Patrones de Diseño para Desarrollo de Videojuegos
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Implementa patrones de diseño en tus proyectos de
                    videojuegos.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/generator">
                    <Button size="lg">
                      Explorar Patrones
                      <BookOpen className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  {/* <Link href="/diagram">
                    <Button size="lg" variant="outline">
                      Crear Diagramas
                      <GitFork className="ml-2 h-4 w-4" />
                    </Button>
                  </Link> */}
                </div>
              </div>
              <Image
                alt="Imagen principal mostrando diagrama de patrón de diseño"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height={310}
                src="/placeholder.svg?height=310&width=550"
                width={550}
              />
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Características Principales
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Todo lo que necesitas para comprender e implementar patrones
                  de diseño en tus juegos
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <BookOpen className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Documentación Interactiva</CardTitle>
                  <CardDescription>
                    Guías completas para cada patrón de diseño con ejemplos
                    reales de videojuegos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Aprende sobre patrones creacionales, estructurales y de
                  comportamiento con explicaciones detalladas adaptadas para el
                  desarrollo de videojuegos.
                </CardContent>
                <CardFooter>
                  <Link href="/patterns" className="w-full">
                    <Button className="w-full">Explorar Patrones</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Code2 className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Generación de Código</CardTitle>
                  <CardDescription>
                    Personaliza y genera código para las necesidades específicas
                    de tu juego
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Adapta implementaciones de patrones con tus propios nombres de
                  clases y estructuras, luego exporta directamente a Unity o
                  Godot.
                </CardContent>
                <CardFooter>
                  <Link href="/generator" className="w-full">
                    <Button className="w-full">Generar Código</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <GitFork className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Diagramas de Patrones</CardTitle>
                  <CardDescription>
                    Visualiza y diseña relaciones de patrones con un editor de
                    diagramas interactivo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Crea, guarda y comparte diagramas estilo UML para planificar
                  la arquitectura de tu juego antes de implementarla.
                </CardContent>
                <CardFooter>
                  <Link href="/diagram" className="w-full">
                    <Button className="w-full">Crear Diagramas</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Categorías de Patrones
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explora patrones de diseño organizados por su propósito y uso
                  en el desarrollo de videojuegos
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Tabs defaultValue="creational" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="creational">Creacionales</TabsTrigger>
                  <TabsTrigger value="structural">Estructurales</TabsTrigger>
                  <TabsTrigger value="behavioral">
                    De Comportamiento
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="creational"
                  className="p-4 border rounded-md mt-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/patterns/singleton">
                      <Card className="h-full hover:bg-muted/50 transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Gamepad2 className="mr-2 h-5 w-5" />
                            Singleton
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Asegura que una clase tenga solo una instancia y
                            proporciona un punto de acceso global a ella.
                            Perfecto para gestores de juego y servicios.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href="/patterns/factory-method">
                      <Card className="h-full hover:bg-muted/50 transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Gamepad2 className="mr-2 h-5 w-5" />
                            Factory Method
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Define una interfaz para crear un objeto, pero
                            permite que las subclases decidan qué clase
                            instanciar. Genial para generar enemigos o ítems.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent
                  value="structural"
                  className="p-4 border rounded-md mt-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/patterns/adapter">
                      <Card className="h-full hover:bg-muted/50 transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <LayoutTemplate className="mr-2 h-5 w-5" />
                            Adapter
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Convierte la interfaz de una clase en otra interfaz
                            que los clientes esperan. Útil para integrar
                            sistemas de terceros.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href="/patterns/composite">
                      <Card className="h-full hover:bg-muted/50 transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Layers className="mr-2 h-5 w-5" />
                            Composite
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Compone objetos en estructuras de árbol para
                            representar jerarquías parte-todo. Perfecto para
                            elementos de UI y gráficos de escena.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent
                  value="behavioral"
                  className="p-4 border rounded-md mt-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/patterns/state">
                      <Card className="h-full hover:bg-muted/50 transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <GitFork className="mr-2 h-5 w-5" />
                            State
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Permite que un objeto altere su comportamiento
                            cuando su estado interno cambia. Esencial para
                            controladores de personajes e IA.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href="/patterns/observer">
                      <Card className="h-full hover:bg-muted/50 transition-colors">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <GitFork className="mr-2 h-5 w-5" />
                            Observer
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Define una dependencia de uno a muchos entre objetos
                            para que cuando un objeto cambie de estado, todos
                            sus dependientes sean notificados. Genial para
                            sistemas de eventos.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section> */}
      </main>
      <SiteFooter />
    </div>
  );
}
