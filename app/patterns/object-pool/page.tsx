import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowLeft, Code2, Gamepad2, GitFork } from "lucide-react";
import Link from "next/link";

export default function ObjectPoolPatternPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Link href="/patterns">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <Gamepad2 className="h-6 w-6" />
                  Object Pool Pattern
                </h1>
                <p className="text-muted-foreground">
                  Optimize performance by reusing objects instead of creating
                  and destroying them frequently
                </p>
              </div>
            </div>
            <Tabs defaultValue="overview">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="diagram">Diagram</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    What is the Object Pool Pattern?
                  </h2>
                  <p>
                    El patrón Object Pool es una técnica de optimización de tipo
                    estructural que utiliza un conjunto de objetos
                    pre-inicializados ("pooled") y listos para su uso, evitando
                    las costosas operaciones de instanciación y destrucción
                    frecuentes en tiempo de ejecución.
                  </p>
                  <p>
                    Se aplica a elementos transitorios como balas, proyectiles o
                    efectos visuales. La implementación esencial en Unity se
                    facilita enormemente con la API UnityEngine.Pool, que
                    abstrae la complejidad de gestionar la cola de objetos.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">When to Use It</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      When you need to create and destroy many objects of the
                      same type frequently (bullets, particles, enemies)
                    </li>
                    <li>
                      When object creation is expensive in terms of performance
                      (memory allocation, initialization)
                    </li>
                    <li>
                      When you want to limit the maximum number of instances of
                      a certain type
                    </li>
                    <li>
                      When dealing with temporary objects that have a short
                      lifetime
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Key Benefits</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Performance Optimization:</strong> Reduces garbage
                      collection pressure and eliminates allocation overhead
                    </li>
                    <li>
                      <strong>Memory Management:</strong> Prevents memory
                      fragmentation and controls memory usage
                    </li>
                    <li>
                      <strong>Predictable Behavior:</strong> Pre-allocated
                      objects avoid frame rate spikes
                    </li>
                    <li>
                      <strong>Resource Control:</strong> Limits maximum number
                      of active objects
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Implementation Variants
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-bold mb-2">Custom Stack Pool</h3>
                      <p className="text-sm text-muted-foreground">
                        Implementación mínima usando Stack{`<T>`}. Ideal para
                        proyectos sin dependencias adicionales y casos simples.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-bold mb-2">
                        Generic UnityEngine.Pool
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Pool genérico usando la API oficial de Unity. Ofrece más
                        control, validación y opciones de configuración.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="implementation" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Custom Stack Implementation
                  </h2>
                  <p>
                    A simple pool using Stack{`<T>`} for basic object pooling
                    without external dependencies:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{`using System.Collections.Generic;
using UnityEngine;

public class ObjectPool : MonoBehaviour
{
    [SerializeField] private uint initPoolSize = 10;
    [SerializeField] private PooledObject prefab;

    private Stack<PooledObject> stack;

    private void Start()
    {
        SetupPool();
    }

    private void SetupPool()
    {
        stack = new Stack<PooledObject>((int)initPoolSize);
        for (int i = 0; i < initPoolSize; i++)
        {
            PooledObject instance = Instantiate(prefab);
            instance.SetPool(this);
            instance.gameObject.SetActive(false);
            stack.Push(instance);
        }
    }

    public PooledObject Get()
    {
        if (stack.Count == 0)
        {
            PooledObject newInstance = Instantiate(prefab);
            newInstance.SetPool(this);
            return newInstance;
        }

        PooledObject nextInstance = stack.Pop();
        nextInstance.gameObject.SetActive(true);
        return nextInstance;
    }

    public void ReturnToPool(PooledObject instance)
    {
        instance.gameObject.SetActive(false);
        stack.Push(instance);
    }
}`}</code>
                  </pre>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Generic UnityEngine.Pool Implementation
                  </h2>
                  <p>
                    Using Unity's built-in pooling system for better control and
                    features:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{`using UnityEngine;
using UnityEngine.Pool;

public class GenericPool<T> : MonoBehaviour where T : Component
{
    [SerializeField] private T prefab;
    [SerializeField] private bool collectionCheck = true;
    [SerializeField] private int defaultCapacity = 20;
    [SerializeField] private int maxSize = 100;

    private IObjectPool<T> pool;

    private void Awake()
    {
        pool = new ObjectPool<T>(
            CreateItem, OnGetFromPool, OnReleaseToPool, OnDestroyPooledObject,
            collectionCheck, defaultCapacity, maxSize
        );
    }

    public T Get() => pool.Get();
    public void Release(T item) => pool.Release(item);

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
}`}</code>
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="examples" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Pooled Projectile Example
                  </h2>
                  <p>Example of a self-releasing pooled projectile:</p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{`using UnityEngine;
using UnityEngine.Pool;

public class PooledProjectile : MonoBehaviour, IPooledWithRef<PooledProjectile>
{
    private IObjectPool<PooledProjectile> pool;

    public void SetPool(IObjectPool<PooledProjectile> p)
    {
        pool = p;
    }

    // Call this when the projectile "dies" or goes off-screen
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

    private void OnBecameInvisible()
    {
        // Auto-release when off-screen
        Release();
    }
}`}</code>
                  </pre>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Gun/Spawner Example</h2>
                  <p>
                    Example of a weapon that uses the pool to spawn projectiles:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code>{`using UnityEngine;

public class Gun : MonoBehaviour
{
    [SerializeField] private GenericPool<PooledProjectile> projectilePool;
    [SerializeField] private Transform spawnPoint;
    [SerializeField] private float shootForce = 20f;

    private void Update()
    {
        if (Input.GetButtonDown("Fire1"))
        {
            Shoot();
        }
    }

    private void Shoot()
    {
        PooledProjectile projectile = projectilePool.Get();
        projectile.transform.SetPositionAndRotation(
            spawnPoint.position,
            spawnPoint.rotation
        );
        
        // Initialize physics/velocity
        Rigidbody rb = projectile.GetComponent<Rigidbody>();
        if (rb != null)
        {
            rb.velocity = spawnPoint.forward * shootForce;
        }
    }
}`}</code>
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="diagram" className="space-y-6 py-4">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">
                    Object Pool Pattern Diagram
                  </h2>
                  <p>
                    Visualize the structure and interactions of the Object Pool
                    pattern:
                  </p>
                  <div className="flex flex-col gap-4">
                    <Link href="/diagram?template=object-pool">
                      <Button className="w-full">
                        <GitFork className="mr-2 h-4 w-4" />
                        Open Interactive Diagram
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex gap-4">
              <Link href="/generator">
                <Button>
                  <Code2 className="mr-2 h-4 w-4" />
                  Generate Code
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
