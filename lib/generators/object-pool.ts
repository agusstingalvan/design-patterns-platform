export interface ObjectPoolOptions {
  className: string;
  variant: "custom" | "generic";
  initPoolSize: number;
  defaultCapacity: number;
  maxSize: number;
  collectionCheck: boolean;
  includeExample: boolean;
}

export interface GeneratedFiles {
  [key: string]: string;
}

export interface FileNames {
  [key: string]: string;
}

export function generateObjectPoolCode(options: ObjectPoolOptions): {
  files: GeneratedFiles;
  names: FileNames;
} {
  const {
    className,
    variant,
    initPoolSize,
    defaultCapacity,
    maxSize,
    collectionCheck,
    includeExample,
  } = options;
  const files: GeneratedFiles = {};
  const names: FileNames = {};

  if (variant === "custom") {
    // A) Pool "custom" mínimo (Stack)
    const poolCode = `using System.Collections.Generic;
using UnityEngine;

public class ${className}Pool : MonoBehaviour
{
    [SerializeField] private uint initPoolSize = ${initPoolSize};
    [SerializeField] private Pooled${className} prefab;

    private Stack<Pooled${className}> stack;

    private void Start()
    {
        SetupPool();
    }

    private void SetupPool()
    {
        stack = new Stack<Pooled${className}>((int)initPoolSize);
        for (int i = 0; i < initPoolSize; i++)
        {
            Pooled${className} instance = Instantiate(prefab);
            instance.SetPool(this);
            instance.gameObject.SetActive(false);
            stack.Push(instance);
        }
    }

    public Pooled${className} Get()
    {
        if (stack.Count == 0)
        {
            Pooled${className} newInstance = Instantiate(prefab);
            newInstance.SetPool(this);
            // Se devuelve activo (listo para usar)
            return newInstance;
        }

        Pooled${className} nextInstance = stack.Pop();
        nextInstance.gameObject.SetActive(true);
        return nextInstance;
    }

    public void ReturnToPool(Pooled${className} instance)
    {
        instance.gameObject.SetActive(false);
        stack.Push(instance);
    }
}`;
    files.pool = poolCode;
    names.pool = `${className}Pool.cs`;

    // PooledObject class
    const pooledObjectCode = `using UnityEngine;

public class Pooled${className} : MonoBehaviour
{
    private ${className}Pool pool;

    public void SetPool(${className}Pool p)
    {
        pool = p;
    }

    public void Release()
    {
        if (pool != null)
        {
            pool.ReturnToPool(this);
        }
    }
}`;
    files.pooledObject = pooledObjectCode;
    names.pooledObject = `Pooled${className}.cs`;
  } else if (variant === "generic") {
    // B) Versión con UnityEngine.Pool (genérica)
    const genericPoolCode = `using UnityEngine;
using UnityEngine.Pool;

public class ${className}Pool<T> : MonoBehaviour where T : Component
{
    [SerializeField] private T prefab;
    [SerializeField] private bool collectionCheck = ${collectionCheck};
    [SerializeField] private int defaultCapacity = ${defaultCapacity};
    [SerializeField] private int maxSize = ${maxSize};

    private IObjectPool<T> pool;

    private void Awake()
    {
        pool = new ObjectPool<T>(
            CreateItem, OnGetFromPool, OnReleaseToPool, OnDestroyPooledObject,
            collectionCheck, defaultCapacity, maxSize
        );
    }

    public T Get()
    {
        return pool.Get();
    }

    public void Release(T item)
    {
        pool.Release(item);
    }

    private T CreateItem()
    {
        T instance = Instantiate(prefab);
        IPooledWithRef<T> refHolder = instance as IPooledWithRef<T>;
        if (refHolder != null)
        {
            refHolder.SetPool(pool);
        }
        return instance;
    }

    private void OnGetFromPool(T item)
    {
        item.gameObject.SetActive(true);
    }

    private void OnReleaseToPool(T item)
    {
        item.gameObject.SetActive(false);
    }

    private void OnDestroyPooledObject(T item)
    {
        Destroy(item.gameObject);
    }
}`;
    files.genericPool = genericPoolCode;
    names.genericPool = `${className}Pool.cs`;

    // Interface IPooledWithRef
    const interfaceCode = `using UnityEngine;
using UnityEngine.Pool;

/// <summary>
/// Opcional: implementalo en tus items para poder auto-liberarse (Release) con referencia al pool.
/// </summary>
public interface IPooledWithRef<T> where T : Component
{
    void SetPool(IObjectPool<T> p);
}`;
    files.interface = interfaceCode;
    names.interface = `IPooledWithRef.cs`;

    // Include example files if requested
    if (includeExample) {
      // Ejemplo de "proyectil" que se auto-libera
      const projectileCode = `using UnityEngine;
using UnityEngine.Pool;

public class Pooled${className} : MonoBehaviour, IPooledWithRef<Pooled${className}>
{
    private IObjectPool<Pooled${className}> pool;

    public void SetPool(IObjectPool<Pooled${className}> p)
    {
        pool = p;
    }

    // Llámalo cuando "muere" o sale de pantalla
    public void Release()
    {
        if (pool != null)
        {
            pool.Release(this);
        }
        else
        {
            gameObject.SetActive(false);
        }
    }
}`;
      files.pooledObject = projectileCode;
      names.pooledObject = `Pooled${className}.cs`;

      // Ejemplo de "spawner/gun" que usa el pool
      const spawnerCode = `using UnityEngine;

public class ${className}Spawner : MonoBehaviour
{
    [SerializeField] private ${className}Pool<Pooled${className}> pool;

    private void FixedUpdate()
    {
        // Condición de spawn/disparo...
        // if (shouldSpawn)
        // {
        //     Pooled${className} item = pool.Get();
        //     item.transform.SetPositionAndRotation(transform.position, transform.rotation);
        //     // Inicializar física/velocidad aquí
        // }
    }
}`;
      files.spawner = spawnerCode;
      names.spawner = `${className}Spawner.cs`;
    }
  }

  return { files, names };
}
