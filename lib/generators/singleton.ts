export type SingletonVariant = "minimal" | "persistent" | "generic";

export interface CallbackMethod {
  name: string;
  enabled: boolean;
  paramType: string;
  paramName: string;
}

export interface SingletonOptions {
  className: string;
  variant: SingletonVariant;
  persistence: boolean;
  lazyInstantiation: boolean;
  callbackMethods: CallbackMethod[];
}

export interface GeneratedFiles {
  [key: string]: string;
}

export interface FileNames {
  [key: string]: string;
}

export function generateSingletonCode(options: SingletonOptions): {
  files: GeneratedFiles;
  names: FileNames;
} {
  const {
    className,
    variant,
    persistence,
    lazyInstantiation,
    callbackMethods,
  } = options;
  const files: GeneratedFiles = {};
  const names: FileNames = {};

  // Filter enabled callbacks
  const enabledCallbacks = callbackMethods.filter((cb) => cb.enabled);

  // Generate callback methods code
  const generateCallbackMethods = () => {
    if (enabledCallbacks.length === 0) return "";

    return (
      "\n" +
      enabledCallbacks
        .map((callback) => {
          const params =
            callback.paramType && callback.paramName
              ? `${callback.paramType} ${callback.paramName}`
              : "";
          return `    
    private void ${callback.name}(${params})
    {
        // Add your ${callback.name} implementation here
    }`;
        })
        .join("\n")
    );
  };

  if (variant === "minimal") {
    // Código mínimo del patrón
    const minimalCode = `using UnityEngine;

public class ${className} : MonoBehaviour
{
    public static ${className} Instance;
    
    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }${generateCallbackMethods()}
}`;
    files.main = minimalCode;
    names.main = `${className}.cs`;
  } else if (variant === "persistent") {
    // Persistence and lazy instantiation
    const persistentCode = `using UnityEngine;

public class ${className} : MonoBehaviour
{
    private static ${className} instance;
    
    public static ${className} Instance
    {
        get
        {
            ${
              lazyInstantiation
                ? `if (instance == null)
            {
                SetupInstance();
            }`
                : ""
            }
            return instance;
        }
    }
    
    private void Awake()
    {
        if (instance == null)
        {
            instance = this;${
              persistence
                ? "\n            DontDestroyOnLoad(this.gameObject);"
                : ""
            }
        }
        else
        {
            Destroy(gameObject);
        }
    }${
      lazyInstantiation
        ? `
    
    private static void SetupInstance()
    {
        instance = FindObjectOfType<${className}>();
        
        if (instance == null)
        {
            GameObject gameObj = new GameObject();
            gameObj.name = "${className}";
            instance = gameObj.AddComponent<${className}>();${
            persistence ? "\n            DontDestroyOnLoad(gameObj);" : ""
          }
        }
    }`
        : ""
    }${generateCallbackMethods()}
}`;
    files.main = persistentCode;
    names.main = `${className}.cs`;
  } else if (variant === "generic") {
    // Generic singleton base class
    const genericBaseCode = `using UnityEngine;

public class Singleton<T> : MonoBehaviour where T : Component
{
    private static T instance;
    
    public static T Instance
    {
        get
        {
            if (instance == null)
            {
                instance = (T)FindObjectOfType(typeof(T));
                
                if (instance == null)
                {
                    SetupInstance();
                }
            }
            return instance;
        }
    }
    
    public virtual void Awake()
    {
        RemoveDuplicates();
    }
    
    private static void SetupInstance()
    {
        instance = (T)FindObjectOfType(typeof(T));
        
        if (instance == null)
        {
            GameObject gameObj = new GameObject();
            gameObj.name = typeof(T).Name;
            instance = gameObj.AddComponent<T>();
            DontDestroyOnLoad(gameObj);
        }
    }
    
    private void RemoveDuplicates()
    {
        if (instance == null)
        {
            instance = this as T;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
}`;
    files.base = genericBaseCode;
    names.base = "Singleton.cs";

    // Concrete implementation example
    const concreteImplementation = `using UnityEngine;

public class ${className} : Singleton<${className}>
{
    // Implementation of ${className}
    // Add your custom fields and methods here${generateCallbackMethods()}
}`;
    files.implementation = concreteImplementation;
    names.implementation = `${className}.cs`;
  }

  // Generate README.md
  const readmeContent = generateSingletonReadme(options);
  files.readme = readmeContent;
  names.readme = "README.md";

  return { files, names };
}

function generateSingletonReadme(options: SingletonOptions): string {
  const {
    className,
    variant,
    persistence,
    lazyInstantiation,
    callbackMethods,
  } = options;
  const enabledCallbacks = callbackMethods.filter((cb) => cb.enabled);

  const variantDescription =
    variant === "minimal"
      ? "Código Mínimo - Patrón esencial y básico"
      : variant === "persistent"
      ? "Persistente y Lazy - Con persistencia y creación perezosa"
      : "Genérico Reutilizable - Clase base genérica";

  // Generar el código completo del patrón (sin incluir readme)
  const tempFiles: GeneratedFiles = {};
  const tempNames: FileNames = {};
  
  // Regenerar archivos temporalmente
  const enabledCallbacksTemp = callbackMethods.filter((cb) => cb.enabled);
  const generateCallbackMethods = () => {
    if (enabledCallbacksTemp.length === 0) return "";
    return (
      "\n" +
      enabledCallbacksTemp
        .map((callback) => {
          const params =
            callback.paramType && callback.paramName
              ? `${callback.paramType} ${callback.paramName}`
              : "";
          return `    private void ${callback.name}(${params})
    {
        // Implement ${callback.name} logic
    }`;
        })
        .join("\n\n")
    );
  };

  if (variant === "minimal") {
    const minimalCode = `using UnityEngine;

public class ${className} : MonoBehaviour
{
    public static ${className} Instance { get; private set; }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
        }
        else
        {
            Destroy(gameObject);
        }
    }${generateCallbackMethods()}
}`;
    tempFiles.main = minimalCode;
    tempNames.main = `${className}.cs`;
  } else if (variant === "persistent") {
    const persistentCode = `using UnityEngine;

public class ${className} : MonoBehaviour
{
    public static ${className} Instance { get; private set; }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            ${persistence ? "DontDestroyOnLoad(gameObject);" : ""}
        }
        else
        {
            Destroy(gameObject);
        }
    }${
      lazyInstantiation
        ? `

    public static ${className} GetInstance()
    {
        if (Instance == null)
        {
            GameObject go = new GameObject("${className}");
            Instance = go.AddComponent<${className}>();
        }
        return Instance;
    }`
        : ""
    }${generateCallbackMethods()}
}`;
    tempFiles.main = persistentCode;
    tempNames.main = `${className}.cs`;
  } else if (variant === "generic") {
    const genericBaseCode = `using UnityEngine;

public class Singleton<T> : MonoBehaviour where T : MonoBehaviour
{
    private static T instance;

    public static T Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<T>();
                if (instance == null)
                {
                    Debug.LogWarning($"No instance of {typeof(T)} found in the scene.");
                }
            }
            return instance;
        }
    }

    protected virtual void Awake()
    {
        RemoveDuplicates();
    }

    private void RemoveDuplicates()
    {
        if (instance == null)
        {
            instance = this as T;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
}`;
    tempFiles.base = genericBaseCode;
    tempNames.base = "Singleton.cs";

    const concreteImplementation = `using UnityEngine;

public class ${className} : Singleton<${className}>
{
    // Implementation of ${className}
    // Add your custom fields and methods here${generateCallbackMethods()}
}`;
    tempFiles.implementation = concreteImplementation;
    tempNames.implementation = `${className}.cs`;
  }

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

  return `# ${className} - Singleton Pattern

> **Patrón de diseño Singleton generado para Unity**  
> Este archivo contiene todo el código necesario para implementar el patrón en tu proyecto.

---

## ⚙️ Configuración del Patrón

- **Clase Principal**: \`${className}\`
- **Variante**: ${variantDescription}
- **Motor**: Unity (C#)
${
  variant === "persistent"
    ? `- **DontDestroyOnLoad**: ${persistence ? "✅ Habilitado" : "❌ Deshabilitado"}
- **Lazy Instantiation**: ${lazyInstantiation ? "✅ Habilitado" : "❌ Deshabilitado"}`
    : ""
}
${callbacksList}

---

## 📖 Descripción

El patrón **Singleton** asegura que una clase tenga solo una instancia y proporciona un punto de acceso global a ella.

${
  variant === "minimal"
    ? "**Variante Mínima**: Implementación básica y esencial del patrón."
    : variant === "persistent"
    ? "**Variante Persistente**: Incluye persistencia entre escenas y opciones de inicialización."
    : "**Variante Genérica**: Usa una clase base genérica reutilizable Singleton<T>."
}

---

## 📦 Archivos del Patrón

${codeSection}

---

## 🚀 Instrucciones de Uso

### 1. Copiar Archivos

${variant === "generic" ? "Copia **ambos archivos** (Singleton.cs y " + className + ".cs)" : "Copia **el archivo** " + className + ".cs"} a tu proyecto Unity en la carpeta \`Assets/Scripts\`.

### 2. Configuración en Unity

${
  variant === "generic"
    ? `- ${className} ya hereda de Singleton<${className}> (no necesitas MonoBehaviour)
- Crea un GameObject vacío en tu escena
- Añade el componente ${className} al GameObject`
    : `- Crea un GameObject vacío en tu escena
- Añade el componente ${className} al GameObject`
}

### 3. Acceder al Singleton

\`\`\`csharp
// Desde cualquier script
${className}.Instance.YourMethod();

// Ejemplo en otro componente
public class Player : MonoBehaviour
{
    void Start()
    {
        ${className}.Instance.Initialize();
    }
}
\`\`\`

${
  lazyInstantiation
    ? `
### 4. Instanciación Automática (Lazy)

No es necesario tener el GameObject en la escena. La instancia se creará automáticamente cuando se acceda a ella por primera vez:

\`\`\`csharp
// Se crea automáticamente si no existe
${className}.GetInstance().DoSomething();
\`\`\`
`
    : ""
}

---

## 💡 Casos de Uso Comunes

- **Game Manager**: Gestión global del estado del juego
- **Audio Manager**: Sistema centralizado de audio
- **Save/Load System**: Sistema de guardado y carga
- **Input Manager**: Gestión de entrada del jugador
- **Scene Manager**: Control de transiciones entre escenas
- **UI Manager**: Gestión de interfaces de usuario

---

## ⚠️ Notas Importantes

${
  variant === "minimal"
    ? `
⚠️ Debes tener **exactamente un** GameObject con ${className} en tu escena inicial.

⚠️ Si cambias de escena, la instancia se **destruirá** (no persiste).
`
    : variant === "persistent"
    ? `
✅ La instancia **persiste entre escenas**${persistence ? "" : " (si DontDestroyOnLoad está habilitado)"}.

${
  lazyInstantiation
    ? "✅ La instancia se creará **automáticamente** si no existe."
    : "⚠️ Debes tener un GameObject con ${className} en la **escena inicial**."
}

⚠️ Solo debe existir **una instancia** del Singleton.
`
    : `
✅ Usa Singleton<T> como clase base para **cualquier** clase que necesite ser Singleton.

✅ La instancia **persiste entre escenas** automáticamente.

⚠️ Solo debe existir **una instancia** por tipo de Singleton.
`
}

---

## 🤖 Información para Agentes de IA

Este README contiene la implementación completa del patrón Singleton para Unity con la siguiente configuración:

- **Pattern**: Singleton
- **Variant**: ${variant}
- **Language**: C#
- **Engine**: Unity
- **Files**: ${Object.keys(tempNames).length}
- **Callbacks**: ${enabledCallbacks.length}

El código está listo para ser copiado y usado directamente en Unity. Todos los archivos necesarios están incluidos arriba.

---

*Generado con Design Patterns Platform*  
*https://design-patterns-platform.vercel.app*
`;
}
