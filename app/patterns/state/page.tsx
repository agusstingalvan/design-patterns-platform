import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowLeft, Code2, GitFork } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function StatePatternPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Link href="/patterns">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <GitFork className="h-6 w-6" />
                  State Pattern
                </h1>
                <p className="text-muted-foreground">
                  Allow an object to alter its behavior when its internal state
                  changes
                </p>
              </div>
            </div>
            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="diagram">Diagram</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    What is the State Pattern?
                  </h2>
                  <p>
                    The State pattern is a behavioral design pattern that allows
                    an object to change its behavior when its internal state
                    changes. The pattern encapsulates state-specific behavior
                    into separate state classes and delegates behavior to the
                    current state object.
                  </p>
                  <p>
                    This pattern is particularly valuable in game development,
                    where objects frequently need to change their behavior based
                    on their current state, such as characters transitioning
                    between idle, walking, running, jumping, or attacking
                    states.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">When to Use It</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      When an object's behavior depends on its state, and it
                      must change its behavior at runtime depending on that
                      state
                    </li>
                    <li>
                      When operations have large, multipart conditional
                      statements that depend on the object's state
                    </li>
                    <li>When state transitions are explicit and complex</li>
                    <li>
                      When you want to avoid a proliferation of state-specific
                      if/else or switch statements throughout your code
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Common Use Cases in Games
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Character Controllers</h3>
                      <p className="text-sm text-muted-foreground">
                        Managing player or NPC states like idle, walking,
                        running, jumping, attacking, and taking damage.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Enemy AI</h3>
                      <p className="text-sm text-muted-foreground">
                        Controlling enemy behavior states such as patrolling,
                        chasing, attacking, and retreating.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Game Flow</h3>
                      <p className="text-sm text-muted-foreground">
                        Managing game states like menu, playing, paused, game
                        over, and victory screens.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Interactive Objects</h3>
                      <p className="text-sm text-muted-foreground">
                        Controlling states of doors (locked, unlocked, opening,
                        closing), switches, and other interactive elements.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Advantages and Disadvantages
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-bold">Advantages</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          Eliminates conditional statements for state-specific
                          behavior
                        </li>
                        <li>
                          Organizes state-specific code into separate classes
                        </li>
                        <li>Makes state transitions explicit</li>
                        <li>
                          Makes adding new states easier without changing
                          existing state classes
                        </li>
                        <li>
                          Simplifies code by removing large switch statements
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold">Disadvantages</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>
                          Can be overkill for simple state management with few
                          states
                        </li>
                        <li>Increases the number of classes in your project</li>
                        <li>Requires careful planning of state transitions</li>
                        <li>
                          May introduce complexity if states share common
                          behavior
                        </li>
                        <li>Can be challenging to debug state transitions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    State Pattern vs. State Machines
                  </h2>
                  <p>
                    The State pattern is often used to implement a Finite State
                    Machine (FSM) in object-oriented programming. While an FSM
                    defines the states and transitions, the State pattern
                    provides a way to implement this in code by encapsulating
                    each state's behavior in a separate class.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">State Pattern</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Object-oriented implementation approach</li>
                        <li>Encapsulates state behavior in classes</li>
                        <li>Focuses on behavior delegation</li>
                        <li>
                          States can be added/modified without changing context
                        </li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">State Machine</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Conceptual model of states and transitions</li>
                        <li>Can be implemented in various ways</li>
                        <li>Focuses on state transitions</li>
                        <li>
                          Often implemented with enums and switch statements
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="implementation" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Implementation in Unity (C#)
                  </h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        IEnemyState.cs
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
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
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        EnemyController.cs
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
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
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        EnemyPatrolState.cs
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
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
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        EnemyChaseState.cs
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
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
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        EnemyAttackState.cs
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
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
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Implementation in Godot (GDScript)
                  </h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        enemy_state.gd (Abstract State)
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`# Abstract state class
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
                  </div>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        enemy_controller.gd (Context)
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`extends KinematicBody

# Enemy properties
export var move_speed = 3.0
export var chase_speed = 5.0
export var detection_range = 5.0
export var attack_range = 1.5
export(NodePath) var target_path
export(Array, NodePath) var patrol_points_paths

# State variables
var current_state = null
var patrol_state = null
var chase_state = null
var attack_state = null

# References
var target = null
var patrol_points = []

func _ready():
    # Get references
    if target_path:
        target = get_node(target_path)
    
    for path in patrol_points_paths:
        patrol_points.append(get_node(path))
    
    # Initialize states
    patrol_state = load("res://enemy_patrol_state.gd").new()
    chase_state = load("res://enemy_chase_state.gd").new()
    attack_state = load("res://enemy_attack_state.gd").new()
    
    # Set initial state
    change_state(patrol_state)

func _process(delta):
    if current_state:
        current_state.update_state(self, delta)

func _on_DetectionArea_body_entered(body):
    if current_state:
        current_state.on_body_entered(self, body)

# Method to change states
func change_state(new_state):
    # Exit current state
    if current_state:
        current_state.exit_state(self)
    
    # Change to new state
    current_state = new_state
    
    # Enter new state
    if current_state:
        current_state.enter_state(self)

# State change methods
func set_patrol_state():
    change_state(patrol_state)

func set_chase_state():
    change_state(chase_state)

func set_attack_state():
    change_state(attack_state)

# Helper methods
func get_distance_to_target():
    if not target:
        return INF
    
    return global_transform.origin.distance_to(target.global_transform.origin)`}
                    </pre>
                  </div>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        enemy_patrol_state.gd
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`extends EnemyState

var current_patrol_index = 0

func enter_state(enemy):
    print("Entering Patrol State")
    # Animation or visual feedback

func update_state(enemy, delta):
    patrol(enemy, delta)
    
    # Check for transitions
    if enemy.get_distance_to_target() <= enemy.detection_range:
        enemy.set_chase_state()

func exit_state(enemy):
    print("Exiting Patrol State")

func on_body_entered(enemy, body):
    # Handle collisions if needed
    pass

func patrol(enemy, delta):
    if enemy.patrol_points.size() == 0:
        return
    
    var target_point = enemy.patrol_points[current_patrol_index]
    
    # Calculate direction to patrol point
    var direction = (target_point.global_transform.origin - enemy.global_transform.origin).normalized()
    
    # Move towards patrol point
    enemy.move_and_slide(direction * enemy.move_speed)
    
    # Rotate towards movement direction
    if direction != Vector3.ZERO:
        enemy.look_at(enemy.global_transform.origin + direction, Vector3.UP)
    
    # Check if reached patrol point
    if enemy.global_transform.origin.distance_to(target_point.global_transform.origin) < 0.1:
        # Move to next patrol point
        current_patrol_index = (current_patrol_index + 1) % enemy.patrol_points.size()`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Key Implementation Considerations
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">State Interface</h3>
                      <p className="text-sm text-muted-foreground">
                        Define a clear interface for all states with methods for
                        entering, updating, and exiting the state, as well as
                        handling events.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">Context Class</h3>
                      <p className="text-sm text-muted-foreground">
                        The context class (e.g., EnemyController) maintains a
                        reference to the current state and delegates
                        state-specific behavior to it.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">State Transitions</h3>
                      <p className="text-sm text-muted-foreground">
                        Clearly define when and how state transitions occur.
                        States can trigger transitions themselves, or the
                        context can handle them.
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold mb-2">State Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Decide whether state-specific data should be stored in
                        the state classes or in the context class, based on your
                        specific needs.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="examples" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Player Character State Machine
                  </h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        PlayerStateMachine.cs (Unity)
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerStateMachine : MonoBehaviour
{
    // State interface
    public interface IPlayerState
    {
        void Enter();
        void Update();
        void FixedUpdate();
        void Exit();
    }
    
    // References
    [SerializeField] private Animator animator;
    [SerializeField] private Rigidbody rb;
    
    // Movement parameters
    [SerializeField] private float walkSpeed = 3f;
    [SerializeField] private float runSpeed = 7f;
    [SerializeField] private float jumpForce = 5f;
    
    // Input values
    private Vector2 moveInput;
    private bool jumpPressed;
    private bool sprintPressed;
    
    // Ground check
    [SerializeField] private Transform groundCheck;
    [SerializeField] private float groundDistance = 0.2f;
    [SerializeField] private LayerMask groundMask;
    
    // State variables
    private IPlayerState currentState;
    
    // States
    private IdleState idleState;
    private WalkState walkState;
    private RunState runState;
    private JumpState jumpState;
    private FallState fallState;
    
    // Public properties
    public Vector2 MoveInput => moveInput;
    public bool JumpPressed => jumpPressed;
    public bool SprintPressed => sprintPressed;
    public Animator Animator => animator;
    public Rigidbody Rigidbody => rb;
    public float WalkSpeed => walkSpeed;
    public float RunSpeed => runSpeed;
    public float JumpForce => jumpForce;
    
    private void Awake()
    {
        // Initialize states
        idleState = new IdleState(this);
        walkState = new WalkState(this);
        runState = new RunState(this);
        jumpState = new JumpState(this);
        fallState = new FallState(this);
    }
    
    private void Start()
    {
        // Set initial state
        ChangeState(idleState);
    }
    
    private void Update()
    {
        // Check for falling
        if (currentState != fallState && !IsGrounded() && rb.velocity.y < -0.1f)
        {
            ChangeState(fallState);
        }
        
        // Update current state
        currentState?.Update();
    }
    
    private void FixedUpdate()
    {
        currentState?.FixedUpdate();
    }
    
    // State change method
    public void ChangeState(IPlayerState newState)
    {
        currentState?.Exit();
        currentState = newState;
        currentState?.Enter();
    }
    
    // Input methods
    public void OnMove(InputAction.CallbackContext context)
    {
        moveInput = context.ReadValue<Vector2>();
    }
    
    public void OnJump(InputAction.CallbackContext context)
    {
        if (context.performed)
        {
            jumpPressed = true;
        }
        else if (context.canceled)
        {
            jumpPressed = false;
        }
    }
    
    public void OnSprint(InputAction.CallbackContext context)
    {
        if (context.performed)
        {
            sprintPressed = true;
        }
        else if (context.canceled)
        {
            sprintPressed = false;
        }
    }
    
    // Helper methods
    public bool IsGrounded()
    {
        return Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
    }
    
    // Concrete state classes
    private class IdleState : IPlayerState
    {
        private PlayerStateMachine player;
        
        public IdleState(PlayerStateMachine player)
        {
            this.player = player;
        }
        
        public void Enter()
        {
            player.Animator.SetBool("IsMoving", false);
        }
        
        public void Update()
        {
            // Check for state transitions
            if (player.MoveInput.magnitude > 0.1f)
            {
                if (player.SprintPressed)
                {
                    player.ChangeState(player.runState);
                }
                else
                {
                    player.ChangeState(player.walkState);
                }
            }
            
            if (player.JumpPressed && player.IsGrounded())
            {
                player.ChangeState(player.jumpState);
            }
        }
        
        public void FixedUpdate()
        {
            // No movement in idle
        }
        
        public void Exit()
        {
            // Clean up
        }
    }
    
    private class WalkState : IPlayerState
    {
        private PlayerStateMachine player;
        
        public WalkState(PlayerStateMachine player)
        {
            this.player = player;
        }
        
        public void Enter()
        {
            player.Animator.SetBool("IsMoving", true);
            player.Animator.SetBool("IsRunning", false);
        }
        
        public void Update()
        {
            // Check for state transitions
            if (player.MoveInput.magnitude < 0.1f)
            {
                player.ChangeState(player.idleState);
            }
            else if (player.SprintPressed)
            {
                player.ChangeState(player.runState);
            }
            
            if (player.JumpPressed && player.IsGrounded())
            {
                player.ChangeState(player.jumpState);
            }
        }
        
        public void FixedUpdate()
        {
            // Calculate movement direction
            Vector3 direction = new Vector3(player.MoveInput.x, 0, player.MoveInput.y).normalized;
            
            // Move the player
            player.Rigidbody.MovePosition(player.Rigidbody.position + direction * player.WalkSpeed * Time.fixedDeltaTime);
            
            // Rotate the player
            if (direction != Vector3.zero)
            {
                Quaternion targetRotation = Quaternion.LookRotation(direction);
                player.transform.rotation = Quaternion.Slerp(player.transform.rotation, targetRotation, 10f * Time.fixedDeltaTime);
            }
        }
        
        public void Exit()
        {
            // Clean up
        }
    }
    
    private class RunState : IPlayerState
    {
        private PlayerStateMachine player;
        
        public RunState(PlayerStateMachine player)
        {
            this.player = player;
        }
        
        public void Enter()
        {
            player.Animator.SetBool("IsMoving", true);
            player.Animator.SetBool("IsRunning", true);
        }
        
        public void Update()
        {
            // Check for state transitions
            if (player.MoveInput.magnitude < 0.1f)
            {
                player.ChangeState(player.idleState);
            }
            else if (!player.SprintPressed)
            {
                player.ChangeState(player.walkState);
            }
            
            if (player.JumpPressed && player.IsGrounded())
            {
                player.ChangeState(player.jumpState);
            }
        }
        
        public void FixedUpdate()
        {
            // Calculate movement direction
            Vector3 direction = new Vector3(player.MoveInput.x, 0, player.MoveInput.y).normalized;
            
            // Move the player
            player.Rigidbody.MovePosition(player.Rigidbody.position + direction * player.RunSpeed * Time.fixedDeltaTime);
            
            // Rotate the player
            if (direction != Vector3.zero)
            {
                Quaternion targetRotation = Quaternion.LookRotation(direction);
                player.transform.rotation = Quaternion.Slerp(player.transform.rotation, targetRotation, 10f * Time.fixedDeltaTime);
            }
        }
        
        public void Exit()
        {
            // Clean up
        }
    }
    
    private class JumpState : IPlayerState
    {
        private PlayerStateMachine player;
        
        public JumpState(PlayerStateMachine player)
        {
            this.player = player;
        }
        
        public void Enter()
        {
            player.Animator.SetTrigger("Jump");
            
            // Apply jump force
            player.Rigidbody.AddForce(Vector3.up * player.JumpForce, ForceMode.Impulse);
        }
        
        public void Update()
        {
            // Check for state transitions
            if (player.Rigidbody.velocity.y < 0)
            {
                player.ChangeState(player.fallState);
            }
        }
        
        public void FixedUpdate()
        {
            // Allow horizontal movement while jumping
            Vector3 direction = new Vector3(player.MoveInput.x, 0, player.MoveInput.y).normalized;
            Vector3 horizontalVelocity = direction * player.WalkSpeed;
            player.Rigidbody.velocity = new Vector3(horizontalVelocity.x, player.Rigidbody.velocity.y, horizontalVelocity.z);
        }
        
        public void Exit()
        {
            // Clean up
        }
    }
    
    private class FallState : IPlayerState
    {
        private PlayerStateMachine player;
        
        public FallState(PlayerStateMachine player)
        {
            this.player = player;
        }
        
        public void Enter()
        {
            player.Animator.SetBool("IsFalling", true);
        }
        
        public void Update()
        {
            // Check for state transitions
            if (player.IsGrounded())
            {
                if (player.MoveInput.magnitude > 0.1f)
                {
                    if (player.SprintPressed)
                    {
                        player.ChangeState(player.runState);
                    }
                    else
                    {
                        player.ChangeState(player.walkState);
                    }
                }
                else
                {
                    player.ChangeState(player.idleState);
                }
            }
        }
        
        public void FixedUpdate()
        {
            // Allow horizontal movement while falling
            Vector3 direction = new Vector3(player.MoveInput.x, 0, player.MoveInput.y).normalized;
            Vector3 horizontalVelocity = direction * player.WalkSpeed;
            player.Rigidbody.velocity = new Vector3(horizontalVelocity.x, player.Rigidbody.velocity.y, horizontalVelocity.z);
        }
        
        public void Exit()
        {
            player.Animator.SetBool("IsFalling", false);
        }
    }
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Game State Manager</h2>
                  <div className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        GameStateManager.cs (Unity)
                      </h3>
                      <Button variant="ghost" size="sm">
                        Copy Code
                      </Button>
                    </div>
                    <pre className="text-sm overflow-x-auto p-2 bg-muted rounded-md">
                      {`using UnityEngine;
using UnityEngine.SceneManagement;

public class GameStateManager : MonoBehaviour
{
    // Singleton instance
    private static GameStateManager _instance;
    
    public static GameStateManager Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = FindObjectOfType<GameStateManager>();
                
                if (_instance == null)
                {
                    GameObject obj = new GameObject("GameStateManager");
                    _instance = obj.AddComponent<GameStateManager>();
                }
            }
            
            return _instance;
        }
    }
    
    // State interface
    public interface IGameState
    {
        void EnterState();
        void UpdateState();
        void ExitState();
    }
    
    // References
    [SerializeField] private GameObject mainMenuUI;
    [SerializeField] private GameObject gameplayUI;
    [SerializeField] private GameObject pauseMenuUI;
    [SerializeField] private GameObject gameOverUI;
    [SerializeField] private GameObject victoryUI;
    
    // Current state
    private IGameState currentState;
    
    // States
    private MainMenuState mainMenuState;
    private GameplayState gameplayState;
    private PausedState pausedState;
    private GameOverState gameOverState;
    private VictoryState victoryState;
    
    // Game data
    public int CurrentLevel { get; private set; }
    public int Score { get; private set; }
    
    private void Awake()
    {
        // Singleton pattern
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        _instance = this;
        DontDestroyOnLoad(gameObject);
        
        // Initialize states
        mainMenuState = new MainMenuState(this);
        gameplayState = new GameplayState(this);
        pausedState = new PausedState(this);
        gameOverState = new GameOverState(this);
        victoryState = new VictoryState(this);
        
        // Initialize UI
        HideAllUI();
    }
    
    private void Start()
    {
        // Set initial state based on current scene
        if (SceneManager.GetActiveScene().name == "MainMenu")
        {
            ChangeState(mainMenuState);
        }
        else
        {
            ChangeState(gameplayState);
        }
    }
    
    private void Update()
    {
        currentState?.UpdateState();
    }
    
    // State change method
    public void ChangeState(IGameState newState)
    {
        currentState?.ExitState();
        currentState = newState;
        currentState?.EnterState();
    }
    
    // UI methods
    private void HideAllUI()
    {
        if (mainMenuUI) mainMenuUI.SetActive(false);
        if (gameplayUI) gameplayUI.SetActive(false);
        if (pauseMenuUI) pauseMenuUI.SetActive(false);
        if (gameOverUI) gameOverUI.SetActive(false);
        if (victoryUI) victoryUI.SetActive(false);
    }
    
    // Game state methods
    public void StartGame()
    {
        CurrentLevel = 1;
        Score = 0;
        LoadLevel(CurrentLevel);
        ChangeState(gameplayState);
    }
    
    public void PauseGame()
    {
        ChangeState(pausedState);
    }
    
    public void ResumeGame()
    {
        ChangeState(gameplayState);
    }
    
    public void GameOver()
    {
        ChangeState(gameOverState);
    }
    
    public void Victory()
    {
        ChangeState(victoryState);
    }
    
    public void ReturnToMainMenu()
    {
        SceneManager.LoadScene("MainMenu");
        ChangeState(mainMenuState);
    }
    
    public void AddScore(int points)
    {
        Score += points;
    }
    
    public void NextLevel()
    {
        CurrentLevel++;
        LoadLevel(CurrentLevel);
        ChangeState(gameplayState);
    }
    
    private void LoadLevel(int level)
    {
        SceneManager.LoadScene("Level" + level);
    }
    
    // Concrete state classes
    private class MainMenuState : IGameState
    {
        private GameStateManager manager;
        
        public MainMenuState(GameStateManager manager)
        {
            this.manager = manager;
        }
        
        public void EnterState()
        {
            // Show main menu UI
            manager.HideAllUI();
            if (manager.mainMenuUI) manager.mainMenuUI.SetActive(true);
            
            // Set time scale to normal
            Time.timeScale = 1f;
        }
        
        public void UpdateState()
        {
            // Handle main menu logic
        }
        
        public void ExitState()
        {
            // Hide main menu UI
            if (manager.mainMenuUI) manager.mainMenuUI.SetActive(false);
        }
    }
    
    private class GameplayState : IGameState
    {
        private GameStateManager manager;
        
        public GameplayState(GameStateManager manager)
        {
            this.manager = manager;
        }
        
        public void EnterState()
        {
            // Show gameplay UI
            manager.HideAllUI();
            if (manager.gameplayUI) manager.gameplayUI.SetActive(true);
            
            // Set time scale to normal
            Time.timeScale = 1f;
        }
        
        public void UpdateState()
        {
            // Check for pause input
            if (Input.GetKeyDown(KeyCode.Escape))
            {
                manager.PauseGame();
            }
        }
        
        public void ExitState()
        {
            // Hide gameplay UI
            if (manager.gameplayUI) manager.gameplayUI.SetActive(false);
        }
    }
    
    private class PausedState : IGameState
    {
        private GameStateManager manager;
        
        public PausedState(GameStateManager manager)
        {
            this.manager = manager;
        }
        
        public void EnterState()
        {
            // Show pause menu UI
            manager.HideAllUI();
            if (manager.pauseMenuUI) manager.pauseMenuUI.SetActive(true);
            
            // Pause the game
            Time.timeScale = 0f;
        }
        
        public void UpdateState()
        {
            // Check for resume input
            if (Input.GetKeyDown(KeyCode.Escape))
            {
                manager.ResumeGame();
            }
        }
        
        public void ExitState()
        {
            // Hide pause menu UI
            if (manager.pauseMenuUI) manager.pauseMenuUI.SetActive(false);
        }
    }
    
    private class GameOverState : IGameState
    {
        private GameStateManager manager;
        
        public GameOverState(GameStateManager manager)
        {
            this.manager = manager;
        }
        
        public void EnterState()
        {
            // Show game over UI
            manager.HideAllUI();
            if (manager.gameOverUI) manager.gameOverUI.SetActive(true);
            
            // Slow down time
            Time.timeScale = 0.5f;
        }
        
        public void UpdateState()
        {
            // Handle game over logic
        }
        
        public void ExitState()
        {
            // Hide game over UI
            if (manager.gameOverUI) manager.gameOverUI.SetActive(false);
            
            // Reset time scale
            Time.timeScale = 1f;
        }
    }
    
    private class VictoryState : IGameState
    {
        private GameStateManager manager;
        
        public VictoryState(GameStateManager manager)
        {
            this.manager = manager;
        }
        
        public void EnterState()
        {
            // Show victory UI
            manager.HideAllUI();
            if (manager.victoryUI) manager.victoryUI.SetActive(true);
        }
        
        public void UpdateState()
        {
            // Handle victory logic
        }
        
        public void ExitState()
        {
            // Hide victory UI
            if (manager.victoryUI) manager.victoryUI.SetActive(false);
        }
    }
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="diagram" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    State Pattern Structure
                  </h2>
                  <div className="border rounded-lg p-6 bg-muted/30 flex justify-center">
                    <div className="max-w-lg">
                      <svg
                        viewBox="0 0 600 400"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full"
                      >
                        {/* Context */}
                        <rect
                          x="250"
                          y="50"
                          width="120"
                          height="80"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="310"
                          y="80"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          Context
                        </text>
                        <line
                          x1="250"
                          y1="90"
                          x2="370"
                          y2="90"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="260"
                          y="110"
                          dominantBaseline="middle"
                          fontSize="14"
                        >
                          - state: State
                        </text>

                        {/* State Interface */}
                        <rect
                          x="250"
                          y="200"
                          width="120"
                          height="80"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="310"
                          y="230"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          State
                        </text>
                        <line
                          x1="250"
                          y1="240"
                          x2="370"
                          y2="240"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="260"
                          y="260"
                          dominantBaseline="middle"
                          fontSize="14"
                        >
                          + Handle()
                        </text>

                        {/* Concrete States */}
                        <rect
                          x="100"
                          y="320"
                          width="120"
                          height="60"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="160"
                          y="350"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          ConcreteStateA
                        </text>
                        <line
                          x1="100"
                          y1="360"
                          x2="220"
                          y2="360"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="110"
                          y="380"
                          dominantBaseline="middle"
                          fontSize="14"
                        >
                          + Handle()
                        </text>

                        <rect
                          x="250"
                          y="320"
                          width="120"
                          height="60"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="310"
                          y="350"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          ConcreteStateB
                        </text>
                        <line
                          x1="250"
                          y1="360"
                          x2="370"
                          y2="360"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="260"
                          y="380"
                          dominantBaseline="middle"
                          fontSize="14"
                        >
                          + Handle()
                        </text>

                        <rect
                          x="400"
                          y="320"
                          width="120"
                          height="60"
                          rx="5"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="460"
                          y="350"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          ConcreteStateC
                        </text>
                        <line
                          x1="400"
                          y1="360"
                          x2="520"
                          y2="360"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="410"
                          y="380"
                          dominantBaseline="middle"
                          fontSize="14"
                        >
                          + Handle()
                        </text>

                        {/* Connections */}
                        <line
                          x1="310"
                          y1="130"
                          x2="310"
                          y2="190"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="310,200 305,190 315,190"
                          fill="currentColor"
                        />

                        <line
                          x1="160"
                          y1="280"
                          x2="160"
                          y2="310"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="160,320 155,310 165,310"
                          fill="currentColor"
                        />

                        <line
                          x1="310"
                          y1="280"
                          x2="310"
                          y2="310"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="310,320 305,310 315,310"
                          fill="currentColor"
                        />

                        <line
                          x1="460"
                          y1="280"
                          x2="460"
                          y2="310"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="460,320 455,310 465,310"
                          fill="currentColor"
                        />

                        <path
                          d="M 250,240 C 180,240 180,280 160,280"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M 310,280 C 310,280 310,280 310,280"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M 370,240 C 440,240 440,280 460,280"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    State Transition Diagram
                  </h2>
                  <div className="border rounded-lg p-6 bg-muted/30 flex justify-center">
                    <div className="max-w-lg">
                      <svg
                        viewBox="0 0 600 300"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full"
                      >
                        {/* States */}
                        <circle
                          cx="100"
                          cy="150"
                          r="40"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="100"
                          y="150"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          Idle
                        </text>

                        <circle
                          cx="300"
                          cy="150"
                          r="40"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="300"
                          y="150"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          Walk
                        </text>

                        <circle
                          cx="500"
                          cy="150"
                          r="40"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="500"
                          y="150"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          Run
                        </text>

                        <circle
                          cx="200"
                          cy="50"
                          r="40"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="200"
                          y="50"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          Jump
                        </text>

                        <circle
                          cx="400"
                          cy="50"
                          r="40"
                          fill="white"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <text
                          x="400"
                          y="50"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          Fall
                        </text>

                        {/* Transitions */}
                        <path
                          d="M 140,150 C 180,150 220,150 260,150"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="260,150 250,145 250,155"
                          fill="currentColor"
                        />
                        <text
                          x="200"
                          y="140"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Move
                        </text>

                        <path
                          d="M 260,150 C 220,150 180,150 140,150"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="140,150 150,145 150,155"
                          fill="currentColor"
                        />
                        <text
                          x="200"
                          y="170"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Stop
                        </text>

                        <path
                          d="M 340,150 C 380,150 420,150 460,150"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="460,150 450,145 450,155"
                          fill="currentColor"
                        />
                        <text
                          x="400"
                          y="140"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Sprint
                        </text>

                        <path
                          d="M 460,150 C 420,150 380,150 340,150"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="340,150 350,145 350,155"
                          fill="currentColor"
                        />
                        <text
                          x="400"
                          y="170"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Release Sprint
                        </text>

                        <path
                          d="M 100,110 C 100,80 150,50 160,50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="160,50 155,60 165,55"
                          fill="currentColor"
                        />
                        <text
                          x="120"
                          y="70"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Jump
                        </text>

                        <path
                          d="M 300,110 C 300,80 250,50 240,50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="240,50 245,60 235,55"
                          fill="currentColor"
                        />
                        <text
                          x="260"
                          y="70"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Jump
                        </text>

                        <path
                          d="M 500,110 C 500,80 450,50 440,50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="440,50 445,60 435,55"
                          fill="currentColor"
                        />
                        <text
                          x="460"
                          y="70"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Jump
                        </text>

                        <path
                          d="M 240,50 C 280,50 320,50 360,50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="360,50 350,45 350,55"
                          fill="currentColor"
                        />
                        <text
                          x="300"
                          y="40"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Falling
                        </text>

                        <path
                          d="M 380,90 C 350,120 330,140 300,150"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="300,150 310,145 305,135"
                          fill="currentColor"
                        />
                        <text
                          x="330"
                          y="110"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Land + Move
                        </text>

                        <path
                          d="M 420,90 C 450,120 470,140 500,150"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="500,150 490,145 495,135"
                          fill="currentColor"
                        />
                        <text
                          x="470"
                          y="110"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Land + Sprint
                        </text>

                        <path
                          d="M 370,80 C 300,120 200,120 130,120"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polygon
                          points="130,120 140,125 135,115"
                          fill="currentColor"
                        />
                        <text
                          x="250"
                          y="100"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                        >
                          Land + No Input
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Enemy AI State Machine Example
                  </h2>
                  <div className="border rounded-lg p-6 bg-muted/30 flex justify-center">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      width={500}
                      height={300}
                      alt="Enemy AI State Machine Diagram"
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Interactive Diagram</h2>
                  <p>
                    Use our diagram editor to create your own implementation of
                    the State pattern for your specific game needs.
                  </p>
                  {/* <Link href="/diagram?template=state">
                    <Button>
                      <GitFork className="mr-2 h-4 w-4" />
                      Open in Diagram Editor
                    </Button>
                  </Link> */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
