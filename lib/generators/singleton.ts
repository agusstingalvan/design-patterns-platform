export type SingletonVariant = "minimal" | "persistent" | "generic";

export interface SingletonOptions {
  className: string;
  variant: SingletonVariant;
  persistence: boolean;
  lazyInstantiation: boolean;
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
  const { className, variant, persistence, lazyInstantiation } = options;
  const files: GeneratedFiles = {};
  const names: FileNames = {};

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
    }
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
    }
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
    // Add your custom fields and methods here
}`;
    files.implementation = concreteImplementation;
    names.implementation = `${className}.cs`;
  }

  return { files, names };
}
