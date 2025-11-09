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

  // Generar archivos manualmente para evitar recursión infinita
  const tempFiles: GeneratedFiles = {};
  const tempNames: FileNames = {};

  // A. Interface file - I{ClassName}State
  const interfaceCode = `using System;

// State interface
public interface I${className}State
{
    void Enter();
    void Update();
    void Exit();
}`;
  tempFiles.interface = interfaceCode;
  tempNames.interface = `I${className}State.cs`;

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
        CurrentState.Enter();
    }
    
    public void ChangeState(I${className}State newState)
    {
        CurrentState.Exit();
        CurrentState = newState;
        CurrentState.Enter();
    }
}`;
  tempFiles.stateMachine = stateMachineCode;
  tempNames.stateMachine = `${className}StateMachine.cs`;

  // C. Controller class (optional)
  if (includeController) {
    const stateCallbacks = enabledCallbacks
      .map(
        (cb) =>
          `    public void ${cb.name}(${cb.paramType} ${cb.paramName}) { stateMachine.CurrentState.${cb.name}(${cb.paramName}); }`
      )
      .join("\n");

    const controllerCode = `using UnityEngine;

// Context class (optional controller)
public class ${className} : MonoBehaviour
{
    public ${className}StateMachine stateMachine;

    private void Awake()
    {
        stateMachine = new ${className}StateMachine(this);
        // Set initial state (example: Idle)
        // stateMachine.Initialize(stateMachine.idleState);
    }

    private void Update()
    {
        stateMachine.CurrentState.Update();
    }

${stateCallbacks}
}`;
    tempFiles.controller = controllerCode;
    tempNames.controller = `${className}.cs`;
  }

  // D. Individual state files
  enabledStates.forEach((state) => {
    const callbackMethods = enabledCallbacks
      .map(
        (cb) =>
          `    public void ${cb.name}(${cb.paramType} ${cb.paramName})
    {
        // Handle ${cb.name} in ${state.name} state
    }`
      )
      .join("\n\n");

    const stateCode = `using System;
using UnityEngine;

// ${state.name} state
public class ${className}${state.name}State : I${className}State
{
    private ${className} player;

    public ${className}${state.name}State(${className} player)
    {
        this.player = player;
    }

    public void Enter()
    {
        Debug.Log("Entering ${state.name} State");
    }

    public void Update()
    {
        // ${state.name} state logic
    }

    public void Exit()
    {
        Debug.Log("Exiting ${state.name} State");
    }

${callbackMethods}
}`;
    tempFiles[`${state.name.toLowerCase()}State`] = stateCode;
    tempNames[
      `${state.name.toLowerCase()}State`
    ] = `${className}${state.name}State.cs`;
  });

  // Construir secciones de código
  let codeSection = "";
  Object.keys(tempFiles).forEach((key) => {
    const fileName = tempNames[key];
    const fileContent = tempFiles[key];
    codeSection += `
## 📄 ${fileName}

\`\`\`csharp
${fileContent}
\`\`\`

`;
  });

  const callbacksList =
    enabledCallbacks.length > 0
      ? `
### Métodos de Callback

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

> **Patrón State Machine generado para Unity**  
> Este archivo contiene todo el código necesario para implementar el patrón en tu proyecto.

---

## ⚙️ Configuración del Patrón

- **Clase Principal**: \`${className}\`
- **Patrón**: State Machine
- **Motor**: Unity (C#)
- **Incluye Controlador**: ${includeController ? "✅ Sí" : "❌ No"}
- **Estados**: ${enabledStates.length}
${callbacksList}

---

## 📖 Descripción

El patrón **State Machine** permite que un objeto cambie su comportamiento cuando cambia su estado interno. La máquina de estados gestiona las transiciones y garantiza que solo un estado esté activo a la vez.

### Arquitectura del Patrón

- **I${className}State**: Interface que define el contrato para todos los estados
- **${className}StateMachine**: Clase que gestiona el estado actual y las transiciones
${
  includeController
    ? `- **${className}**: Controlador/Context que contiene la máquina de estados`
    : ""
}
- **Estados Concretos**: Implementaciones específicas para cada estado

---

## 📦 Archivos del Patrón

${codeSection}

---

## 🚀 Instrucciones de Uso

### 1. Copiar Archivos

Copia **todos los archivos** a tu proyecto Unity en la carpeta \`Assets/Scripts\`.

Archivos incluidos:
- I${className}State.cs
- ${className}StateMachine.cs
${includeController ? `- ${className}.cs` : ""}
${enabledStates.map((s) => `- ${className}${s.name}State.cs`).join("\n")}

### 2. Configuración en Unity

${
  includeController
    ? `- Crea un GameObject en tu escena
- Añade el componente ${className}
- La máquina de estados se inicializa automáticamente en Awake()`
    : `- Crea e inicializa la máquina de estados en tu clase principal
- Asigna el estado inicial en el constructor o Awake()`
}

### 3. Inicialización

\`\`\`csharp
${
  includeController
    ? `// En ${className}.cs (ya incluido en el código generado)
private void Awake()
{
    stateMachine = new ${className}StateMachine(this);
    stateMachine.Initialize(stateMachine.${
      enabledStates[0]?.name.toLowerCase() || "idle"
    }State);
}`
    : `// En tu clase principal
${className}StateMachine stateMachine = new ${className}StateMachine(this);
stateMachine.Initialize(stateMachine.${
        enabledStates[0]?.name.toLowerCase() || "idle"
      }State);`
}
\`\`\`

### 4. Actualizar Estado

\`\`\`csharp
// En Update()
stateMachine.Update();
\`\`\`

### 5. Transiciones entre Estados

\`\`\`csharp
// Desde cualquier estado o desde el controlador
stateMachine.TransitionTo(stateMachine.${
    enabledStates[1]?.name.toLowerCase() || "move"
  }State);

// Ejemplo en un estado
public void Update()
{
    if (someCondition)
    {
        player.stateMachine.TransitionTo(player.stateMachine.otherState);
    }
}
\`\`\`

---

## 📋 Estados Incluidos

${statesList}

Cada estado implementa:
- **Enter()**: Se ejecuta al entrar al estado
- **Update()**: Se ejecuta cada frame mientras está activo
- **Exit()**: Se ejecuta al salir del estado

---

## 💡 Casos de Uso Comunes

- **Personajes**: Idle → Walk → Run → Jump → Fall
- **Enemigos (IA)**: Patrol → Chase → Attack → Retreat
- **UI**: Closed → Opening → Open → Closing
- **Juego**: Menu → Playing → Paused → GameOver

---

## 🔄 Flujo de Transición

1. Se llama a \`stateMachine.TransitionTo(nextState)\`
2. Se ejecuta \`CurrentState.Exit()\`
3. Se actualiza \`CurrentState = nextState\`
4. Se ejecuta \`nextState.Enter()\`
5. Cada frame se ejecuta \`CurrentState.Update()\`

---

## ⚠️ Notas Importantes

✅ **Cada estado es una clase separada** para mejor organización

✅ **Las transiciones son explícitas** - llama a TransitionTo() manualmente

✅ **Los estados tienen referencia** al ${
    includeController ? "controlador" : "contexto"
  } para acceder a datos

⚠️ **Solo un estado activo** a la vez

⚠️ **Llama a Update()** en cada frame para actualizar el estado actual

---

## 🤖 Información para Agentes de IA

Este README contiene la implementación completa del patrón State Machine para Unity con la siguiente configuración:

- **Pattern**: State Machine
- **Context Class**: ${className}
- **Language**: C#
- **Engine**: Unity
- **Files**: ${Object.keys(tempNames).filter((k) => k !== "readme").length}
- **States**: ${enabledStates.length}
- **Callbacks**: ${enabledCallbacks.length}
- **Include Controller**: ${includeController}

El código está listo para ser copiado y usado directamente en Unity. Todos los archivos necesarios están incluidos arriba.

---

*Generado con Design Patterns Platform*  
*https://design-patterns-platform.vercel.app*
`;
}
