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
        
    }
    
    ${
      lazyInit
        ? '// Called when the singleton is first accessed\nprivate void Initialize()\n{\n    // Add initialization code here\n    Debug.Log("${className} initialized");\n}'
        : ""
    }
}`;
        files.main = singletonCode;
        names.main = `${className}.cs`;
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
          stateLogic = `    public void EnterState(${className}Controller context)
    {
        Debug.Log("Entering ${state.name} State");
    }
    
    public void UpdateState(${className}Controller context)
    {
        Debug.Log("Update ${state.name} State");
    }
    
    public void ExitState(${className}Controller context)
    {
        Debug.Log("Exiting ${state.name} State");
    }`;

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
      }
    } else if (pattern === "observer") {
      // Observer pattern implementation for Unity
      const observerCode = `using System;
using System.Collections.Generic;
using UnityEngine;

// Subject interface
public interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}

// Observer interface
public interface IObserver
{
    void Update();
}

// Concrete subject
public class ${className} : MonoBehaviour, ISubject
{
    private List<IObserver> observers = new List<IObserver>();

    public void Attach(IObserver observer)
    {
        if (!observers.Contains(observer))
        {
            observers.Add(observer);
        }
    }

    public void Detach(IObserver observer)
    {
        if (observers.Contains(observer))
        {
            observers.Remove(observer);
        }
    }

    public void Notify()
    {
        foreach (var observer in observers)
        {
            observer.Update();
        }
    }

    public void TriggerEvent()
    {
        Debug.Log("Event triggered!");
        Notify();
    }
}

// Concrete observer
public class ${className}Observer : MonoBehaviour, IObserver
{
    public void Update()
    {
        Debug.Log("Observer notified!");
    }
}`;
      files.main = observerCode;
      names.main = `${className}.cs`;
    } else if (pattern === "command") {
      // Command pattern implementation for Unity
      const commandCode = `using System.Collections.Generic;
using UnityEngine;

// Command interface
public interface ICommand
{
    void Execute();
    void Undo();
}

// Concrete command
public class MoveCommand : ICommand
{
    private Transform transform;
    private Vector3 direction;

    public MoveCommand(Transform transform, Vector3 direction)
    {
        this.transform = transform;
        this.direction = direction;
    }

    public void Execute()
    {
        transform.position += direction;
    }

    public void Undo()
    {
        transform.position -= direction;
    }
}

// Invoker
public class CommandInvoker : MonoBehaviour
{
    private Stack<ICommand> commandHistory = new Stack<ICommand>();

    public void ExecuteCommand(ICommand command)
    {
        command.Execute();
        commandHistory.Push(command);
    }

    public void UndoCommand()
    {
        if (commandHistory.Count > 0)
        {
            var command = commandHistory.Pop();
            command.Undo();
        }
    }
}`;
      files.main = commandCode;
      names.main = `${className}.cs`;
    }

    setGeneratedFiles(files);
    setFileNames(names);
  };

  return (
    <div className="flex min-h-screen flex-col px-4 overflow-hidden">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-4">
            {/* <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Code Generator
              </h1>
              <p className="text-muted-foreground">
                Generate customized design pattern code for your game engine
              </p>
            </div> */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="h-[calc(100vh-210px)] overflow-y-scroll">
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
                          {/* <SelectItem value="factory">
                            <div className="flex items-center">
                              <Gamepad2 className="mr-2 h-4 w-4" />
                              <span>Factory Method</span>
                            </div>
                          </SelectItem> */}
                          {/* <SelectItem value="observer">
                            <div className="flex items-center">
                              <Gamepad2 className="mr-2 h-4 w-4" />
                              <span>Observer</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="command">
                            <div className="flex items-center">
                              <Gamepad2 className="mr-2 h-4 w-4" />
                              <span>Command</span>
                            </div>
                          </SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* <div className="space-y-2">
                      <Label htmlFor="engine">Game Engine</Label>
                      <Select value={engine} onValueChange={setEngine}>
                        <SelectTrigger id="engine">
                          <SelectValue placeholder="Select engine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unity">Unity (C#)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                    <div className="space-y-2">
                      <Label htmlFor="class-name">Main Class Name</Label>
                      <Input
                        id="class-name"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="e.g. GameManager, Character, Enemy"
                      />
                    </div>

                    {/* {pattern === "singleton" && (
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
                    )} */}

                    {pattern === "state" && (
                      <div className="pt-2">
                        {/* <h3 className="font-medium mb-2">
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
                        </div> */}

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

                    {/* <Button className="w-full" onClick={generateCode}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generate Code
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
              <Card className="h-[calc(100vh-210px)] overflow-y-scroll">
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
                                : ""}
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
                                : ""}
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
                                : ""}
                            </pre>
                          </div>
                        </>
                      )}
                      {pattern === "observer" && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            The Observer pattern defines a one-to-many
                            dependency between objects so that when one object
                            changes state, all its dependents are notified and
                            updated automatically.
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
                                Attach the subject script to a GameObject in
                                your scene (Unity)
                              </li>
                              <li>
                                Attach the observer script to another GameObject
                                in your scene (Unity)
                              </li>
                              <li>
                                Use the subject's Attach method to register the
                                observer
                              </li>
                            </ol>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Example Usage:
                            </h4>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {engine === "unity"
                                ? `// Registering an observer
void Start() {
  ${className} subject = FindObjectOfType<${className}>();
  ${className}Observer observer = FindObjectOfType<${className}Observer>();
  subject.Attach(observer);
}`
                                : ""}
                            </pre>
                          </div>
                        </>
                      )}
                      {pattern === "command" && (
                        <>
                          <p className="text-sm text-muted-foreground">
                            The Command pattern encapsulates a request as an
                            object, thereby allowing for parameterization of
                            clients with queues, requests, and operations.
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
                                Attach the invoker script to a GameObject in
                                your scene (Unity)
                              </li>
                              <li>
                                Create concrete command classes that implement
                                the command interface
                              </li>
                              <li>
                                Use the invoker to execute and undo commands
                              </li>
                            </ol>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Example Usage:
                            </h4>
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              {engine === "unity"
                                ? `// Using the command pattern
void Start() {
  CommandInvoker invoker = FindObjectOfType<CommandInvoker>();
  MoveCommand moveCommand = new MoveCommand(transform, Vector3.forward);
  invoker.ExecuteCommand(moveCommand);
}

void Update() {
  if (Input.GetKeyDown(KeyCode.Z)) {
    CommandInvoker invoker = FindObjectOfType<CommandInvoker>();
    invoker.UndoCommand();
  }
}`
                                : ""}
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
                        {pattern === "observer" && (
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Event Systems</li>
                            <li>Achievement Systems</li>
                            <li>UI Update Systems</li>
                            <li>Game State Notifications</li>
                          </ul>
                        )}
                        {pattern === "command" && (
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Undo/Redo Systems</li>
                            <li>Input Handling</li>
                            <li>AI Command Queues</li>
                            <li>Macro Recording</li>
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
