import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, GitFork, Layers, LayoutTemplate, Search } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PatternsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Design Patterns</h1>
              <p className="text-muted-foreground">Browse and learn about design patterns for game development</p>
            </div>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search patterns..." className="w-full pl-8" />
              </div>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All Patterns</TabsTrigger>
              <TabsTrigger value="creational">Creational</TabsTrigger>
              <TabsTrigger value="structural">Structural</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/patterns/singleton">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Gamepad2 className="mr-2 h-5 w-5" />
                          Singleton
                        </CardTitle>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Creational
                        </span>
                      </div>
                      <CardDescription>Ensure a class has only one instance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Perfect for game managers, audio systems, and other services that should exist as a single
                        instance.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/patterns/factory-method">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Gamepad2 className="mr-2 h-5 w-5" />
                          Factory Method
                        </CardTitle>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Creational
                        </span>
                      </div>
                      <CardDescription>Define an interface for creating objects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Useful for enemy spawning, item creation, and level generation with different implementations.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/patterns/adapter">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <LayoutTemplate className="mr-2 h-5 w-5" />
                          Adapter
                        </CardTitle>
                        <span className="text-xs font-medium bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                          Structural
                        </span>
                      </div>
                      <CardDescription>Convert interfaces to work together</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Integrate third-party systems or legacy code with your game's architecture seamlessly.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/patterns/composite">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Layers className="mr-2 h-5 w-5" />
                          Composite
                        </CardTitle>
                        <span className="text-xs font-medium bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                          Structural
                        </span>
                      </div>
                      <CardDescription>Compose objects into tree structures</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Ideal for UI hierarchies, scene graphs, and skill trees with nested components.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/patterns/state">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          State
                        </CardTitle>
                        <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                          Behavioral
                        </span>
                      </div>
                      <CardDescription>Alter behavior when internal state changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Essential for character controllers, enemy AI, and game state management with clean transitions.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/patterns/observer">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          Observer
                        </CardTitle>
                        <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                          Behavioral
                        </span>
                      </div>
                      <CardDescription>Define one-to-many dependency between objects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Create event systems, achievement trackers, and UI updates that respond to game state changes.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="creational" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/patterns/singleton">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gamepad2 className="mr-2 h-5 w-5" />
                        Singleton
                      </CardTitle>
                      <CardDescription>Ensure a class has only one instance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Perfect for game managers, audio systems, and other services that should exist as a single
                        instance.
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
                      <CardDescription>Define an interface for creating objects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Useful for enemy spawning, item creation, and level generation with different implementations.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="structural" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/patterns/adapter">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LayoutTemplate className="mr-2 h-5 w-5" />
                        Adapter
                      </CardTitle>
                      <CardDescription>Convert interfaces to work together</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Integrate third-party systems or legacy code with your game's architecture seamlessly.
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
                      <CardDescription>Compose objects into tree structures</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Ideal for UI hierarchies, scene graphs, and skill trees with nested components.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="behavioral" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/patterns/state">
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GitFork className="mr-2 h-5 w-5" />
                        State
                      </CardTitle>
                      <CardDescription>Alter behavior when internal state changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Essential for character controllers, enemy AI, and game state management with clean transitions.
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
                      <CardDescription>Define one-to-many dependency between objects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Create event systems, achievement trackers, and UI updates that respond to game state changes.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

