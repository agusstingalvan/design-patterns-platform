"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowLeft, CheckCircle, GitFork, Play, Puzzle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function StateMachineExercisePage() {
  const [activeStep, setActiveStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const completeStep = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step])
    }
  }

  const isStepCompleted = (step: number) => {
    return completedSteps.includes(step)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Link href="/exercises">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <GitFork className="h-6 w-6" />
                  State Machine Exercise
                </h1>
                <p className="text-muted-foreground">
                  Build a complete state machine for enemy AI with multiple states and transitions
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-[250px_1fr] gap-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Exercise Steps</CardTitle>
                    <CardDescription>Follow these steps to complete the exercise</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <button
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left ${
                        activeStep === 1 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveStep(1)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
                            isStepCompleted(1) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isStepCompleted(1) ? <CheckCircle className="h-4 w-4" /> : "1"}
                        </span>
                        <span>Introduction</span>
                      </div>
                    </button>
                    <button
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left ${
                        activeStep === 2 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveStep(2)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
                            isStepCompleted(2) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isStepCompleted(2) ? <CheckCircle className="h-4 w-4" /> : "2"}
                        </span>
                        <span>State Interface</span>
                      </div>
                    </button>
                    <button
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left ${
                        activeStep === 3 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveStep(3)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
                            isStepCompleted(3) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isStepCompleted(3) ? <CheckCircle className="h-4 w-4" /> : "3"}
                        </span>
                        <span>Enemy Controller</span>
                      </div>
                    </button>
                    <button
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left ${
                        activeStep === 4 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveStep(4)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
                            isStepCompleted(4) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isStepCompleted(4) ? <CheckCircle className="h-4 w-4" /> : "4"}
                        </span>
                        <span>Patrol State</span>
                      </div>
                    </button>
                    <button
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left ${
                        activeStep === 5 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveStep(5)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
                            isStepCompleted(5) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isStepCompleted(5) ? <CheckCircle className="h-4 w-4" /> : "5"}
                        </span>
                        <span>Chase State</span>
                      </div>
                    </button>
                    <button
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left ${
                        activeStep === 6 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveStep(6)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
                            isStepCompleted(6) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isStepCompleted(6) ? <CheckCircle className="h-4 w-4" /> : "6"}
                        </span>
                        <span>Attack State</span>
                      </div>
                    </button>
                    <button
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left ${
                        activeStep === 7 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveStep(7)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
                            isStepCompleted(7) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isStepCompleted(7) ? <CheckCircle className="h-4 w-4" /> : "7"}
                        </span>
                        <span>Testing</span>
                      </div>
                    </button>
                    <button
                      className={`flex items-center justify-between w-full p-2 rounded-md text-left ${
                        activeStep === 8 ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveStep(8)}
                    >
                      <div className="flex items-center">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 text-xs ${
                            isStepCompleted(8) ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isStepCompleted(8) ? <CheckCircle className="h-4 w-4" /> : "8"}
                        </span>
                        <span>Challenge</span>
                      </div>
                    </button>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{Math.round((completedSteps.length / 8) * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(completedSteps.length / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                    <CardDescription>Helpful materials for this exercise</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/patterns/state" className="flex items-center p-2 hover:bg-muted rounded-md">
                      <GitFork className="h-4 w-4 mr-2" />
                      <span className="text-sm">State Pattern Documentation</span>
                    </Link>
                    <Link href="/diagram?template=state" className="flex items-center p-2 hover:bg-muted rounded-md">
                      <GitFork className="h-4 w-4 mr-2" />
                      <span className="text-sm">State Machine Diagram</span>
                    </Link>
                    <Link href="#" className="flex items-center p-2 hover:bg-muted rounded-md">
                      <Play className="h-4 w-4 mr-2" />
                      <span className="text-sm">Video Tutorial</span>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <div>
                {activeStep === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Introduction to the State Pattern Exercise</CardTitle>
                      <CardDescription>Learn how to implement a state machine for enemy AI</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        In this exercise, you'll implement a complete state machine for an enemy AI in a game. The enemy
                        will have different behaviors based on its current state, and will transition between states
                        based on certain conditions.
                      </p>
                      <div className="space-y-2">
                        <h3 className="font-medium">The states we'll implement are:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>
                            <strong>Patrol State:</strong> The enemy patrols between predefined waypoints
                          </li>
                          <li>
                            <strong>Chase State:</strong> When the player is detected, the enemy chases them
                          </li>
                          <li>
                            <strong>Attack State:</strong> When close enough to the player, the enemy attacks
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">State Transitions:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Patrol → Chase: When player is within detection range</li>
                          <li>Chase → Attack: When player is within attack range</li>
                          <li>Chase → Patrol: When player is out of detection range</li>
                          <li>Attack → Chase: When player moves out of attack range</li>
                        </ul>
                      </div>
                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">Why Use the State Pattern?</h3>
                        <p className="text-sm text-muted-foreground">
                          The State pattern is perfect for this scenario because it allows us to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                          <li>Encapsulate state-specific behavior in separate classes</li>
                          <li>Make state transitions explicit and easy to understand</li>
                          <li>Add new states without modifying existing code</li>
                          <li>Avoid large conditional statements for different behaviors</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => completeStep(1)}>
                        Mark as Completed
                      </Button>
                      <Button onClick={() => setActiveStep(2)}>Next Step</Button>
                    </CardFooter>
                  </Card>
                )}
                {activeStep === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Step 1: Create the State Interface</CardTitle>
                      <CardDescription>Define the contract for all enemy states</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        First, we need to create an interface that all enemy states will implement. This interface
                        defines the methods that every state must have.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">IEnemyState.cs</h3>
                        <pre className="text-sm overflow-x-auto p-2 bg-background rounded-md">
                          {`// State interface
public interface IEnemyState
{
    void EnterState(EnemyController enemy);
    void UpdateState(EnemyController enemy);
    void ExitState(EnemyController enemy);
    void OnTriggerEnter(EnemyController enemy, Collider other);
}`}
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Method Explanations:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>
                            <strong>EnterState:</strong> Called when the enemy enters this state
                          </li>
                          <li>
                            <strong>UpdateState:</strong> Called every frame while in this state
                          </li>
                          <li>
                            <strong>ExitState:</strong> Called when the enemy exits this state
                          </li>
                          <li>
                            <strong>OnTriggerEnter:</strong> Called when a collision is detected
                          </li>
                        </ul>
                      </div>
                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">Your Task:</h3>
                        <p className="text-sm text-muted-foreground">
                          Create the IEnemyState interface with the methods shown above. This interface will be used by
                          all concrete state classes.
                        </p>
                        <div className="mt-4">
                          <Tabs defaultValue="unity">
                            <TabsList>
                              <TabsTrigger value="unity">Unity (C#)</TabsTrigger>
                              <TabsTrigger value="godot">Godot (GDScript)</TabsTrigger>
                            </TabsList>
                            <TabsContent value="unity" className="mt-2">
                              <pre className="text-sm overflow-x-auto p-2 bg-background rounded-md">
                                {`using UnityEngine;

public interface IEnemyState
{
    void EnterState(EnemyController enemy);
    void UpdateState(EnemyController enemy);
    void ExitState(EnemyController enemy);
    void OnTriggerEnter(EnemyController enemy, Collider other);
}`}
                              </pre>
                            </TabsContent>
                            <TabsContent value="godot" className="mt-2">
                              <pre className="text-sm overflow-x-auto p-2 bg-background rounded-md">
                                {`# enemy_state.gd
class_name EnemyState
extends Node

# Virtual methods to be overridden by concrete states
func enter_state(enemy):
    pass

func update_state(enemy, delta):
    pass

func exit_state(enemy):
    pass

func on_body_entered(enemy, body):
    pass`}
                              </pre>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setActiveStep(1)}>
                          Previous
                        </Button>
                        <Button variant="outline" onClick={() => completeStep(2)}>
                          Mark as Completed
                        </Button>
                      </div>
                      <Button onClick={() => setActiveStep(3)}>Next Step</Button>
                    </CardFooter>
                  </Card>
                )}
                {/* Additional steps would be implemented similarly */}
                {activeStep > 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Step {activeStep - 1}:{" "}
                        {activeStep === 3
                          ? "Create the Enemy Controller"
                          : activeStep === 4
                            ? "Implement the Patrol State"
                            : activeStep === 5
                              ? "Implement the Chase State"
                              : activeStep === 6
                                ? "Implement the Attack State"
                                : activeStep === 7
                                  ? "Test the State Machine"
                                  : "Complete the Challenge"}
                      </CardTitle>
                      <CardDescription>
                        {activeStep === 3
                          ? "Create the context class that will use the states"
                          : activeStep === 4
                            ? "Implement the patrol behavior for the enemy"
                            : activeStep === 5
                              ? "Implement the chase behavior for the enemy"
                              : activeStep === 6
                                ? "Implement the attack behavior for the enemy"
                                : activeStep === 7
                                  ? "Verify that all states work correctly"
                                  : "Add a new state to the state machine"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {activeStep === 3 && (
                        <>
                          <p>
                            Now we need to create the EnemyController class that will use our state machine. This class
                            will:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Hold a reference to the current state</li>
                            <li>Provide methods to change states</li>
                            <li>Delegate behavior to the current state</li>
                            <li>Store data that states need to access</li>
                          </ul>
                          <div className="bg-muted p-4 rounded-md">
                            <h3 className="font-medium mb-2">EnemyController.cs</h3>
                            <pre className="text-sm overflow-x-auto p-2 bg-background rounded-md">
                              {`using UnityEngine;

// Context class
public class EnemyController : MonoBehaviour
{
    // References to all possible states
    private EnemyPatrolState patrolState;
    private EnemyChaseState chaseState;
    private EnemyAttackState attackState;
    
    // Current state
    private IEnemyState currentState;
    
    // Enemy properties
    public float moveSpeed = 3f;
    public float chaseSpeed = 5f;
    public float detectionRange = 5f;
    public float attackRange = 1.5f;
    public Transform target;
    public Transform[] patrolPoints;
    
    private void Awake()
    {
        // Initialize states
        patrolState = new EnemyPatrolState();
        chaseState = new EnemyChaseState();
        attackState = new EnemyAttackState();
    }
    
    private void Start()
    {
        // Set initial state
        ChangeState(patrolState);
    }
    
    private void Update()
    {
        if (currentState != null)
        {
            currentState.UpdateState(this);
        }
    }
    
    private void OnTriggerEnter(Collider other)
    {
        if (currentState != null)
        {
            currentState.OnTriggerEnter(this, other);
        }
    }
    
    // Method to change states
    public void ChangeState(IEnemyState newState)
    {
        // Exit current state
        if (currentState != null)
        {
            currentState.ExitState(this);
        }
        
        // Change to new state
        currentState = newState;
        
        // Enter new state
        if (currentState != null)
        {
            currentState.EnterState(this);
        }
    }
    
    // State change methods
    public void SetPatrolState()
    {
        ChangeState(patrolState);
    }
    
    public void SetChaseState()
    {
        ChangeState(chaseState);
    }
    
    public void SetAttackState()
    {
        ChangeState(attackState);
    }
    
    // Helper methods that states can use
    public float GetDistanceToTarget()
    {
        if (target == null)
            return Mathf.Infinity;
            
        return Vector3.Distance(transform.position, target.position);
    }
}`}
                            </pre>
                          </div>
                        </>
                      )}
                      {activeStep === 4 && (
                        <>
                          <p>
                            Now let's implement the Patrol State. In this state, the enemy will move between predefined
                            patrol points.
                          </p>
                          <div className="bg-muted p-4 rounded-md">
                            <h3 className="font-medium mb-2">EnemyPatrolState.cs</h3>
                            <pre className="text-sm overflow-x-auto p-2 bg-background rounded-md">
                              {`using UnityEngine;

// Concrete state
public class EnemyPatrolState : IEnemyState
{
    private int currentPatrolIndex = 0;
    
    public void EnterState(EnemyController enemy)
    {
        Debug.Log("Entering Patrol State");
        // Animation or visual feedback
    }
    
    public void UpdateState(EnemyController enemy)
    {
        Patrol(enemy);
        
        // Check for transitions
        if (enemy.GetDistanceToTarget() <= enemy.detectionRange)
        {
            enemy.SetChaseState();
        }
    }
    
    public void ExitState(EnemyController enemy)
    {
        Debug.Log("Exiting Patrol State");
    }
    
    public void OnTriggerEnter(EnemyController enemy, Collider other)
    {
        // Handle collisions if needed
    }
    
    private void Patrol(EnemyController enemy)
    {
        if (enemy.patrolPoints.Length == 0)
            return;
            
        Transform targetPoint = enemy.patrolPoints[currentPatrolIndex];
        
        // Move towards patrol point
        Vector3 direction = (targetPoint.position - enemy.transform.position).normalized;
        enemy.transform.position += direction * enemy.moveSpeed * Time.deltaTime;
        
        // Rotate towards movement direction
        if (direction != Vector3.zero)
        {
            enemy.transform.rotation = Quaternion.LookRotation(direction);
        }
        
        // Check if reached patrol point
        if (Vector3.Distance(enemy.transform.position, targetPoint.position) < 0.1f)
        {
            // Move to next patrol point
            currentPatrolIndex = (currentPatrolIndex + 1) % enemy.patrolPoints.Length;
        }
    }
}`}
                            </pre>
                          </div>
                        </>
                      )}
                      {activeStep === 5 && (
                        <>
                          <p>
                            Next, let's implement the Chase State. In this state, the enemy will chase the player when
                            they are detected.
                          </p>
                          <div className="bg-muted p-4 rounded-md">
                            <h3 className="font-medium mb-2">EnemyChaseState.cs</h3>
                            <pre className="text-sm overflow-x-auto p-2 bg-background rounded-md">
                              {`using UnityEngine;

// Concrete state
public class EnemyChaseState : IEnemyState
{
    public void EnterState(EnemyController enemy)
    {
        Debug.Log("Entering Chase State");
        // Animation or visual feedback
    }
    
    public void UpdateState(EnemyController enemy)
    {
        ChaseTarget(enemy);
        
        // Check for transitions
        float distanceToTarget = enemy.GetDistanceToTarget();
        
        if (distanceToTarget <= enemy.attackRange)
        {
            enemy.SetAttackState();
        }
        else if (distanceToTarget > enemy.detectionRange * 1.5f)
        {
            enemy.SetPatrolState();
        }
    }
    
    public void ExitState(EnemyController enemy)
    {
        Debug.Log("Exiting Chase State");
    }
    
    public void OnTriggerEnter(EnemyController enemy, Collider other)
    {
        // Handle collisions if needed
    }
    
    private void ChaseTarget(EnemyController enemy)
    {
        if (enemy.target == null)
            return;
            
        // Move towards target
        Vector3 direction = (enemy.target.position - enemy.transform.position).normalized;
        enemy.transform.position += direction * enemy.chaseSpeed * Time.deltaTime;
        
        // Rotate towards target
        if (direction != Vector3.zero)
        {
            enemy.transform.rotation = Quaternion.LookRotation(direction);
        }
    }
}`}
                            </pre>
                          </div>
                        </>
                      )}
                      {activeStep === 6 && (
                        <>
                          <p>
                            Finally, let's implement the Attack State. In this state, the enemy will attack the player
                            when they are within range.
                          </p>
                          <div className="bg-muted p-4 rounded-md">
                            <h3 className="font-medium mb-2">EnemyAttackState.cs</h3>
                            <pre className="text-sm overflow-x-auto p-2 bg-background rounded-md">
                              {`using UnityEngine;

// Concrete state
public class EnemyAttackState : IEnemyState
{
    private float attackTimer = 0f;
    private float attackCooldown = 1.5f;
    
    public void EnterState(EnemyController enemy)
    {
        Debug.Log("Entering Attack State");
        attackTimer = 0f;
        // Animation or visual feedback
    }
    
    public void UpdateState(EnemyController enemy)
    {
        FaceTarget(enemy);
        
        // Attack logic
        attackTimer += Time.deltaTime;
        if (attackTimer >= attackCooldown)
        {
            Attack(enemy);
            attackTimer = 0f;
        }
        
        // Check for transitions
        float distanceToTarget = enemy.GetDistanceToTarget();
        
        if (distanceToTarget > enemy.attackRange)
        {
            enemy.SetChaseState();
        }
    }
    
    public void ExitState(EnemyController enemy)
    {
        Debug.Log("Exiting Attack State");
    }
    
    public void OnTriggerEnter(EnemyController enemy, Collider other)
    {
        // Handle collisions if needed
    }
    
    private void FaceTarget(EnemyController enemy)
    {
        if (enemy.target == null)
            return;
            
        Vector3 direction = (enemy.target.position - enemy.transform.position).normalized;
        direction.y = 0; // Keep on same Y plane
        
        if (direction != Vector3.zero)
        {
            enemy.transform.rotation = Quaternion.LookRotation(direction);
        }
    }
    
    private void Attack(EnemyController enemy)
    {
        Debug.Log("Enemy attacks!");
        
        // Implement attack logic here
        // This could be:
        // - Spawning a projectile
        // - Activating a weapon collider
        // - Applying damage to the target
        // - Playing attack animation
    }
}`}
                            </pre>
                          </div>
                        </>
                      )}
                      {activeStep === 7 && (
                        <>
                          <p>
                            Now that we have implemented all the states, let's test our state machine to make sure it
                            works correctly.
                          </p>
                          <div className="space-y-4">
                            <div className="bg-muted p-4 rounded-md">
                              <h3 className="font-medium mb-2">Testing Steps:</h3>
                              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                                <li>Create an enemy GameObject in your scene</li>
                                <li>Attach the EnemyController script to it</li>
                                <li>Set up patrol points in the scene</li>
                                <li>Assign the patrol points to the enemy's patrolPoints array</li>
                                <li>Create a player GameObject and assign it as the enemy's target</li>
                                <li>Run the game and observe the enemy's behavior</li>
                              </ol>
                            </div>
                            <div className="bg-muted p-4 rounded-md">
                              <h3 className="font-medium mb-2">Expected Behavior:</h3>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                <li>The enemy should start in the Patrol state, moving between patrol points</li>
                                <li>
                                  When the player gets within detectionRange, the enemy should switch to Chase state
                                </li>
                                <li>
                                  When the player gets within attackRange, the enemy should switch to Attack state
                                </li>
                                <li>
                                  When the player moves out of attackRange, the enemy should switch back to Chase state
                                </li>
                                <li>
                                  When the player moves out of detectionRange, the enemy should switch back to Patrol
                                  state
                                </li>
                              </ul>
                            </div>
                            <div className="bg-muted p-4 rounded-md">
                              <h3 className="font-medium mb-2">Debugging Tips:</h3>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                <li>Use Debug.Log statements to track state transitions</li>
                                <li>Visualize detection and attack ranges using Gizmos</li>
                                <li>Check that patrol points are set up correctly</li>
                                <li>Verify that the target reference is assigned</li>
                              </ul>
                            </div>
                          </div>
                        </>
                      )}
                      {activeStep === 8 && (
                        <>
                          <p>
                            Now for the challenge! Let's extend our state machine by adding a new state: the Retreat
                            state.
                          </p>
                          <div className="space-y-4">
                            <div className="bg-muted p-4 rounded-md">
                              <h3 className="font-medium mb-2">Challenge Requirements:</h3>
                              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                                <li>Create a new EnemyRetreatState class that implements IEnemyState</li>
                                <li>In this state, the enemy should move away from the player to a safe distance</li>
                                <li>Add a health property to the EnemyController</li>
                                <li>
                                  When the enemy's health drops below a certain threshold, it should transition to the
                                  Retreat state
                                </li>
                                <li>
                                  After retreating to a safe distance, the enemy should transition back to the Patrol
                                  state
                                </li>
                              </ol>
                            </div>
                            <div className="bg-muted p-4 rounded-md">
                              <h3 className="font-medium mb-2">Hints:</h3>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                <li>To move away from the player, use the opposite direction vector</li>
                                <li>Add a "safe distance" property to determine when to stop retreating</li>
                                <li>Add a TakeDamage method to the EnemyController to reduce health</li>
                                <li>Consider adding a healing mechanism during retreat</li>
                              </ul>
                            </div>
                            <div className="bg-muted p-4 rounded-md">
                              <h3 className="font-medium mb-2">Starter Code:</h3>
                              <pre className="text-sm overflow-x-auto p-2 bg-background rounded-md">
                                {`using UnityEngine;

public class EnemyRetreatState : IEnemyState
{
    private float safeDistance = 10f;
    
    public void EnterState(EnemyController enemy)
    {
        Debug.Log("Entering Retreat State");
        // TODO: Add retreat initialization
    }
    
    public void UpdateState(EnemyController enemy)
    {
        // TODO: Implement retreat behavior
        
        // TODO: Add transition back to patrol when safe
    }
    
    public void ExitState(EnemyController enemy)
    {
        Debug.Log("Exiting Retreat State");
    }
    
    public void OnTriggerEnter(EnemyController enemy, Collider other)
    {
        // Handle collisions if needed
    }
}`}
                              </pre>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setActiveStep(activeStep - 1)}>
                          Previous
                        </Button>
                        <Button variant="outline" onClick={() => completeStep(activeStep)}>
                          Mark as Completed
                        </Button>
                      </div>
                      {activeStep < 8 ? (
                        <Button onClick={() => setActiveStep(activeStep + 1)}>Next Step</Button>
                      ) : (
                        <Button>
                          <Puzzle className="mr-2 h-4 w-4" />
                          Submit Solution
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

