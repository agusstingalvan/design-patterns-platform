export interface StateOptions {
  className: string;
  hierarchicalStates: boolean;
  states: Array<{ name: string; enabled: boolean }>;
  callbackMethods: Array<{
    name: string;
    enabled: boolean;
    paramType: string;
    paramName: string;
  }>;
}

export interface GeneratedFiles {
  [key: string]: string;
}

export interface FileNames {
  [key: string]: string;
}

export function generateStateCode(options: StateOptions): {
  files: GeneratedFiles;
  names: FileNames;
} {
  const { className, hierarchicalStates, states, callbackMethods } = options;
  const files: GeneratedFiles = {};
  const names: FileNames = {};

  const enabledStates = states.filter((state) => state.enabled);
  const enabledCallbacks = callbackMethods.filter(
    (callback) => callback.enabled
  );

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
        ? `// Parent state for hierarchical state machine
private I${className}State parentState;`
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
                ? `// Update parent state if it exists
if (parentState != null)
{
    parentState.UpdateState(this);
}`
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

    const stateLogic = `    public void EnterState(${className}Controller context)
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

  return { files, names };
}
