export interface StateOptions {
  className: string;
  includeController: boolean;
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
  const { className, includeController, states, callbackMethods } = options;
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

  // C. Player/Controller class (optional)
  if (includeController) {
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
  }

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

  // Generate README.md
  const readmeContent = generateStateReadme(options);
  files.readme = readmeContent;
  names.readme = "README.md";

  return { files, names };
}

function generateStateReadme(options: StateOptions): string {
  const { className, includeController, states, callbackMethods } = options;
  const enabledStates = states.filter((s) => s.enabled);
  const enabledCallbacks = callbackMethods.filter((cb) => cb.enabled);

  const filesList = `- I${className}State.cs (Interface de estados)
- ${className}StateMachine.cs (Máquina de estados)
${includeController ? `- ${className}.cs (Controlador/Context)` : ""}
${enabledStates
  .map((s) => `- ${className}${s.name}State.cs (Estado ${s.name})`)
  .join("\n")}`;

  const callbacksList =
    enabledCallbacks.length > 0
      ? `
## Métodos de Callback Incluidos

${enabledCallbacks
  .map((cb) => {
    const params =
      cb.paramType && cb.paramName ? `${cb.paramType} ${cb.paramName}` : "";
    return `- \`${cb.name}(${params})\``;
  })
  .join("\n")}
`
      : "";

  const statesList = enabledStates
    .map((s) => `- **${s.name}State**`)
    .join("\n");

  return `# ${className} - State Machine Pattern

Patrón de diseño State Machine generado para Unity.

## Descripción

Este código implementa el patrón State Machine en Unity, permitiendo que un objeto cambie su comportamiento cuando cambia su estado interno.

La máquina de estados gestiona las transiciones entre estados y garantiza que solo un estado esté activo a la vez.

## Arquitectura

Este patrón utiliza:
- **Interface I${className}State**: Define el contrato que todos los estados deben seguir
- **Clase ${className}StateMachine**: Gestiona el estado actual y las transiciones
${
  includeController
    ? `- **Clase ${className}**: Controlador/Context que contiene la máquina de estados`
    : ""
}
- **Estados concretos**: Implementaciones específicas de cada estado

## Archivos Generados

${filesList}
${callbacksList}
## Estados Incluidos

${statesList}

## Uso

### Inicialización

\`\`\`csharp
${
  includeController
    ? `// En Awake() de ${className}.cs
stateMachine = new ${className}StateMachine(this);
stateMachine.Initialize(stateMachine.${
        enabledStates[0]?.name.toLowerCase() || "idle"
      }State);`
    : `// Crear e inicializar la máquina de estados
${className}StateMachine stateMachine = new ${className}StateMachine(this);
stateMachine.Initialize(stateMachine.${
        enabledStates[0]?.name.toLowerCase() || "idle"
      }State);`
}
\`\`\`

### Transiciones entre Estados

\`\`\`csharp
// Desde cualquier estado, hacer transición a otro
${includeController ? `stateMachine` : `player.stateMachine`}.TransitionTo(${
    includeController ? `stateMachine` : `player.stateMachine`
  }.${enabledStates[1]?.name.toLowerCase() || "move"}State);
\`\`\`

### Actualizar el Estado Actual

\`\`\`csharp
// En Update()
stateMachine.Update();
\`\`\`

## Implementación de Estados

Cada estado implementa tres métodos:

- **Enter()**: Se ejecuta cuando se entra al estado
- **Update()**: Se ejecuta cada frame mientras el estado está activo
- **Exit()**: Se ejecuta cuando se sale del estado

### Ejemplo de Estado con Transición

\`\`\`csharp
public void Update()
{
    // Lógica del estado
    if (someCondition)
    {
        // Transición a otro estado
        player.stateMachine.TransitionTo(player.stateMachine.otherState);
    }
}
\`\`\`

## Casos de Uso Comunes

- Controladores de Personajes (Idle, Walk, Run, Jump)
- Comportamiento de IA de Enemigos (Patrol, Chase, Attack)
- Gestión del Flujo del Juego (Menu, Playing, Paused, GameOver)
- Gestión de Estados de UI (Closed, Opening, Open, Closing)

## Flujo de Transición

1. Se llama a \`TransitionTo(nextState)\`
2. Se ejecuta \`CurrentState.Exit()\`
3. Se actualiza \`CurrentState = nextState\`
4. Se ejecuta \`nextState.Enter()\`
5. En cada frame se ejecuta \`CurrentState.Update()\`

## Notas Importantes

✅ **Cada estado es una clase separada** para mejor organización y mantenibilidad

✅ **Las transiciones son explícitas** - debes llamar a TransitionTo() manualmente

✅ **Los estados tienen referencia al ${
    includeController ? "controlador" : "player"
  }** para acceder a datos y métodos

⚠️ **Solo un estado puede estar activo a la vez**

---

*Generado con Design Patterns Platform - Unity Pattern Generator*
`;
}
