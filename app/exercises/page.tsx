import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Award, BookOpen, CheckCircle, Code2, GitFork, Trophy } from "lucide-react"

export default function ExercisesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Interactive Exercises</h1>
              <p className="text-muted-foreground">
                Practice implementing design patterns with guided exercises and challenges
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <Card className="w-full sm:w-64">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Completion</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Creational Patterns</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Structural Patterns</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Behavioral Patterns</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                        <span className="text-sm font-medium">Achievements</span>
                      </div>
                      <span className="text-sm font-medium">5/20</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="text-sm font-medium">Badges</span>
                      </div>
                      <span className="text-sm font-medium">3/12</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <div className="flex-1">
                <Tabs defaultValue="beginner" className="w-full">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="beginner">Beginner</TabsTrigger>
                    <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  </TabsList>
                  <TabsContent value="beginner" className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <GitFork className="mr-2 h-5 w-5" />
                              Singleton Basics
                            </CardTitle>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <CardDescription>Create a simple game manager singleton</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Learn how to implement a basic singleton pattern for a game manager class.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">Creational</span>
                            <span className="bg-muted px-2 py-1 rounded-full">15 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Exercise
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <GitFork className="mr-2 h-5 w-5" />
                              Factory Method
                            </CardTitle>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <CardDescription>Create an enemy spawning system</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Implement a factory method pattern to create different types of enemies.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">Creational</span>
                            <span className="bg-muted px-2 py-1 rounded-full">20 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Exercise
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <GitFork className="mr-2 h-5 w-5" />
                              Observer Pattern
                            </CardTitle>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <CardDescription>Build a simple event system</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create a basic event system using the observer pattern for game notifications.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">Behavioral</span>
                            <span className="bg-muted px-2 py-1 rounded-full">25 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Exercise
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <GitFork className="mr-2 h-5 w-5" />
                              State Pattern
                            </CardTitle>
                          </div>
                          <CardDescription>Implement a character state machine</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create a simple state machine for a character with idle, walk, and jump states.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">Behavioral</span>
                            <span className="bg-muted px-2 py-1 rounded-full">30 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Exercise
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <GitFork className="mr-2 h-5 w-5" />
                              Adapter Pattern
                            </CardTitle>
                          </div>
                          <CardDescription>Create an input adapter system</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Build an adapter to standardize different input methods (keyboard, gamepad, touch).
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full">Structural</span>
                            <span className="bg-muted px-2 py-1 rounded-full">25 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Exercise
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
                          </div>
                          <CardDescription>Implement a simple command system</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create a command pattern for handling player actions with undo functionality.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">Behavioral</span>
                            <span className="bg-muted px-2 py-1 rounded-full">35 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Exercise
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="intermediate" className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <GitFork className="mr-2 h-5 w-5" />
                              Strategy Pattern
                            </CardTitle>
                          </div>
                          <CardDescription>Build an AI behavior system</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Implement different AI strategies that can be swapped at runtime.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">Behavioral</span>
                            <span className="bg-muted px-2 py-1 rounded-full">40 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Exercise
                          </Button>
                        </CardFooter>
                      </Card>
                      {/* More intermediate exercises would go here */}
                    </div>
                  </TabsContent>
                  <TabsContent value="advanced" className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <GitFork className="mr-2 h-5 w-5" />
                              Entity Component System
                            </CardTitle>
                          </div>
                          <CardDescription>Build a complete ECS framework</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Implement a full Entity Component System architecture for game objects.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">Advanced</span>
                            <span className="bg-muted px-2 py-1 rounded-full">90 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Start Exercise
                          </Button>
                        </CardFooter>
                      </Card>
                      {/* More advanced exercises would go here */}
                    </div>
                  </TabsContent>
                  <TabsContent value="challenges" className="mt-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center">
                              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                              Pattern Mashup
                            </CardTitle>
                          </div>
                          <CardDescription>Combine multiple patterns in one system</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create a system that uses at least 3 different design patterns working together.
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">Challenge</span>
                            <span className="bg-muted px-2 py-1 rounded-full">120 min</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <Code2 className="mr-2 h-4 w-4" />
                            Start Challenge
                          </Button>
                        </CardFooter>
                      </Card>
                      {/* More challenges would go here */}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-6 border-t">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Featured Exercise</h2>
              <p className="text-muted-foreground">Try our recommended exercise for this week</p>
            </div>
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <GitFork className="mr-2 h-5 w-5" />
                    Implementing a Robust State Machine
                  </CardTitle>
                  <span className="text-xs font-medium bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <CardDescription>
                  Build a complete state machine for enemy AI with multiple states and transitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      In this exercise, you'll implement a comprehensive state machine for enemy AI in a game. You'll
                      create states for patrolling, chasing, attacking, and retreating, with smooth transitions between
                      them based on various conditions.
                    </p>
                    <div className="space-y-2">
                      <h3 className="font-medium">You'll learn:</h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>How to structure a robust state machine</li>
                        <li>Implementing state transitions with conditions</li>
                        <li>Handling state-specific behaviors</li>
                        <li>Creating reusable state components</li>
                        <li>Testing and debugging state machines</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-accent/10 text-accent px-2 py-1 rounded-full">Behavioral</span>
                      <span className="bg-muted px-2 py-1 rounded-full">60 min</span>
                      <span className="bg-orange-500/10 text-orange-600 px-2 py-1 rounded-full">Intermediate</span>
                    </div>
                  </div>
                  <div className="bg-muted rounded-md p-4">
                    <h3 className="font-medium mb-2">Exercise Preview</h3>
                    <pre className="text-xs overflow-x-auto p-2 bg-background rounded-md">
                      {`// State interface
public interface IEnemyState
{
    void EnterState(EnemyController enemy);
    void UpdateState(EnemyController enemy);
    void ExitState(EnemyController enemy);
}

// Example patrol state implementation
public class PatrolState : IEnemyState
{
    public void EnterState(EnemyController enemy)
    {
        // TODO: Initialize patrol behavior
    }
    
    public void UpdateState(EnemyController enemy)
    {
        // TODO: Implement patrol logic and transitions
    }
    
    public void ExitState(EnemyController enemy)
    {
        // TODO: Clean up patrol state
    }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span>Earn the "State Master" badge</span>
                  </div>
                </div>
                <Button>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start Featured Exercise
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

