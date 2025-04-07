"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Check,
  ClipboardCopy,
  Code2,
  Download,
  Gamepad2,
  RefreshCw,
  Plus,
  Minus,
  Archive,
  GitFork,
} from "lucide-react";
import { useState, useEffect } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import Link from "next/link";

export default function GeneratorPage() {
  const [pattern, setPattern] = useState("singleton");
  const [engine, setEngine] = useState("unity");
  const [className, setClassName] = useState("GameManager");
  const [activeFile, setActiveFile] = useState("main");
  const [copied, setCopied] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<{
    [key: string]: string;
  }>({});
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});

  // Options for patterns
  const [lazyInit, setLazyInit] = useState(false);
  const [threadSafe, setThreadSafe] = useState(false);
  const [hierarchicalStates, setHierarchicalStates] = useState(false);
  const [eventDriven, setEventDriven] = useState(false);
  const [abstractFactory, setAbstractFactory] = useState(false);

  // Unity callback methods
  const [callbackMethods, setCallbackMethods] = useState([
    {
      name: "OnTriggerEnter",
      enabled: true,
      paramType: "Collider",
      paramName: "other",
    },
    {
      name: "OnCollisionEnter",
      enabled: false,
      paramType: "Collision",
      paramName: "collision",
    },
    {
      name: "HandleEvent",
      enabled: false,
      paramType: "object",
      paramName: "eventData",
    },
  ]);

  // State pattern specific
  const [states, setStates] = useState([
    { name: "Idle", enabled: true },
    { name: "Move", enabled: true },
    { name: "Action", enabled: true },
  ]);

  // Generate code when pattern, engine, className, or options change
  useEffect(() => {
    generateCode();
  }, [
    pattern,
    engine,
    className,
    lazyInit,
    threadSafe,
    hierarchicalStates,
    eventDriven,
    abstractFactory,
    callbackMethods,
    states,
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedFiles[activeFile] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([generatedFiles[activeFile] || ""], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, fileNames[activeFile] || "file.txt");
  };

  const handleDownloadAll = async () => {
    try {
      const zip = new JSZip();

      // Add each file to the zip
      Object.keys(generatedFiles).forEach((key) => {
        if (fileNames[key]) {
          zip.file(fileNames[key], generatedFiles[key] || "");
        }
      });

      // Generate the zip file and trigger download
      const content = await zip.generateAsync({ type: "blob" });
      FileSaver.saveAs(content, `${pattern}-${engine}-${className}.zip`);
    } catch (error) {
      console.error("Error creating zip file:", error);
      alert("Error creating zip file. Please try again.");
    }
  };

  const addState = () => {
    setStates([
      ...states,
      { name: `State${states.length + 1}`, enabled: true },
    ]);
  };

  const removeState = (index: number) => {
    const newStates = [...states];
    newStates.splice(index, 1);
    setStates(newStates);
  };

  const updateStateName = (index: number, name: string) => {
    const newStates = [...states];
    newStates[index].name = name;
    setStates(newStates);
  };

  const toggleStateEnabled = (index: number) => {
    const newStates = [...states];
    newStates[index].enabled = !newStates[index].enabled;
    setStates(newStates);
  };

  const getEnabledStates = () => {
    return states.filter((state) => state.enabled);
  };

  const addCallbackMethod = () => {
    setCallbackMethods([
      ...callbackMethods,
      {
        name: `CustomCallback${callbackMethods.length + 1}`,
        enabled: true,
        paramType: "object",
        paramName: "data",
      },
    ]);
  };

  const removeCallbackMethod = (index: number) => {
    const newCallbacks = [...callbackMethods];
    newCallbacks.splice(index, 1);
    setCallbackMethods(newCallbacks);
  };

  const updateCallbackMethod = (
    index: number,
    field: string,
    value: string
  ) => {
    const newCallbacks = [...callbackMethods];
    newCallbacks[index] = { ...newCallbacks[index], [field]: value };
    setCallbackMethods(newCallbacks);
  };

  const toggleCallbackEnabled = (index: number) => {
    const newCallbacks = [...callbackMethods];
    newCallbacks[index].enabled = !newCallbacks[index].enabled;
    setCallbackMethods(newCallbacks);
  };

  const getEnabledCallbacks = () => {
    return callbackMethods.filter((callback) => callback.enabled);
  };

  const generateDiagramUrl = () => {
    let diagramType = "";
    let templateParam = "";

    if (pattern === "singleton") {
      diagramType = "singleton";
    } else if (pattern === "state") {
      diagramType = "state";
    } else if (pattern === "factory") {
      diagramType = "factory";
    }

    if (diagramType) {
      templateParam = `template=${diagramType}`;
    }

    // Add additional parameters for customization
    const params = new URLSearchParams();
    if (templateParam) params.append("template", diagramType);
    params.append("className", className);

    if (pattern === "state" && states.length > 0) {
      const stateNames = getEnabledStates()
        .map((s) => s.name)
        .join(",");
      params.append("states", stateNames);
    }

    return `/diagram?${params.toString()}`;
  };

  const generateCode = () => {
    const files: { [key: string]: string } = {};
    const names: { [key: string]: string } = {};

    if (pattern === "singleton") {
      if (engine === "unity") {
        // Main singleton class
        const singletonCode = `using UnityEngine;

public class ${className} : MonoBehaviour
{
    private static ${className} _instance;
    ${threadSafe ? "private static readonly object _lock = new object();" : ""}
    
    public static ${className} Instance
    {
        get
        {
            ${
              lazyInit
                ? `if (_instance == null)
            {
                ${threadSafe ? "lock (_lock)\n                {" : ""}
                _instance = FindObjectOfType<${className}>();
                
                if (_instance == null)
                {
                    GameObject obj = new GameObject("${className}");
                    _instance = obj.AddComponent<${className}>();
                }
                ${threadSafe ? "}" : ""}
            }`
                : ""
            }
            
            return _instance;
        }
    }
    
    private void Awake()
    {
        if (_instance != null && _instance != this)
        {
            Destroy(gameObject);
            return;
        }
        
        _instance = this;
        DontDestroyOnLoad(gameObject);
        
        ${
          !lazyInit
            ? "// Initialize singleton instance on Awake\nInitialize();"
            : ""
        }
    }
    
    ${
      lazyInit
        ? '// Called when the singleton is first accessed\nprivate void Initialize()\n{\n    // Add initialization code here\n    Debug.Log("${className} initialized");\n}'
        : ""
    }
    
    // Add your singleton functionality below
    public void ExampleMethod()
    {
        Debug.Log("${className} singleton method called!");
    }
}`;
        files.main = singletonCode;
        names.main = `${className}.cs`;
      } else if (engine === "godot") {
        const singletonCode = `extends Node

class_name ${className}

# Singleton instance
static var _instance = null
${threadSafe ? "static var _mutex = Mutex.new()" : ""}

# Static getter for the singleton
static func get_instance():
    ${threadSafe ? "_mutex.lock()" : ""}
    if _instance == null:
        _instance = ${className}.new()
    ${threadSafe ? "_mutex.unlock()" : ""}
    return _instance

func _init():
    if _instance != null:
        printerr("${className} singleton already exists. Use get_instance() instead.")
    else:
        _instance = self
        ${!lazyInit ? "# Initialize singleton on creation\ninitialize()" : ""}

${
  lazyInit
    ? '# Called when the singleton is first accessed\nfunc initialize():\n    # Add initialization code here\n    print("${className} initialized")'
    : ""
}

# Add your singleton functionality below
func example_method():
    print("${className} singleton method called!")
`;
        files.main = singletonCode;
        names.main = `${className.toLowerCase()}.gd`;
      } else if (engine === "unreal") {
        // Header file
        const headerCode = `#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "${className}.generated.h"

UCLASS()
class YOURGAME_API A${className} : public AActor
{
    GENERATED_BODY()
    
public:    
    // Sets default values for this actor's properties
    A${className}();

    // Static getter for the singleton instance
    UFUNCTION(BlueprintCallable, Category = "${className}")
    static A${className}* GetInstance();
    
    // Example method
    UFUNCTION(BlueprintCallable, Category = "${className}")
    void ExampleMethod();

protected:
    // Called when the game starts or when spawned
    virtual void BeginPlay() override;
    
private:
    // Static instance of the singleton
    static A${className}* Instance;
    ${
      threadSafe
        ? "// Critical section for thread safety\nstatic FCriticalSection CriticalSection;"
        : ""
    }
    
    ${lazyInit ? "// Initialize the singleton\nvoid Initialize();" : ""}
};`;
        files.header = headerCode;
        names.header = `${className}.h`;

        // Implementation file
        const implCode = `#include "${className}.h"
#include "Kismet/GameplayStatics.h"

// Initialize static instance to nullptr
A${className}* A${className}::Instance = nullptr;
${
  threadSafe
    ? "// Initialize critical section\nFCriticalSection A${className}::CriticalSection;"
    : ""
}

// Sets default values
A${className}::A${className}()
{
    // Set this actor to call Tick() every frame
    PrimaryActorTick.bCanEverTick = true;
}

// Called when the game starts or when spawned
void A${className}::BeginPlay()
{
    Super::BeginPlay();
    
    // If an instance already exists and it's not this, destroy this
    if (Instance && Instance != this)
    {
        Destroy();
        return;
    }
    
    // Set the static instance to this
    Instance = this;
    
    // Make sure this actor persists between level loads
    SetActorTickEnabled(true);
    SetActorHiddenInGame(true);
    
    ${
      !lazyInit
        ? "// Initialize singleton instance on BeginPlay\nInitialize();"
        : ""
    }
}

// Static getter for the singleton instance
A${className}* A${className}::GetInstance()
{
    ${
      threadSafe
        ? "// Lock critical section for thread safety\nFScopeLock Lock(&CriticalSection);"
        : ""
    }
    
    // If the instance doesn't exist, try to find it in the world
    if (!Instance)
    {
        UWorld* World = GEngine->GetWorldFromContextObject(nullptr, EGetWorldErrorMode::LogAndReturnNull);
        if (World)
        {
            // Find the first instance in the world
            Instance = Cast<A${className}>(UGameplayStatics::GetActorOfClass(World, A${className}::StaticClass()));
            
            // If still not found, spawn a new one
            if (!Instance && World)
            {
                FActorSpawnParameters SpawnParams;
                SpawnParams.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
                Instance = World->SpawnActor<A${className}>(A${className}::StaticClass(), FVector::ZeroVector, FRotator::ZeroRotator, SpawnParams);
            }
        }
    }
    
    return Instance;
}

${
  lazyInit
    ? `// Initialize the singleton
void A${className}::Initialize()
{
    // Add initialization code here
    UE_LOG(LogTemp, Log, TEXT("${className} initialized"));
}`
    : ""
}

// Example method
void A${className}::ExampleMethod()
{
    UE_LOG(LogTemp, Log, TEXT("${className} singleton method called!"));
}`;
        files.implementation = implCode;
        names.implementation = `${className}.cpp`;

        // Set active file to header for Unreal
        setActiveFile("header");
      }
    } else if (pattern === "state") {
      const enabledStates = getEnabledStates();
      const enabledCallbacks = getEnabledCallbacks();

      if (engine === "unity") {
        // Interface file
        const callbackMethodsCode = enabledCallbacks
          .map(
            (callback) =>
              `    void ${callback.name}(${className}Controller context, ${callback.paramType} ${callback.paramName});`
          )
          .join("\n");

        const interfaceCode = `using UnityEngine;

// State interface
public interface I${className}State
{
    void EnterState(${className}Controller context);
    void UpdateState(${className}Controller context);
    void ExitState(${className}Controller context);
${callbackMethodsCode ? callbackMethodsCode : ""}
}`;
        files.interface = interfaceCode;
        names.interface = `I${className}State.cs`;

        // Controller file
        const controllerStateDeclarations = enabledStates
          .map(
            (state) =>
              `    private ${className}${
                state.name
              }State ${state.name.toLowerCase()}State;`
          )
          .join("\n");

        const controllerStateInitializations = enabledStates
          .map(
            (state) =>
              `        ${state.name.toLowerCase()}State = new ${className}${
                state.name
              }State();`
          )
          .join("\n");

        const controllerStateMethods = enabledStates
          .map(
            (state) =>
              `    public void Set${state.name}State()
    {
        ChangeState(${state.name.toLowerCase()}State);
    }`
          )
          .join("\n\n");

        const callbackImplementations = enabledCallbacks
          .map((callback) => {
            return `    ${
              callback.name === "HandleEvent" ? "public" : "private"
            } void ${callback.name}(${callback.paramType} ${callback.paramName})
    {
        if (currentState != null)
        {
            currentState.${callback.name}(this, ${callback.paramName});
        }
    }`;
          })
          .join("\n\n");

        const controllerCode = `using UnityEngine;

// Context class
public class ${className}Controller : MonoBehaviour
{
    // References to all possible states
${controllerStateDeclarations}
    
    // Current state
    private I${className}State currentState;
    ${
      hierarchicalStates
        ? "// Parent state for hierarchical state machine\nprivate I${className}State parentState;"
        : ""
    }
    
    // Properties
    public float moveSpeed = 3f;
    public float actionRange = 1.5f;
    public Transform target;
    
    private void Awake()
    {
        // Initialize states
${controllerStateInitializations}
    }
    
    private void Start()
    {
        // Set initial state
        ChangeState(${
          enabledStates.length > 0
            ? enabledStates[0].name.toLowerCase() + "State"
            : "null"
        });
    }
    
    private void Update()
    {
        if (currentState != null)
        {
            currentState.UpdateState(this);
            ${
              hierarchicalStates
                ? "// Update parent state if it exists\nif (parentState != null)\n{\n    parentState.UpdateState(this);\n}"
                : ""
            }
        }
    }
    
${callbackImplementations}
    
    // Method to change states
    public void ChangeState(I${className}State newState)
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
    
    ${
      hierarchicalStates
        ? `// Set parent state for hierarchical state machine
    public void SetParentState(I${className}State newParentState)
    {
        if (parentState != null)
        {
            parentState.ExitState(this);
        }
        
        parentState = newParentState;
        
        if (parentState != null)
        {
            parentState.EnterState(this);
        }
    }`
        : ""
    }
    
    // State change methods
${controllerStateMethods}
    
    // Helper methods that states can use
    public float GetDistanceToTarget()
    {
        if (target == null)
            return Mathf.Infinity;
            
        return Vector3.Distance(transform.position, target.position);
    }
}`;
        files.controller = controllerCode;
        names.controller = `${className}Controller.cs`;

        // Generate state files for each enabled state
        enabledStates.forEach((state) => {
          const callbackMethodsImplementation = enabledCallbacks
            .map((callback) => {
              return `    public void ${
                callback.name
              }(${className}Controller context, ${callback.paramType} ${
                callback.paramName
              })
    {
        // Handle ${callback.name.toLowerCase()} events
    }`;
            })
            .join("\n\n");

          let stateLogic = "";
          if (state.name.toLowerCase() === "idle") {
            stateLogic = `    private float idleTimer = 0f;
    private float idleDuration = 3f;
    
    public void EnterState(${className}Controller context)
    {
        Debug.Log("Entering ${state.name} State");
        idleTimer = 0f;
        // Animation or visual feedback
    }
    
    public void UpdateState(${className}Controller context)
    {
        // Idle behavior
        idleTimer += Time.deltaTime;
        
        // Check for transitions
        if (idleTimer >= idleDuration)
        {
            ${
              enabledStates.find((s) => s.name.toLowerCase() === "move")
                ? `context.SetMoveState();`
                : "// Transition to next state"
            }
            return;
        }
        
        if (context.GetDistanceToTarget() <= context.actionRange)
        {
            ${
              enabledStates.find((s) => s.name.toLowerCase() === "action")
                ? `context.SetActionState();`
                : "// Transition to action state"
            }
        }
    }
    
    public void ExitState(${className}Controller context)
    {
        Debug.Log("Exiting ${state.name} State");
    }`;
          } else if (state.name.toLowerCase() === "move") {
            stateLogic = `    public void EnterState(${className}Controller context)
    {
        Debug.Log("Entering ${state.name} State");
        // Animation or visual feedback
    }
    
    public void UpdateState(${className}Controller context)
    {
        Move(context);
        
        // Check for transitions
        if (context.GetDistanceToTarget() <= context.actionRange)
        {
            ${
              enabledStates.find((s) => s.name.toLowerCase() === "action")
                ? `context.SetActionState();`
                : "// Transition to action state"
            }
        }
    }
    
    public void ExitState(${className}Controller context)
    {
        Debug.Log("Exiting ${state.name} State");
    }
    
    private void Move(${className}Controller context)
    {
        if (context.target == null)
            return;
            
        // Move towards target
        Vector3 direction = (context.target.position - context.transform.position).normalized;
        context.transform.position += direction * context.moveSpeed * Time.deltaTime;
        
        // Rotate towards target
        if (direction != Vector3.zero)
        {
            context.transform.rotation = Quaternion.LookRotation(direction);
        }
    }`;
          } else if (state.name.toLowerCase() === "action") {
            stateLogic = `    private float actionTimer = 0f;
    private float actionCooldown = 1.5f;
    
    public void EnterState(${className}Controller context)
    {
        Debug.Log("Entering ${state.name} State");
        actionTimer = 0f;
        // Animation or visual feedback
    }
    
    public void UpdateState(${className}Controller context)
    {
        FaceTarget(context);
        
        // Action logic
        actionTimer += Time.deltaTime;
        if (actionTimer >= actionCooldown)
        {
            PerformAction(context);
            actionTimer = 0f;
        }
        
        // Check for transitions
        float distanceToTarget = context.GetDistanceToTarget();
        
        if (distanceToTarget > context.actionRange)
        {
            ${
              enabledStates.find((s) => s.name.toLowerCase() === "move")
                ? `context.SetMoveState();`
                : "// Transition to move state"
            }
        }
    }
    
    public void ExitState(${className}Controller context)
    {
        Debug.Log("Exiting ${state.name} State");
    }
    
    private void FaceTarget(${className}Controller context)
    {
        if (context.target == null)
            return;
            
        Vector3 direction = (context.target.position - context.transform.position).normalized;
        direction.y = 0; // Keep on same Y plane
        
        if (direction != Vector3.zero)
        {
            context.transform.rotation = Quaternion.LookRotation(direction);
        }
    }
    
    private void PerformAction(${className}Controller context)
    {
        Debug.Log("${className} performs action!");
        
        // Implement action logic here
        // This could be:
        // - Spawning a projectile
        // - Activating a collider
        // - Applying an effect
        // - Playing animation
    }`;
          } else {
            stateLogic = `    public void EnterState(${className}Controller context)
    {
        Debug.Log("Entering ${state.name} State");
        // Animation or visual feedback
    }
    
    public void UpdateState(${className}Controller context)
    {
        // Implement ${state.name} state behavior
        
        // Check for transitions to other states
        // Example:
        // if (someCondition)
        // {
        //     context.SetOtherState();
        // }
    }
    
    public void ExitState(${className}Controller context)
    {
        Debug.Log("Exiting ${state.name} State");
    }`;
          }

          const stateCode = `using UnityEngine;

// Concrete state
public class ${className}${state.name}State : I${className}State
{
${stateLogic}
    
${callbackMethodsImplementation}
}`;

          files[`${state.name.toLowerCase()}State`] = stateCode;
          names[
            `${state.name.toLowerCase()}State`
          ] = `${className}${state.name}State.cs`;
        });

        // Set active file to interface for State pattern
        setActiveFile("interface");
      } else if (engine === "godot") {
        // Abstract state class
        const callbackMethodsCode = enabledCallbacks
          .map((callback) => {
            const methodName =
              callback.name.charAt(0).toLowerCase() + callback.name.slice(1);
            return `func ${methodName}(context, ${callback.paramName}):\n    pass`;
          })
          .join("\n\n");

        const abstractStateCode = `# Abstract state class
class_name ${className}State
extends Node

# Virtual methods to be overridden by concrete states
func enter_state(context):
    pass

func update_state(context, delta):
    pass

func exit_state(context):
    pass

${callbackMethodsCode ? callbackMethodsCode : ""}`;
        files.abstractState = abstractStateCode;
        names.abstractState = `${className.toLowerCase()}_state.gd`;

        // Controller class
        const controllerStateDeclarations = enabledStates
          .map((state) => `var ${state.name.toLowerCase()}_state = null`)
          .join("\n");

        const controllerStateInitializations = enabledStates
          .map(
            (state) =>
              `    ${state.name.toLowerCase()}_state = load("res://${className.toLowerCase()}_${state.name.toLowerCase()}_state.gd").new()`
          )
          .join("\n");

        const controllerStateMethods = enabledStates
          .map(
            (state) =>
              `func set_${state.name.toLowerCase()}_state():
    change_state(${state.name.toLowerCase()}_state)`
          )
          .join("\n\n");

        const callbackImplementations = enabledCallbacks
          .map((callback) => {
            const methodName =
              callback.name.charAt(0).toLowerCase() + callback.name.slice(1);
            return `func _on_${methodName.toLowerCase()}(${callback.paramName}):
    if current_state:
        current_state.${methodName}(self, ${callback.paramName})`;
          })
          .join("\n\n");

        const controllerCode = `extends KinematicBody

# Context class for the state machine
class_name ${className}Controller

# Properties
export var move_speed = 3.0
export var action_range = 1.5
export(NodePath) var target_path

# State variables
var current_state = null
${hierarchicalStates ? "var parent_state = null" : ""}
${controllerStateDeclarations}

# References
var target = null

func _ready():
    # Get references
    if target_path:
        target = get_node(target_path)
    
    # Initialize states
${controllerStateInitializations}
    
    # Set initial state
    change_state(${
      enabledStates.length > 0
        ? enabledStates[0].name.toLowerCase() + "_state"
        : "null"
    })

func _process(delta):
    if current_state:
        current_state.update_state(self, delta)
        ${
          hierarchicalStates
            ? "# Update parent state if it exists\nif parent_state:\n    parent_state.update_state(self, delta)"
            : ""
        }

${callbackImplementations}

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

${
  hierarchicalStates
    ? `# Set parent state for hierarchical state machine
func set_parent_state(new_parent_state):
    if parent_state:
        parent_state.exit_state(self)
    
    parent_state = new_parent_state
    
    if parent_state:
        parent_state.enter_state(self)`
    : ""
}

# State change methods
${controllerStateMethods}

# Helper methods
func get_distance_to_target():
    if not target:
        return INF
    
    return global_transform.origin.distance_to(target.global_transform.origin)`;
        files.controller = controllerCode;
        names.controller = `${className.toLowerCase()}_controller.gd`;

        // Generate state files for each enabled state
        enabledStates.forEach((state) => {
          const callbackMethodsImplementation = enabledCallbacks
            .map((callback) => {
              const methodName =
                callback.name.charAt(0).toLowerCase() + callback.name.slice(1);
              return `func ${methodName}(context, ${callback.paramName}):
    # Handle ${methodName} events
    pass`;
            })
            .join("\n\n");

          let stateLogic = "";
          if (state.name.toLowerCase() === "idle") {
            stateLogic = `var idle_timer = 0.0
var idle_duration = 3.0

func enter_state(context):
    print("Entering ${state.name} State")
    idle_timer = 0.0
    # Animation or visual feedback

func update_state(context, delta):
    # Idle behavior
    idle_timer += delta
    
    # Check for transitions
    if idle_timer >= idle_duration:
        ${
          enabledStates.find((s) => s.name.toLowerCase() === "move")
            ? `context.set_move_state()`
            : "# Transition to next state"
        }
        return
    
    if context.get_distance_to_target() <= context.action_range:
        ${
          enabledStates.find((s) => s.name.toLowerCase() === "action")
            ? `context.set_action_state()`
            : "# Transition to action state"
        }

func exit_state(context):
    print("Exiting ${state.name} State")`;
          } else if (state.name.toLowerCase() === "move") {
            stateLogic = `func enter_state(context):
    print("Entering ${state.name} State")
    # Animation or visual feedback

func update_state(context, delta):
    move(context, delta)
    
    # Check for transitions
    if context.get_distance_to_target() <= context.action_range:
        ${
          enabledStates.find((s) => s.name.toLowerCase() === "action")
            ? `context.set_action_state()`
            : "# Transition to action state"
        }

func exit_state(context):
    print("Exiting ${state.name} State")

func move(context, delta):
    if not context.target:
        return
    
    # Calculate direction to target
    var direction = (context.target.global_transform.origin - context.global_transform.origin).normalized()
    
    # Move towards target
    context.move_and_slide(direction * context.move_speed)
    
    # Rotate towards target
    if direction != Vector3.ZERO:
        context.look_at(context.global_transform.origin + direction, Vector3.UP)`;
          } else if (state.name.toLowerCase() === "action") {
            stateLogic = `var action_timer = 0.0
var action_cooldown = 1.5

func enter_state(context):
    print("Entering ${state.name} State")
    action_timer = 0.0
    # Animation or visual feedback

func update_state(context, delta):
    face_target(context)
    
    # Action logic
    action_timer += delta
    if action_timer >= action_cooldown:
        perform_action(context)
        action_timer = 0.0
    
    # Check for transitions
    if context.get_distance_to_target() > context.action_range:
        ${
          enabledStates.find((s) => s.name.toLowerCase() === "move")
            ? `context.set_move_state()`
            : "# Transition to move state"
        }

func exit_state(context):
    print("Exiting ${state.name} State")

func face_target(context):
    if not context.target:
        return
    
    var direction = (context.target.global_transform.origin - context.global_transform.origin).normalized()
    direction.y = 0  # Keep on same Y plane
    
    if direction != Vector3.ZERO:
        context.look_at(context.global_transform.origin + direction, Vector3.UP)

func perform_action(context):
    print("${className} performs action!")
    
    # Implement action logic here
    # This could be:
    # - Spawning a projectile
    # - Activating a collider
    # - Applying an effect
    # - Playing animation`;
          } else {
            stateLogic = `func enter_state(context):
    print("Entering ${state.name} State")
    # Animation or visual feedback

func update_state(context, delta):
    # Implement ${state.name} state behavior
    
    # Check for transitions to other states
    # Example:
    # if some_condition:
    #     context.set_other_state()

func exit_state(context):
    print("Exiting ${state.name} State")`;
          }

          const stateCode = `extends ${className}State

# Concrete ${state.name.toLowerCase()} state
class_name ${className}${state.name}State

${stateLogic}

${callbackMethodsImplementation}`;

          files[`${state.name.toLowerCase()}State`] = stateCode;
          names[
            `${state.name.toLowerCase()}State`
          ] = `${className.toLowerCase()}_${state.name.toLowerCase()}_state.gd`;
        });

        // Set active file to abstract state for Godot
        setActiveFile("abstractState");
      } else if (engine === "unreal") {
        // State Interface Header
        const callbackMethods = enabledCallbacks
          .map((callback) => {
            if (callback.name === "OnTriggerEnter") {
              return `    // Handle overlap events
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}State")
    void OnActorBeginOverlap(A${className}Controller* Controller, AActor* OtherActor);`;
            } else if (callback.name === "OnCollisionEnter") {
              return `    // Handle collision events
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}State")
    void OnActorHit(A${className}Controller* Controller, AActor* OtherActor, UPrimitiveComponent* OtherComp, FVector NormalImpulse, const FHitResult& Hit);`;
            } else {
              return `    // Handle custom events
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}State")
    void ${callback.name}(A${className}Controller* Controller, const FName& EventName, const FEventData& EventData);`;
            }
          })
          .join("\n\n");

        const stateInterfaceCode = `#pragma once

#include "CoreMinimal.h"
#include "UObject/Interface.h"
#include "${className}StateInterface.generated.h"

// Forward declaration
class A${className}Controller;

${
  enabledCallbacks.some((c) => c.name === "HandleEvent")
    ? `// Custom event data structure
USTRUCT(BlueprintType)
struct FEventData
{
    GENERATED_BODY()
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    FString EventType;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    UObject* EventSource;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    float FloatValue;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    int32 IntValue;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    bool BoolValue;
};`
    : ""
}

// This class does not need to be modified.
UINTERFACE(MinimalAPI)
class U${className}StateInterface : public UInterface
{
    GENERATED_BODY()
};

/**
 * State interface for ${className} state machine
 */
class I${className}StateInterface
{
    GENERATED_BODY()

public:
    // Enter this state
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}State")
    void EnterState(A${className}Controller* Controller);

    // Update this state
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}State")
    void UpdateState(A${className}Controller* Controller, float DeltaTime);

    // Exit this state
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}State")
    void ExitState(A${className}Controller* Controller);

${callbackMethods}
};`;
        files.stateInterface = stateInterfaceCode;
        names.stateInterface = `${className}StateInterface.h`;

        // Controller Header
        const controllerStateDeclarations = enabledStates
          .map(
            (state) =>
              `    UPROPERTY()\n    U${className}${state.name}State* ${state.name}State;`
          )
          .join("\n\n");

        const controllerStateMethods = enabledStates
          .map(
            (state) =>
              `    UFUNCTION(BlueprintCallable, Category = "${className}")\n    void Set${state.name}State();`
          )
          .join("\n\n");

        const callbackDeclarations = enabledCallbacks
          .map((callback) => {
            if (callback.name === "OnTriggerEnter") {
              return `    // Called when this actor overlaps another actor
    UFUNCTION()
    void OnActorBeginOverlap(AActor* OverlappedActor, AActor* OtherActor);`;
            } else if (callback.name === "OnCollisionEnter") {
              return `    // Called when this actor hits another actor
    UFUNCTION()
    void OnActorHit(AActor* SelfActor, AActor* OtherActor, FVector NormalImpulse, const FHitResult& Hit);`;
            } else {
              return `    // Trigger a custom event
    UFUNCTION(BlueprintCallable, Category = "${className}")
    void ${callback.name}(const FName& EventName, const FEventData& EventData);`;
            }
          })
          .join("\n\n");

        const controllerHeaderCode = `#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "${className}Controller.generated.h"

// Forward declarations
class U${className}StateBase;
${hierarchicalStates ? "class U${className}ParentState;" : ""}

UCLASS()
class YOURGAME_API A${className}Controller : public AActor
{
    GENERATED_BODY()
    
public:    
    // Sets default values for this actor's properties
    A${className}Controller();

protected:
    // Called when the game starts or when spawned
    virtual void BeginPlay() override;

public:    
    // Called every frame
    virtual void Tick(float DeltaTime) override;
    
${callbackDeclarations}
    
    // Change to a new state
    UFUNCTION(BlueprintCallable, Category = "${className}")
    void ChangeState(U${className}StateBase* NewState);
    
    ${
      hierarchicalStates
        ? `// Set parent state for hierarchical state machine
    UFUNCTION(BlueprintCallable, Category = "${className}")
    void SetParentState(U${className}StateBase* NewParentState);`
        : ""
    }
    
    // State change methods
${controllerStateMethods}
    
    // Helper methods
    UFUNCTION(BlueprintCallable, Category = "${className}")
    float GetDistanceToTarget() const;
    
    // Properties
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "${className}")
    float MoveSpeed = 300.0f;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "${className}")
    float ActionRange = 150.0f;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "${className}")
    AActor* Target;
    
private:
    // Current state
    UPROPERTY()
    U${className}StateBase* CurrentState;
    
    ${
      hierarchicalStates
        ? `// Parent state for hierarchical state machine
    UPROPERTY()
    U${className}StateBase* ParentState;`
        : ""
    }
    
    // State instances
${controllerStateDeclarations}
};`;
        files.controllerHeader = controllerHeaderCode;
        names.controllerHeader = `${className}Controller.h`;

        // State Base Header
        const stateBaseImplementations = enabledCallbacks
          .map((callback) => {
            if (callback.name === "OnTriggerEnter") {
              return "virtual void OnActorBeginOverlap_Implementation(A${className}Controller* Controller, AActor* OtherActor) override;";
            } else if (callback.name === "OnCollisionEnter") {
              return "virtual void OnActorHit_Implementation(A${className}Controller* Controller, AActor* OtherActor, UPrimitiveComponent* OtherComp, FVector NormalImpulse, const FHitResult& Hit) override;";
            } else {
              return "virtual void HandleEvent_Implementation(A${className}Controller* Controller, const FName& EventName, const FEventData& EventData) override;";
            }
          })
          .join("\n    ");

        const stateBaseHeaderCode = `#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "${className}StateInterface.h"
#include "${className}StateBase.generated.h"

// Forward declaration
class A${className}Controller;

/**
 * Base class for ${className} states
 */
UCLASS(Abstract, Blueprintable, BlueprintType)
class YOURGAME_API U${className}StateBase : public UObject, public I${className}StateInterface
{
    GENERATED_BODY()
    
public:
    // Constructor
    U${className}StateBase();
    
    // I${className}StateInterface implementation
    virtual void EnterState_Implementation(A${className}Controller* Controller) override;
    virtual void UpdateState_Implementation(A${className}Controller* Controller, float DeltaTime) override;
    virtual void ExitState_Implementation(A${className}Controller* Controller) override;
    ${stateBaseImplementations ? stateBaseImplementations : ""}
};`;
        files.stateBaseHeader = stateBaseHeaderCode;
        names.stateBaseHeader = `${className}StateBase.h`;

        // Generate state header files for each enabled state
        enabledStates.forEach((state) => {
          let stateSpecificProperties = "";

          if (state.name.toLowerCase() === "idle") {
            stateSpecificProperties = `private:
    // Idle timer
    float IdleTimer;
    
    // How long to stay idle
    UPROPERTY(EditAnywhere, Category = "${className}State")
    float IdleDuration = 3.0f;`;
          } else if (state.name.toLowerCase() === "action") {
            stateSpecificProperties = `private:
    // Action timer
    float ActionTimer;
    
    // Action cooldown
    UPROPERTY(EditAnywhere, Category = "${className}State")
    float ActionCooldown = 1.5f;
    
    // Perform the action
    UFUNCTION(BlueprintCallable, Category = "${className}State")
    void PerformAction(A${className}Controller* Controller);
    
    // Face the target
    UFUNCTION(BlueprintCallable, Category = "${className}State")
    void FaceTarget(A${className}Controller* Controller);`;
          } else if (state.name.toLowerCase() === "move") {
            stateSpecificProperties = `private:
    // Move towards target
    UFUNCTION(BlueprintCallable, Category = "${className}State")
    void MoveTowardsTarget(A${className}Controller* Controller, float DeltaTime);`;
          }

          const stateHeaderCode = `#pragma once

#include "CoreMinimal.h"
#include "${className}StateBase.h"
#include "${className}${state.name}State.generated.h"

/**
 * ${state.name} state for ${className}
 */
UCLASS()
class YOURGAME_API U${className}${state.name}State : public U${className}StateBase
{
    GENERATED_BODY()
    
public:
    // Constructor
    U${className}${state.name}State();
    
    // Override state methods
    virtual void EnterState_Implementation(A${className}Controller* Controller) override;
    virtual void UpdateState_Implementation(A${className}Controller* Controller, float DeltaTime) override;
    virtual void ExitState_Implementation(A${className}Controller* Controller) override;
    
${stateSpecificProperties}
};`;

          files[`${state.name.toLowerCase()}StateHeader`] = stateHeaderCode;
          names[
            `${state.name.toLowerCase()}StateHeader`
          ] = `${className}${state.name}State.h`;
        });

        // Set active file to state interface for Unreal
        setActiveFile("stateInterface");
      }
    } else if (pattern === "factory") {
      if (engine === "unity") {
        // Factory interface
        const productInterfaceCode = `using UnityEngine;

// Product interface
public interface I${className}Product
{
    void Initialize();
    void Use();
    ${abstractFactory ? "string GetProductType();" : ""}
}`;
        files.interface = productInterfaceCode;
        names.interface = `I${className}Product.cs`;

        // Factory class
        const factoryCode = `using UnityEngine;
${abstractFactory ? "using System.Collections.Generic;" : ""}

// Abstract factory
public abstract class ${className}Factory : MonoBehaviour
{
    // Factory method
    public abstract I${className}Product CreateProduct(${
          abstractFactory ? "string productType" : ""
        });
    
    // Helper method to create and initialize a product
    public I${className}Product GetProduct(${
          abstractFactory ? "string productType" : ""
        })
    {
        I${className}Product product = CreateProduct(${
          abstractFactory ? "productType" : ""
        });
        product.Initialize();
        return product;
    }
}`;
        files.factory = factoryCode;
        names.factory = `${className}Factory.cs`;

        // Concrete factory
        const concreteFactoryCode = `using UnityEngine;
${abstractFactory ? "using System.Collections.Generic;" : ""}

// Concrete factory
public class Concrete${className}Factory : ${className}Factory
{
    ${
      abstractFactory
        ? `[System.Serializable]
    public class ProductMapping
    {
        public string productType;
        public GameObject productPrefab;
    }
    
    [SerializeField] private List<ProductMapping> productMappings = new List<ProductMapping>();`
        : `[SerializeField] private GameObject productPrefab;`
    }
    
    public override I${className}Product CreateProduct(${
          abstractFactory ? "string productType" : ""
        })
    {
        ${
          abstractFactory
            ? `// Find the prefab for the requested product type
        GameObject prefab = null;
        foreach (var mapping in productMappings)
        {
            if (mapping.productType == productType)
            {
                prefab = mapping.productPrefab;
                break;
            }
        }
        
        if (prefab == null)
        {
            Debug.LogError($"No prefab found for product type: {productType}");
            return null;
        }
        
        // Create product instance
        GameObject productObject = Instantiate(prefab);`
            : `// Create product instance
        GameObject productObject = Instantiate(productPrefab);`
        }
        
        I${className}Product product = productObject.GetComponent<I${className}Product>();
        
        if (product == null)
        {
            Debug.LogError("Product prefab does not implement I${className}Product interface!");
            Destroy(productObject);
            return null;
        }
        
        return product;
    }
}`;
        files.concreteFactory = concreteFactoryCode;
        names.concreteFactory = `Concrete${className}Factory.cs`;

        // Concrete product
        const concreteProductCode = `using UnityEngine;

// Concrete product
public class Concrete${className}Product : MonoBehaviour, I${className}Product
{
    [SerializeField] private string productName = "Default Product";
    ${
      abstractFactory
        ? `[SerializeField] private string productType = "Default";`
        : ""
    }
    
    public void Initialize()
    {
        Debug.Log($"{productName} initialized");
    }
    
    public void Use()
    {
        Debug.Log($"Using {productName}");
        // Implement product-specific behavior here
    }
    
    ${
      abstractFactory
        ? `public string GetProductType()
    {
        return productType;
    }`
        : ""
    }
}`;
        files.concreteProduct = concreteProductCode;
        names.concreteProduct = `Concrete${className}Product.cs`;

        // Client example
        const clientCode = `using UnityEngine;

// Example client that uses the factory
public class ${className}Client : MonoBehaviour
{
    [SerializeField] private ${className}Factory factory;
    ${
      abstractFactory
        ? `[SerializeField] private string productType = "Default";`
        : ""
    }
    
    private void Start()
    {
        if (factory == null)
        {
            Debug.LogError("Factory reference not set!");
            return;
        }
        
        // Create and use a product
        I${className}Product product = factory.GetProduct(${
          abstractFactory ? "productType" : ""
        });
        if (product != null)
        {
            product.Use();
        }
    }
}`;
        files.client = clientCode;
        names.client = `${className}Client.cs`;

        // Set active file to interface for Factory pattern
        setActiveFile("interface");
      } else if (engine === "godot") {
        // Product interface
        const productInterfaceCode = `# Product interface
class_name I${className}Product

# Virtual methods to be overridden by concrete products
func initialize():
    pass

func use():
    pass
${abstractFactory ? "func get_product_type():\n    pass" : ""}`;
        files.productInterface = productInterfaceCode;
        names.productInterface = `i_${className.toLowerCase()}_product.gd`;

        // Factory class
        const factoryCode = `extends Node

# Abstract factory
class_name ${className}Factory

# Factory method - override in concrete factories
func create_product(${abstractFactory ? "product_type" : ""}):
    # This should be overridden
    push_error("Factory method not implemented!")
    return null

# Helper method to create and initialize a product
func get_product(${abstractFactory ? "product_type" : ""}):
    var product = create_product(${abstractFactory ? "product_type" : ""})
    if product:
        product.initialize()
    return product`;
        files.factory = factoryCode;
        names.factory = `${className.toLowerCase()}_factory.gd`;

        // Concrete factory
        const concreteFactoryCode = `extends ${className}Factory

# Concrete factory
class_name Concrete${className}Factory

${
  abstractFactory
    ? `# Dictionary mapping product types to scenes
export(Dictionary) var product_mappings = {
    "Default": preload("res://concrete_${className.toLowerCase()}_product.tscn")
}`
    : `export(PackedScene) var product_scene`
}

func create_product(${abstractFactory ? "product_type" : ""}):
    ${
      abstractFactory
        ? `if not product_type in product_mappings:
        push_error("No scene found for product type: " + product_type)
        return null
    
    var scene = product_mappings[product_type]`
        : `if not product_scene:
        push_error("Product scene not set!")
        return null
    
    var scene = product_scene`
    }
    
    # Create product instance
    var product_instance = scene.instance()
    
    # Check if it implements the interface
    if not product_instance.has_method("initialize") or not product_instance.has_method("use"):
        push_error("Product does not implement I${className}Product interface!")
        product_instance.queue_free()
        return null
    
    # Add to the scene
    add_child(product_instance)
    
    return product_instance`;
        files.concreteFactory = concreteFactoryCode;
        names.concreteFactory = `concrete_${className.toLowerCase()}_factory.gd`;

        // Concrete product
        const concreteProductCode = `extends Node

# Concrete product
class_name Concrete${className}Product

export var product_name = "Default Product"
${abstractFactory ? `export var product_type = "Default"` : ""}

# Implement I${className}Product interface
func initialize():
    print(product_name + " initialized")

func use():
    print("Using " + product_name)
    # Implement product-specific behavior here
    
${
  abstractFactory
    ? `func get_product_type():
    return product_type`
    : ""
}`;
        files.concreteProduct = concreteProductCode;
        names.concreteProduct = `concrete_${className.toLowerCase()}_product.gd`;

        // Client example
        const clientCode = `extends Node

# Example client that uses the factory
class_name ${className}Client

export(NodePath) var factory_path
${abstractFactory ? `export var product_type = "Default"` : ""}
var factory

func _ready():
    if factory_path:
        factory = get_node(factory_path)
    
    if not factory:
        push_error("Factory reference not set!")
        return
    
    # Create and use a product
    var product = factory.get_product(${abstractFactory ? "product_type" : ""})
    if product:
        product.use()`;
        files.client = clientCode;
        names.client = `${className.toLowerCase()}_client.gd`;

        // Set active file to product interface for Godot
        setActiveFile("productInterface");
      } else if (engine === "unreal") {
        // Product interface header
        const productInterfaceCode = `#pragma once

#include "CoreMinimal.h"
#include "UObject/Interface.h"
#include "${className}ProductInterface.generated.h"

// This class does not need to be modified.
UINTERFACE(MinimalAPI)
class U${className}ProductInterface : public UInterface
{
    GENERATED_BODY()
};

/**
 * Product interface for ${className} factory
 */
class I${className}ProductInterface
{
    GENERATED_BODY()

public:
    // Initialize the product
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}Product")
    void Initialize();

    // Use the product
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}Product")
    void Use();
    
    ${
      abstractFactory
        ? `// Get the product type
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}Product")
    FString GetProductType();`
        : ""
    }
};`;
        files.productInterface = productInterfaceCode;
        names.productInterface = `${className}ProductInterface.h`;

        // Factory header
        const factoryHeaderCode = `#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "${className}Factory.generated.h"

// Forward declarations
class AActor;
class I${className}ProductInterface;

UCLASS(Abstract)
class YOURGAME_API A${className}Factory : public AActor
{
    GENERATED_BODY()
    
public:    
    // Sets default values for this actor's properties
    A${className}Factory();

protected:
    // Called when the game starts or when spawned
    virtual void BeginPlay() override;

public:    
    // Factory method - override in concrete factories
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "${className}Factory")
    AActor* CreateProduct(${
      abstractFactory ? "const FString& ProductType" : ""
    });
    virtual AActor* CreateProduct_Implementation(${
      abstractFactory ? "const FString& ProductType" : ""
    });
    
    // Helper method to create and initialize a product
    UFUNCTION(BlueprintCallable, Category = "${className}Factory")
    AActor* GetProduct(${abstractFactory ? "const FString& ProductType" : ""});
};`;
        files.factoryHeader = factoryHeaderCode;
        names.factoryHeader = `${className}Factory.h`;

        // Concrete factory header
        const concreteFactoryHeaderCode = `#pragma once

#include "CoreMinimal.h"
#include "${className}Factory.h"
#include "Concrete${className}Factory.generated.h"

${
  abstractFactory
    ? `// Product mapping structure
USTRUCT(BlueprintType)
struct FProductMapping
{
    GENERATED_BODY()
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Factory")
    FString ProductType;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Factory")
    TSubclassOf<AActor> ProductClass;
};`
    : ""
}

/**
 * Concrete factory implementation
 */
UCLASS()
class YOURGAME_API AConcrete${className}Factory : public A${className}Factory
{
    GENERATED_BODY()
    
public:
    // Constructor
    AConcrete${className}Factory();
    
    // Override factory method
    virtual AActor* CreateProduct_Implementation(${
      abstractFactory ? "const FString& ProductType" : ""
    }) override;
    
private:
    ${
      abstractFactory
        ? `// Product mappings
    UPROPERTY(EditAnywhere, Category = "Factory")
    TArray<FProductMapping> ProductMappings;`
        : `// Product class to create
    UPROPERTY(EditAnywhere, Category = "Factory")
    TSubclassOf<AActor> ProductClass;`
    }
};`;
        files.concreteFactoryHeader = concreteFactoryHeaderCode;
        names.concreteFactoryHeader = `Concrete${className}Factory.h`;

        // Set active file to product interface for Unreal
        setActiveFile("productInterface");
      }
    }

    setGeneratedFiles(files);
    setFileNames(names);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Code Generator
              </h1>
              <p className="text-muted-foreground">
                Generate customized design pattern code for your game engine
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pattern">Select Pattern</Label>
                      <Select value={pattern} onValueChange={setPattern}>
                        <SelectTrigger id="pattern">
                          <SelectValue placeholder="Select pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="singleton">
                            <div className="flex items-center">
                              <Gamepad2 className="mr-2 h-4 w-4" />
                              <span>Singleton</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="state">
                            <div className="flex items-center">
                              <Gamepad2 className="mr-2 h-4 w-4" />
                              <span>State</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="factory">
                            <div className="flex items-center">
                              <Gamepad2 className="mr-2 h-4 w-4" />
                              <span>Factory Method</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="engine">Game Engine</Label>
                      <Select value={engine} onValueChange={setEngine}>
                        <SelectTrigger id="engine">
                          <SelectValue placeholder="Select engine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unity">Unity (C#)</SelectItem>
                          <SelectItem value="godot">
                            Godot (GDScript)
                          </SelectItem>
                          <SelectItem value="unreal">
                            Unreal Engine (C++)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class-name">Main Class Name</Label>
                      <Input
                        id="class-name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="e.g. GameManager, Character, Enemy"
                      />
                    </div>

                    {pattern === "singleton" && (
                      <div className="pt-2">
                        <h3 className="font-medium mb-2">Singleton Options</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="lazy-init"
                              checked={lazyInit}
                              onCheckedChange={(checked) =>
                                setLazyInit(checked === true)
                              }
                            />
                            <Label htmlFor="lazy-init">
                              Lazy Initialization
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="thread-safe"
                              checked={threadSafe}
                              onCheckedChange={(checked) =>
                                setThreadSafe(checked === true)
                              }
                            />
                            <Label htmlFor="thread-safe">Thread Safe</Label>
                          </div>
                        </div>
                      </div>
                    )}

                    {pattern === "state" && (
                      <div className="pt-2">
                        <h3 className="font-medium mb-2">
                          State Machine Options
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="hierarchical"
                              checked={hierarchicalStates}
                              onCheckedChange={(checked) =>
                                setHierarchicalStates(checked === true)
                              }
                            />
                            <Label htmlFor="hierarchical">
                              Hierarchical States
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="event-driven"
                              checked={eventDriven}
                              onCheckedChange={(checked) =>
                                setEventDriven(checked === true)
                              }
                            />
                            <Label htmlFor="event-driven">
                              Event-Driven Transitions
                            </Label>
                          </div>
                        </div>

                        <h3 className="font-medium mt-4 mb-2">States</h3>
                        <div className="space-y-3">
                          {states.map((state, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`state-${index}`}
                                checked={state.enabled}
                                onCheckedChange={() =>
                                  toggleStateEnabled(index)
                                }
                              />
                              <Input
                                value={state.name}
                                onChange={(e) =>
                                  updateStateName(index, e.target.value)
                                }
                                placeholder="State name"
                                className="flex-1"
                              />
                              {index > 0 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeState(index)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addState}
                            className="mt-2"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add State
                          </Button>
                        </div>

                        <h3 className="font-medium mt-4 mb-2">
                          Callback Methods
                        </h3>
                        <div className="space-y-3">
                          {callbackMethods.map((callback, index) => (
                            <div
                              key={index}
                              className="space-y-2 border p-3 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`callback-${index}`}
                                  checked={callback.enabled}
                                  onCheckedChange={() =>
                                    toggleCallbackEnabled(index)
                                  }
                                />
                                <Input
                                  value={callback.name}
                                  onChange={(e) =>
                                    updateCallbackMethod(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Method name"
                                  className="flex-1"
                                />
                                {index > 0 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCallbackMethod(index)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  value={callback.paramType}
                                  onChange={(e) =>
                                    updateCallbackMethod(
                                      index,
                                      "paramType",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Parameter type"
                                />
                                <Input
                                  value={callback.paramName}
                                  onChange={(e) =>
                                    updateCallbackMethod(
                                      index,
                                      "paramName",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Parameter name"
                                />
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addCallbackMethod}
                            className="mt-2"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Callback Method
                          </Button>
                        </div>
                      </div>
                    )}

                    {pattern === "factory" && (
                      <div className="pt-2">
                        <h3 className="font-medium mb-2">
                          Factory Method Options
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="abstract-factory"
                              checked={abstractFactory}
                              onCheckedChange={(checked) =>
                                setAbstractFactory(checked === true)
                              }
                            />
                            <Label htmlFor="abstract-factory">
                              Abstract Factory (Multiple Product Types)
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button className="w-full" onClick={generateCode}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-0">
                  <Tabs defaultValue="code">
                    <div className="flex items-center justify-between border-b px-4">
                      <TabsList className="h-12">
                        <TabsTrigger value="code" className="flex items-center">
                          <Code2 className="mr-2 h-4 w-4" />
                          Code
                        </TabsTrigger>
                        <TabsTrigger
                          value="usage"
                          className="flex items-center"
                        >
                          <Gamepad2 className="mr-2 h-4 w-4" />
                          Usage
                        </TabsTrigger>
                      </TabsList>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCopy}>
                          {copied ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <ClipboardCopy className="mr-2 h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDownloadFile}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDownloadAll}
                        >
                          <Archive className="mr-2 h-4 w-4" />
                          Download All
                        </Button>
                      </div>
                    </div>
                    <TabsContent value="code" className="m-0">
                      <div className="border-b">
                        <div className="flex overflow-x-auto">
                          {Object.keys(generatedFiles).map((key) => (
                            <button
                              key={key}
                              className={`px-4 py-2 text-sm whitespace-nowrap ${
                                activeFile === key
                                  ? "border-b-2 border-primary font-medium"
                                  : "text-muted-foreground"
                              }`}
                              onClick={() => setActiveFile(key)}
                            >
                              {fileNames[key] || key}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <Textarea
                          className="font-mono text-sm min-h-[400px] rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={generatedFiles[activeFile] || ""}
                          readOnly
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="usage" className="p-4 space-y-4">
                      <h3 className="font-medium">How to use this pattern</h3>
                      {pattern === "singleton" && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            The Singleton pattern ensures a class has only one
                            instance and provides a global point of access to
                            it.
                          </p>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Implementation Steps:
                            </h4>
                            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                              <li>
                                Create a new script with the generated code
                              </li>
                              <li>
                                Attach the script to a GameObject in your scene
                                (Unity)
                              </li>
                              <li>
                                Access the singleton instance using{" "}
                                <code className="text-xs bg-muted px-1 py-0.5 rounded">{`${className}.Instance`}</code>
                              </li>
                            </ol>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Example Usage:
                            </h4>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {engine === "unity"
                                ? `// Accessing the singleton from another script
void Start() {
  ${className}.Instance.ExampleMethod();
}`
                                : engine === "godot"
                                ? `# Accessing the singleton from another script
func _ready():
  ${className}.get_instance().example_method()`
                                : `// Accessing the singleton from another class
void YourClass::YourMethod()
{
  A${className}* Manager = A${className}::GetInstance();
  Manager->ExampleMethod();
}`}
                            </pre>
                          </div>
                        </>
                      )}
                      {pattern === "state" && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            The State pattern allows an object to alter its
                            behavior when its internal state changes. The object
                            will appear to change its class.
                          </p>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Implementation Steps:
                            </h4>
                            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                              <li>
                                Create all the generated files in your project
                              </li>
                              <li>
                                Attach the {`${className}Controller`} script to
                                your game object
                              </li>
                              <li>
                                Implement the specific behavior for each state
                              </li>
                              <li>
                                Set up transitions between states based on your
                                game conditions
                              </li>
                            </ol>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Example Usage:
                            </h4>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {engine === "unity"
                                ? `// Transitioning to a different state
void Update() {
  // Check some condition
  if (someCondition) {
    // Change to a different state
    ${className}Controller.Set${states[0].name}State();
  }
}`
                                : engine === "godot"
                                ? `# Transitioning to a different state
func _process(delta):
  # Check some condition
  if some_condition:
    # Change to a different state
    ${className.toLowerCase()}_controller.set_${states[0].name.toLowerCase()}_state()`
                                : `// Transitioning to a different state
void YourClass::Tick(float DeltaTime)
{
  // Check some condition
  if (SomeCondition)
  {
    // Change to a different state
    ${className}Controller->Set${states[0].name}State();
  }
}`}
                            </pre>
                          </div>
                        </>
                      )}
                      {pattern === "factory" && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            The Factory Method pattern defines an interface for
                            creating objects, but lets subclasses decide which
                            classes to instantiate.
                          </p>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Implementation Steps:
                            </h4>
                            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                              <li>
                                Create all the generated files in your project
                              </li>
                              <li>
                                Create concrete product classes that implement
                                the product interface
                              </li>
                              <li>
                                Create concrete factory classes that extend the
                                abstract factory
                              </li>
                              <li>
                                Use the factory to create products without
                                specifying their concrete classes
                              </li>
                            </ol>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Example Usage:
                            </h4>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {engine === "unity"
                                ? `// Using the factory to create a product
void Start() {
  ${className}Factory factory = GetComponent<${className}Factory>();
  I${className}Product product = factory.GetProduct(${
                                    abstractFactory ? '"ProductType"' : ""
                                  });
  product.Use();
}`
                                : engine === "godot"
                                ? `# Using the factory to create a product
func _ready():
  var factory = get_node("${className}Factory")
  var product = factory.get_product(${abstractFactory ? '"product_type"' : ""})
  product.use()`
                                : `// Using the factory to create a product
void YourClass::BeginPlay()
{
  A${className}Factory* Factory = Cast<A${className}Factory>(GetWorld()->SpawnActor<A${className}Factory>());
  AActor* Product = Factory->GetProduct(${
    abstractFactory ? 'TEXT("ProductType")' : ""
  });
  
  // Use the product
  I${className}ProductInterface::Execute_Use(Product);
}`}
                            </pre>
                          </div>
                        </>
                      )}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">
                          Common Use Cases:
                        </h4>
                        {pattern === "singleton" && (
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Game Managers</li>
                            <li>Audio Systems</li>
                            <li>Input Managers</li>
                            <li>Save/Load Systems</li>
                          </ul>
                        )}
                        {pattern === "state" && (
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Character Controllers</li>
                            <li>Enemy AI Behavior</li>
                            <li>Game Flow Management</li>
                            <li>UI State Management</li>
                          </ul>
                        )}
                        {pattern === "factory" && (
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Enemy Spawning Systems</li>
                            <li>Weapon/Item Creation</li>
                            <li>Level Generation</li>
                            <li>UI Element Creation</li>
                          </ul>
                        )}
                      </div>

                      <div className="pt-4 border-t mt-4">
                        <h3 className="font-medium mb-2">
                          Diagram Integration
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Visualize this pattern with our diagram editor to
                          better understand its structure and relationships.
                        </p>
                        <Link href={generateDiagramUrl()}>
                          <Button>
                            <GitFork className="mr-2 h-4 w-4" />
                            Open in Diagram Editor
                          </Button>
                        </Link>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
