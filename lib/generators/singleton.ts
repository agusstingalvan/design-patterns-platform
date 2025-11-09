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

  const filesList =
    variant === "generic"
      ? `- Singleton.cs (Base genérica)
- ${className}.cs (Implementación concreta)`
      : `- ${className}.cs`;

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

  const usageExample =
    variant === "generic"
      ? `// Acceder a la instancia desde cualquier lugar
${className}.Instance.YourMethod();

// El Singleton<T> se encarga de la gestión automática
// Solo hereda de Singleton<${className}> en lugar de MonoBehaviour`
      : `// Acceder a la instancia desde cualquier lugar
${className}.Instance.YourMethod();

// Asegúrate de tener un GameObject con el script ${className} en la escena`;

  return `# ${className} - Singleton Pattern

Patrón de diseño Singleton generado para Unity.

## Descripción

Este código implementa el patrón Singleton en Unity usando la variante: **${variantDescription}**.

El patrón Singleton asegura que una clase tenga solo una instancia y proporciona un punto de acceso global a ella.

## Variante Seleccionada

**${
    variant === "minimal"
      ? "Código Mínimo"
      : variant === "persistent"
      ? "Persistente y Lazy"
      : "Genérico Reutilizable"
  }**

${
  variant === "persistent"
    ? `
### Opciones Configuradas:
- **DontDestroyOnLoad**: ${persistence ? "✅ Habilitado" : "❌ Deshabilitado"}
- **Lazy Instantiation**: ${
        lazyInstantiation ? "✅ Habilitado" : "❌ Deshabilitado"
      }
`
    : ""
}

## Archivos Generados

${filesList}
${callbacksList}
## Uso

${usageExample}

## Casos de Uso Comunes

- Game Managers
- Audio Managers
- Save/Load Systems
- Input Managers
- Scene Managers

## Implementación

1. ${
    variant === "generic" ? "Ambos archivos" : "El archivo"
  } debe estar en tu proyecto de Unity (dentro de la carpeta Assets/Scripts)
2. ${
    variant === "generic"
      ? `Hereda de Singleton<${className}> en lugar de MonoBehaviour`
      : `Asegúrate de tener un GameObject con el componente ${className} en tu escena`
  }
3. Accede a la instancia usando \`${className}.Instance\`
4. Agrega tu lógica personalizada en los métodos y campos de ${className}

## Notas Importantes

⚠️ **Solo debe existir una instancia de ${className} en la escena${
    persistence ? " (persiste entre escenas)" : ""
  }**

${
  variant === "persistent" && lazyInstantiation
    ? "✅ La instancia se creará automáticamente si no existe\n"
    : variant === "persistent" && !lazyInstantiation
    ? "⚠️ Debes tener un GameObject con ${className} en la escena inicial\n"
    : ""
}

---

*Generado con Design Patterns Platform - Unity Pattern Generator*
`;
}
