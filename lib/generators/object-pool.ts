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

  // Generar archivos manualmente para evitar recursión infinita
  const tempFiles: GeneratedFiles = {};
  const tempNames: FileNames = {};

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
    tempFiles.pool = poolCode;
    tempNames.pool = `${className}Pool.cs`;

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
    tempFiles.pooledObject = pooledObjectCode;
    tempNames.pooledObject = `Pooled${className}.cs`;
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
    tempFiles.genericPool = genericPoolCode;
    tempNames.genericPool = `${className}Pool.cs`;

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
    tempFiles.interface = interfaceCode;
    tempNames.interface = `IPooledWithRef.cs`;

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
      tempFiles.pooledObject = projectileCode;
      tempNames.pooledObject = `Pooled${className}.cs`;

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
      tempFiles.spawner = spawnerCode;
      tempNames.spawner = `${className}Spawner.cs`;
    }
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

  const variantDescription =
    variant === "custom"
      ? "Custom Stack - Pool mínimo sin dependencias externas"
      : "Generic UnityEngine.Pool - Pool con API oficial de Unity";

  return `# ${className} Pool - Object Pool Pattern

> **Patrón Object Pool generado para Unity**  
> Este archivo contiene todo el código necesario para implementar el patrón en tu proyecto.

---

## ⚙️ Configuración del Patrón

- **Clase Principal**: \`${className}\`
- **Patrón**: Object Pool
- **Motor**: Unity (C#)
- **Variante**: ${variantDescription}
${
  variant === "custom"
    ? `- **Tamaño Inicial**: ${initPoolSize} objetos`
    : `- **Capacidad por Defecto**: ${defaultCapacity} objetos
- **Tamaño Máximo**: ${maxSize} objetos
- **Collection Check**: ${
        collectionCheck ? "✅ Habilitado" : "❌ Deshabilitado"
      }
- **Incluir Ejemplos**: ${includeExample ? "✅ Sí" : "❌ No"}`
}

---

## 📖 Descripción

El patrón **Object Pool** es una técnica de optimización que reutiliza objetos pre-inicializados en lugar de crear y destruir instancias continuamente. Ideal para elementos transitorios como proyectiles, partículas, enemigos, etc.

### ¿Por qué usar Object Pool?

**Ventajas:**
✅ Reduce presión sobre el Garbage Collector  
✅ Previene fragmentación de memoria  
✅ Evita picos de frame rate  
✅ Controla el número máximo de objetos activos  

**Problemas que Resuelve:**
❌ Instanciación/destrucción frecuente (costosa)  
❌ Lag por Garbage Collection  
❌ Fragmentación de memoria  

---

## 📦 Archivos del Patrón

${codeSection}

---

## 🚀 Instrucciones de Uso

### 1. Copiar Archivos

Copia **todos los archivos** a tu proyecto Unity en la carpeta \`Assets/Scripts\`.

Archivos incluidos:
${
  variant === "custom"
    ? `- ${className}Pool.cs
- Pooled${className}.cs`
    : `- ${className}Pool.cs
- IPooledWithRef.cs
${
  includeExample
    ? `- Pooled${className}.cs (ejemplo)\n- ${className}Spawner.cs (ejemplo)`
    : ""
}`
}

### 2. Crear el Prefab

1. Crea un GameObject en la escena (nombre: ${className})
2. Añade el componente \`Pooled${className}\`
3. Añade componentes necesarios (Rigidbody, Collider, efectos visuales, etc.)
4. Convierte el GameObject en Prefab (arrastra a carpeta Project)

### 3. Configurar el Pool en la Escena

1. Crea un GameObject vacío llamado "Pools" o "${className}Pool"
2. Añade el componente \`${className}Pool${
    variant === "generic" ? `<Pooled${className}>` : ""
  }\`
3. Asigna el prefab creado en el campo \`prefab\`
${
  variant === "custom"
    ? `4. Ajusta \`initPoolSize\` según necesidad (default: ${initPoolSize})`
    : `4. Ajusta \`defaultCapacity\` y \`maxSize\` según necesidad`
}

### 4. Usar en tu Código

#### Obtener objeto del pool

\`\`\`csharp
// Desde tu script (Gun, Spawner, etc.)
[SerializeField] private ${className}Pool${
    variant === "generic" ? `<Pooled${className}>` : ""
  } pool;

void Shoot()
{
    Pooled${className} item = pool.Get();
    item.transform.SetPositionAndRotation(spawnPoint.position, spawnPoint.rotation);
    
    // Configurar velocidad, rotación, etc.
    Rigidbody rb = item.GetComponent<Rigidbody>();
    if (rb != null)
    {
        rb.velocity = spawnPoint.forward * 20f;
    }
}
\`\`\`

#### Devolver objeto al pool

${
  variant === "custom"
    ? `\`\`\`csharp
// Opción 1: Auto-release desde Pooled${className}
void OnBecameInvisible()
{
    Release(); // Devuelve automáticamente al pool
}

// Opción 2: Manual
void OnCollisionEnter(Collision collision)
{
    Release();
}
\`\`\``
    : `\`\`\`csharp
// Opción 1: Auto-release (si implementa IPooledWithRef)
void OnBecameInvisible()
{
    Release();
}

// Opción 2: Manual desde el spawner
void OnProjectileHit(Pooled${className} item)
{
    pool.Release(item);
}
\`\`\``
}

---

## 💡 Casos de Uso Comunes

- 🔫 **Proyectiles y Balas**: Disparos en shooters
- ✨ **Efectos de Partículas**: Explosiones, humo, chispas
- 👾 **Enemigos**: Spawn continuo de enemigos
- 🎨 **UI Temporal**: Notificaciones, popups
- 🔊 **Audio Sources**: Efectos de sonido simultáneos
- 💥 **Efectos Visuales**: Impactos, destellos

---

## 🔄 Flujo del Patrón

1. **Inicialización**: El pool crea ${
    variant === "custom" ? initPoolSize : defaultCapacity
  } objetos desactivados
2. **Get()**: Obtiene un objeto del pool y lo activa (gameObject.SetActive(true))
3. **Uso**: El objeto funciona normalmente en la escena
4. **Release()**: Devuelve el objeto al pool y lo desactiva
5. **Reutilización**: El objeto está listo para usarse de nuevo

---

## ⚠️ Notas Importantes

${
  variant === "custom"
    ? `✅ **Pool dinámico**: Si se vacía, crea nuevas instancias automáticamente

⚠️ **Sin límite máximo**: El pool crecerá según demanda

🎯 **Ideal para**: Proyectos simples, juegos móviles, prototipos rápidos`
    : `⚠️ **Límite máximo**: ${maxSize} objetos - no creará más que eso

${
  collectionCheck
    ? "✅ **Collection Check activo**: Detecta duplicados al devolver (solo en desarrollo)"
    : ""
}

🎯 **Ideal para**: Proyectos con control estricto de memoria y rendimiento`
}

✅ **Devolver al pool**: Siempre llama a \`Release()\` cuando el objeto ya no se necesite

✅ **No destruir**: No uses \`Destroy()\` en objetos pooleados - solo \`Release()\`

⚠️ **Reiniciar estado**: Asegúrate de reiniciar el objeto en \`OnGetFromPool()\` o \`Enter()\`

---

## 🤖 Información para Agentes de IA

Este README contiene la implementación completa del patrón Object Pool para Unity con la siguiente configuración:

- **Pattern**: Object Pool
- **Variant**: ${variant}
- **Pool Class**: ${className}Pool${variant === "generic" ? `<T>` : ""}
- **Pooled Class**: Pooled${className}
- **Language**: C#
- **Engine**: Unity
- **Files**: ${Object.keys(tempNames).filter((k) => k !== "readme").length}
- **Initial Size**: ${variant === "custom" ? initPoolSize : defaultCapacity}
- **Max Size**: ${variant === "custom" ? "Unlimited" : maxSize}

El código está listo para ser copiado y usado directamente en Unity. Todos los archivos necesarios están incluidos arriba.

---

*Generado con Design Patterns Platform*  
*https://design-patterns-platform.vercel.app*
`;
}
