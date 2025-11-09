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

  // Generate README.md
  const readmeContent = generateObjectPoolReadme(options);
  files.readme = readmeContent;
  names.readme = "README.md";

  return { files, names };
}

function generateObjectPoolReadme(options: ObjectPoolOptions): string {
  const {
    className,
    variant,
    initPoolSize,
    defaultCapacity,
    maxSize,
    collectionCheck,
    includeExample,
  } = options;

  const variantDescription =
    variant === "custom"
      ? "Custom Stack - Pool mínimo con Stack (sin dependencias)"
      : "Generic UnityEngine.Pool - Pool genérico con API de Unity";

  const filesList =
    variant === "custom"
      ? `- ${className}Pool.cs (Pool con Stack)
- Pooled${className}.cs (Objeto pooleable)`
      : `- ${className}Pool.cs (Pool genérico)
- IPooledWithRef.cs (Interface para auto-release)
${
  includeExample
    ? `- Pooled${className}.cs (Ejemplo de objeto pooleable)
- ${className}Spawner.cs (Ejemplo de spawner/gun)`
    : ""
}`;

  const configSection =
    variant === "custom"
      ? `
## Configuración

- **Tamaño Inicial del Pool**: ${initPoolSize} objetos pre-inicializados
`
      : `
## Configuración

- **Capacidad por Defecto**: ${defaultCapacity} objetos
- **Tamaño Máximo**: ${maxSize} objetos
- **Collection Check**: ${
          collectionCheck ? "✅ Habilitado" : "❌ Deshabilitado"
        } (validación de duplicados en desarrollo)
- **Incluir Ejemplos**: ${includeExample ? "✅ Sí" : "❌ No"}
`;

  const usageExample =
    variant === "custom"
      ? `\`\`\`csharp
// Configurar en el Inspector
[SerializeField] private ${className}Pool pool;

// Obtener objeto del pool
Pooled${className} item = pool.Get();
item.transform.position = spawnPoint.position;

// Devolver al pool cuando ya no se necesita
item.Release();
\`\`\``
      : `\`\`\`csharp
// Configurar en el Inspector
[SerializeField] private ${className}Pool<Pooled${className}> pool;

// Obtener objeto del pool
Pooled${className} item = pool.Get();
item.transform.position = spawnPoint.position;

// Devolver al pool (puede ser automático si implementa IPooledWithRef)
item.Release();
\`\`\``;

  return `# ${className} Pool - Object Pool Pattern

Patrón de diseño Object Pool generado para Unity.

## Descripción

Este código implementa el patrón Object Pool en Unity, una técnica de optimización que reutiliza objetos pre-inicializados en lugar de crear y destruir instancias continuamente.

El Object Pool es ideal para elementos transitorios como proyectiles, efectos de partículas, enemigos que respawnean, etc.

## Variante Seleccionada

**${variantDescription}**
${configSection}
## Archivos Generados

${filesList}

## ¿Por qué usar Object Pool?

### Ventajas

✅ **Optimización de Rendimiento**: Reduce la presión sobre el Garbage Collector  
✅ **Gestión de Memoria**: Previene fragmentación de memoria  
✅ **Comportamiento Predecible**: Evita picos de frame rate  
✅ **Control de Recursos**: Limita el número máximo de objetos activos  

### Problemas que Resuelve

❌ Instanciación y destrucción frecuente (costosa)  
❌ Picos de lag por Garbage Collection  
❌ Fragmentación de memoria  
❌ Dificultad para limitar objetos activos  

## Uso

### Configuración Inicial

1. Crea un GameObject vacío en tu escena
2. Añade el componente \`${className}Pool${
    variant === "generic" ? "<Pooled" + className + ">" : ""
  }\`
3. Asigna el prefab de ${
    variant === "custom" ? "Pooled" + className : className
  } en el Inspector
${
  variant === "generic"
    ? `4. Ajusta defaultCapacity y maxSize según tus necesidades`
    : `4. Configura el initPoolSize (tamaño inicial del pool)`
}

### Obtener Objetos del Pool

${usageExample}

### Devolver Objetos al Pool

${
  variant === "custom"
    ? `\`\`\`csharp
// Opción 1: Desde el objeto pooleable
public class Pooled${className} : MonoBehaviour
{
    void OnBecameInvisible()
    {
        Release(); // Auto-release cuando sale de pantalla
    }
}
\`\`\``
    : `\`\`\`csharp
// Opción 1: Auto-release (si implementa IPooledWithRef)
public class Pooled${className} : MonoBehaviour, IPooledWithRef<Pooled${className}>
{
    private IObjectPool<Pooled${className}> pool;
    
    public void SetPool(IObjectPool<Pooled${className}> p)
    {
        pool = p;
    }
    
    void OnBecameInvisible()
    {
        Release(); // Auto-release
    }
    
    public void Release()
    {
        if (pool != null)
            pool.Release(this);
    }
}

// Opción 2: Manual desde el spawner
pool.Release(item);
\`\`\``
}

## Casos de Uso Comunes

- 🔫 Proyectiles y Balas
- ✨ Efectos de Partículas
- 👾 Enemigos que respawnean
- 🎨 Objetos de UI temporales
- 🔊 Audio Sources para efectos de sonido
- 💥 Explosiones y efectos visuales

## Flujo del Patrón

1. **Inicialización**: El pool crea ${
    variant === "custom" ? initPoolSize : defaultCapacity
  } objetos desactivados
2. **Get()**: Obtiene un objeto del pool y lo activa
   - Si el pool está vacío, ${
     variant === "custom"
       ? "crea una nueva instancia"
       : "crea o devuelve null según configuración"
   }
3. **Uso**: El objeto se usa normalmente
4. **Release()**: Devuelve el objeto al pool y lo desactiva
5. **Reutilización**: El objeto está listo para ser usado nuevamente

## Notas Importantes

${
  variant === "custom"
    ? `⚠️ **Pool Custom**: Si el pool se vacía, creará nuevas instancias automáticamente

✅ **Sin límite máximo**: El pool crecerá según demanda

🎯 **Ideal para**: Proyectos simples sin dependencias externas`
    : `⚠️ **Tamaño Máximo**: El pool no creará más de ${maxSize} objetos

${
  collectionCheck
    ? "✅ **Collection Check habilitado**: Detecta si intentas devolver el mismo objeto dos veces (solo en desarrollo)"
    : ""
}

🎯 **Ideal para**: Proyectos que requieren control preciso del pool`
}

## Ejemplo de Implementación Completa

### Paso 1: Crear el Prefab

1. Crea un GameObject (ej. ${className})
2. Añade el componente Pooled${className}
3. Añade componentes necesarios (Rigidbody, Collider, etc.)
4. Crea un Prefab desde el GameObject

### Paso 2: Configurar el Pool

1. Crea un GameObject vacío "Pools"
2. Añade ${className}Pool${variant === "generic" ? `<Pooled${className}>` : ""}
3. Asigna el prefab creado en el campo correspondiente

### Paso 3: Usar en tu Código

${
  variant === "custom"
    ? `\`\`\`csharp
public class Gun : MonoBehaviour
{
    [SerializeField] private ${className}Pool pool;
    [SerializeField] private Transform spawnPoint;
    
    void Shoot()
    {
        Pooled${className} bullet = pool.Get();
        bullet.transform.SetPositionAndRotation(
            spawnPoint.position, 
            spawnPoint.rotation
        );
        
        // Configurar velocidad, etc.
        Rigidbody rb = bullet.GetComponent<Rigidbody>();
        rb.velocity = spawnPoint.forward * 20f;
    }
}
\`\`\``
    : `\`\`\`csharp
public class ${className}Spawner : MonoBehaviour
{
    [SerializeField] private ${className}Pool<Pooled${className}> pool;
    [SerializeField] private Transform spawnPoint;
    
    void Shoot()
    {
        Pooled${className} item = pool.Get();
        item.transform.SetPositionAndRotation(
            spawnPoint.position,
            spawnPoint.rotation
        );
        
        // Configurar velocidad, etc.
        Rigidbody rb = item.GetComponent<Rigidbody>();
        rb.velocity = spawnPoint.forward * 20f;
    }
}
\`\`\``
}

---

*Generado con Design Patterns Platform - Unity Pattern Generator*
`;
}
