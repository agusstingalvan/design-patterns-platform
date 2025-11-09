export interface StateOptions {
  className: string;
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
  const { className, states, callbackMethods } = options;
  const files: GeneratedFiles = {};
  const names: FileNames = {};

  const enabledStates = states.filter((state) => state.enabled);
  const enabledCallbacks = callbackMethods.filter(
    (callback) => callback.enabled
  );

  // A. Interface file - I{ClassName}State
  const interfaceCode = `using System;

// State interface
public interface I${className}State
{
    void Enter();
    void Update();
    void Exit();
}`;
  files.interface = interfaceCode;
  names.interface = `I${className}State.cs`;

  // B. State Machine class
  const stateDeclarations = enabledStates
    .map(
      (state) =>
        `    public ${className}${
          state.name
        }State ${state.name.toLowerCase()}State;`
    )
    .join("\n");

  const stateInitializations = enabledStates
    .map(
      (state) =>
        `        this.${state.name.toLowerCase()}State = new ${className}${
          state.name
        }State(player);`
    )
    .join("\n");

  const stateMachineCode = `using System;

// State Machine
[Serializable]
public class ${className}StateMachine
{
    public I${className}State CurrentState { get; private set; }
    
    // State references
${stateDeclarations}
    
    public ${className}StateMachine(${className} player)
    {
        // Initialize states
${stateInitializations}
    }
    
    public void Initialize(I${className}State startingState)
    {
        CurrentState = startingState;
        startingState.Enter();
    }
    
    public void TransitionTo(I${className}State nextState)
    {
        CurrentState.Exit();
        CurrentState = nextState;
        nextState.Enter();
    }
    
    public void Update()
    {
        if (CurrentState != null)
        {
            CurrentState.Update();
        }
    }
}`;
  files.stateMachine = stateMachineCode;
  names.stateMachine = `${className}StateMachine.cs`;

  // C. Player/Controller class
  const callbackImplementations = enabledCallbacks
    .map((callback) => {
      const params =
        callback.paramType && callback.paramName
          ? `${callback.paramType} ${callback.paramName}`
          : "";
      return `    private void ${callback.name}(${params})
    {
        // Forward to current state if needed
    }`;
    })
    .join("\n\n");

  const controllerCode = `using UnityEngine;

// Context class
public class ${className} : MonoBehaviour
{
    public ${className}StateMachine stateMachine;
    
    private void Awake()
    {
        // Initialize state machine
        stateMachine = new ${className}StateMachine(this);
        
        // Set initial state (change this to your desired starting state)
        stateMachine.Initialize(stateMachine.${
          enabledStates.length > 0
            ? enabledStates[0].name.toLowerCase() + "State"
            : "idleState"
        });
    }
    
    private void Update()
    {
        // Update current state
        stateMachine.Update();
    }${enabledCallbacks.length > 0 ? "\n\n" + callbackImplementations : ""}
}`;
  files.controller = controllerCode;
  names.controller = `${className}.cs`;

  // D. Generate state files for each enabled state
  enabledStates.forEach((state) => {
    const stateCode = `using UnityEngine;

// Concrete state: ${state.name}
public class ${className}${state.name}State : I${className}State
{
    private ${className} player;
    
    public ${className}${state.name}State(${className} player)
    {
        this.player = player;
    }
    
    public void Enter()
    {
        // Code that runs when we first enter the state
        Debug.Log("Entering ${state.name} State");
    }
    
    public void Update()
    {
        // Per-frame logic, include condition to transition to a new state
        // Example:
        // if (someCondition)
        // {
        //     player.stateMachine.TransitionTo(player.stateMachine.otherState);
        // }
    }
    
    public void Exit()
    {
        // Code that runs when we exit the state
        Debug.Log("Exiting ${state.name} State");
    }
}`;

    files[`${state.name.toLowerCase()}State`] = stateCode;
    names[
      `${state.name.toLowerCase()}State`
    ] = `${className}${state.name}State.cs`;
  });

  return { files, names };
}
