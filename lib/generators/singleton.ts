export interface SingletonOptions {
  className: string;
  lazyInit: boolean;
  threadSafe: boolean;
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
  const { className, lazyInit, threadSafe } = options;
  const files: GeneratedFiles = {};
  const names: FileNames = {};

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
        ? `// Called when the singleton is first accessed
private void Initialize()
{
    // Add initialization code here
    Debug.Log("${className} initialized");
}`
        : ""
    }
}`;

  files.main = singletonCode;
  names.main = `${className}.cs`;

  return { files, names };
}
