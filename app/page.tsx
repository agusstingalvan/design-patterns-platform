import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code2, Gamepad2, GitFork, Layers, LayoutTemplate } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

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
                    Design Patterns for Game Development
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Learn, visualize, and implement design patterns in your game projects with interactive examples and
                    code generation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/patterns">
                    <Button size="lg">
                      Explore Patterns
                      <BookOpen className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/diagram">
                    <Button size="lg" variant="outline">
                      Create Diagrams
                      <GitFork className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                alt="Hero image showing design pattern diagram"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height={310}
                src="/placeholder.svg?height=310&width=550"
                width={550}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to understand and implement design patterns in your games
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <BookOpen className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Interactive Documentation</CardTitle>
                  <CardDescription>
                    Comprehensive guides for each design pattern with real-world game examples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Learn about creational, structural, and behavioral patterns with detailed explanations tailored for
                  game development.
                </CardContent>
                <CardFooter>
                  <Link href="/patterns" className="w-full">
                    <Button className="w-full">Browse Patterns</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Code2 className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Code Generation</CardTitle>
                  <CardDescription>Customize and generate code for your specific game needs</CardDescription>
                </CardHeader>
                <CardContent>
                  Adapt pattern implementations with your own class names and structures, then export directly to Unity
                  or Godot.
                </CardContent>
                <CardFooter>
                  <Link href="/generator" className="w-full">
                    <Button className="w-full">Generate Code</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <GitFork className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Pattern Diagramming</CardTitle>
                  <CardDescription>
                    Visualize and design pattern relationships with an interactive diagram editor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Create, save, and share UML-style diagrams to plan your game architecture before implementation.
                </CardContent>
                <CardFooter>
                  <Link href="/diagram" className="w-full">
                    <Button className="w-full">Create Diagrams</Button>
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pattern Categories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore design patterns organized by their purpose and usage in game development
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Tabs defaultValue="creational" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="creational">Creational</TabsTrigger>
                  <TabsTrigger value="structural">Structural</TabsTrigger>
                  <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                </TabsList>
                <TabsContent value="creational" className="p-4 border rounded-md mt-4">
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
                            Ensure a class has only one instance and provide a global point of access to it. Perfect for
                            game managers and services.
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
                            Define an interface for creating an object, but let subclasses decide which class to
                            instantiate. Great for enemy or item spawning.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="structural" className="p-4 border rounded-md mt-4">
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
                            Convert the interface of a class into another interface clients expect. Useful for
                            integrating third-party systems.
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
                            Compose objects into tree structures to represent part-whole hierarchies. Perfect for UI
                            elements and scene graphs.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="behavioral" className="p-4 border rounded-md mt-4">
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
                            Allow an object to alter its behavior when its internal state changes. Essential for
                            character controllers and AI.
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
                            Define a one-to-many dependency between objects so that when one object changes state, all
                            its dependents are notified. Great for event systems.
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

