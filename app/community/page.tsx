import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookOpen, Code2, GitFork, Heart, MessageSquare, Share2, ThumbsUp, User } from "lucide-react"
import Image from "next/image"

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Community</h1>
              <p className="text-muted-foreground">
                Share and discover design pattern implementations from the game development community
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-[300px]">
                <Input type="search" placeholder="Search implementations..." className="w-full pl-8" />
                <BookOpen className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex gap-2">
                <Button>
                  <Code2 className="mr-2 h-4 w-4" />
                  Share Implementation
                </Button>
                <Button variant="outline">
                  <GitFork className="mr-2 h-4 w-4" />
                  Share Diagram
                </Button>
              </div>
            </div>
            <Tabs defaultValue="popular" className="mt-4">
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="unity">Unity</TabsTrigger>
                <TabsTrigger value="godot">Godot</TabsTrigger>
                <TabsTrigger value="unreal">Unreal</TabsTrigger>
              </TabsList>
              <TabsContent value="popular" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          Advanced State Machine
                        </CardTitle>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Unity
                        </span>
                      </div>
                      <CardDescription>A flexible state machine implementation with event handling</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        This implementation includes support for hierarchical states, state history, and event-driven
                        transitions.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>128</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>24</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>GameDevPro</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Code2 className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          Object Pool Manager
                        </CardTitle>
                        <span className="text-xs font-medium bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                          Godot
                        </span>
                      </div>
                      <CardDescription>Efficient object pooling for better performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        A complete object pooling system that pre-instantiates objects and recycles them to avoid
                        garbage collection.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>96</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>18</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>GodotMaster</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Code2 className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          Component System
                        </CardTitle>
                        <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                          Unreal
                        </span>
                      </div>
                      <CardDescription>Modular component architecture for game entities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        A flexible component system that allows for easy composition of game entities with reusable
                        behaviors.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>84</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>12</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>UnrealDev</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Code2 className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          Event System
                        </CardTitle>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Unity
                        </span>
                      </div>
                      <CardDescription>Decoupled event-based communication system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        A robust event system that allows game objects to communicate without direct references to each
                        other.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>76</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>15</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>CodeWizard</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Code2 className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          Command Pattern
                        </CardTitle>
                        <span className="text-xs font-medium bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                          Godot
                        </span>
                      </div>
                      <CardDescription>Input handling with undo/redo support</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        A command pattern implementation that encapsulates actions and supports undo/redo functionality.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>68</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>9</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>PatternPro</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Code2 className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          Save System
                        </CardTitle>
                        <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-1 rounded-full">
                          Unreal
                        </span>
                      </div>
                      <CardDescription>Serialization system for game state persistence</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        A complete save/load system that handles serialization of game state to disk with encryption
                        support.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>62</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>8</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>SaveMaster</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Code2 className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="recent" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Similar card structure as above but with different content */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GitFork className="mr-2 h-5 w-5" />
                          Behavior Tree
                        </CardTitle>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Unity
                        </span>
                      </div>
                      <CardDescription>Lightweight behavior tree for AI decision making</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        A simple but powerful behavior tree implementation for creating complex AI behaviors.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>12</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>3</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>AIExpert</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Code2 className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  {/* More recent cards would go here */}
                </div>
              </TabsContent>
              <TabsContent value="unity" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{/* Unity-specific implementations */}</div>
              </TabsContent>
              <TabsContent value="godot" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{/* Godot-specific implementations */}</div>
              </TabsContent>
              <TabsContent value="unreal" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{/* Unreal-specific implementations */}</div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="container py-6 border-t">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Featured Diagrams</h2>
              <p className="text-muted-foreground">Visual representations of design patterns shared by the community</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <GitFork className="mr-2 h-5 w-5" />
                      Entity Component System
                    </CardTitle>
                  </div>
                  <CardDescription>Visual diagram of an ECS architecture</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="ECS Diagram"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>45</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>ArchitectGuru</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <GitFork className="mr-2 h-4 w-4" />
                    View Diagram
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <GitFork className="mr-2 h-5 w-5" />
                      Observer Pattern Flow
                    </CardTitle>
                  </div>
                  <CardDescription>Event system implementation using Observer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="Observer Pattern Diagram"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>38</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>PatternMaster</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <GitFork className="mr-2 h-4 w-4" />
                    View Diagram
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <GitFork className="mr-2 h-5 w-5" />
                      State Machine Transitions
                    </CardTitle>
                  </div>
                  <CardDescription>Complex state machine with nested states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="State Machine Diagram"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>32</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>StateMachineWizard</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <GitFork className="mr-2 h-4 w-4" />
                    View Diagram
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

