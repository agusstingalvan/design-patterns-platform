import { Button } from "@/components/ui/button";
import { GitFork } from "lucide-react";
import Link from "next/link";

interface State {
  name: string;
  enabled: boolean;
}

interface UsageInfoProps {
  pattern: "singleton" | "state" | "object-pool";
  className: string;
  states?: State[];
  singletonVariant?: "minimal" | "persistent" | "generic";
  objectPoolVariant?: "custom" | "generic";
}

export function UsageInfo({
  pattern,
  className,
  states = [],
  singletonVariant = "minimal",
  objectPoolVariant = "generic",
}: UsageInfoProps) {
  const generateDiagramUrl = () => {
    const params = new URLSearchParams();
    params.append("template", pattern);
    params.append("className", className);

    if (pattern === "state" && states.length > 0) {
      const stateNames = states
        .filter((s) => s.enabled)
        .map((s) => s.name)
        .join(",");
      params.append("states", stateNames);
    }

    return `/diagram?${params.toString()}`;
  };

  return (
    <>
      <h3 className="font-medium">Cómo usar este patrón</h3>
      {pattern === "singleton" && (
        <>
          <p className="text-sm text-muted-foreground">
            El patrón Singleton asegura que una clase tenga solo una instancia y
            proporciona un punto de acceso global a ella.
          </p>

          {singletonVariant === "minimal" && (
            <div className="space-y-2 my-3">
              <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-3 text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Variante: Código Mínimo
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Esta es la implementación más simple del patrón Singleton.
                  Perfecta para casos básicos donde solo necesitas una única
                  instancia sin persistencia entre escenas.
                </p>
              </div>
            </div>
          )}

          {singletonVariant === "persistent" && (
            <div className="space-y-2 my-3">
              <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-3 text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Variante: Persistente y Lazy
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Implementación con persistencia entre escenas
                  (DontDestroyOnLoad) y creación perezosa. Ideal para managers
                  que deben existir durante todo el ciclo de vida del juego.
                </p>
              </div>
            </div>
          )}

          {singletonVariant === "generic" && (
            <div className="space-y-2 my-3">
              <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-3 text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Variante: Genérico Reutilizable
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Clase base genérica que puedes reutilizar para crear múltiples
                  singletons. Genera dos archivos: la clase base Singleton
                  {`<T>`} y tu implementación concreta.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Pasos de Implementación:</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              {singletonVariant === "generic" ? (
                <>
                  <li>Copia la clase base Singleton.cs a tu proyecto</li>
                  <li>Copia tu implementación {className}.cs</li>
                  <li>
                    Adjunta el script {className} a un GameObject en tu escena
                  </li>
                  <li>
                    Accede a la instancia usando{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">{`${className}.Instance`}</code>
                  </li>
                </>
              ) : (
                <>
                  <li>Crea un nuevo script con el código generado</li>
                  <li>
                    Adjunta el script a un GameObject en tu escena (Unity)
                  </li>
                  <li>
                    Accede a la instancia singleton usando{" "}
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">{`${className}.Instance`}</code>
                  </li>
                </>
              )}
            </ol>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Ejemplo de Uso:</h4>
            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
              {`// Accessing the singleton from another script
void Start() {
  ${className}.Instance.ExampleMethod();
}`}
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Casos de Uso Comunes:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Gestores de Juego (GameManager)</li>
              <li>Sistemas de Audio (AudioManager)</li>
              <li>Gestores de Entrada (InputManager)</li>
              <li>Sistemas de Guardado/Carga (SaveManager)</li>
              <li>Pool de Objetos (ObjectPoolManager)</li>
            </ul>
          </div>
        </>
      )}
      {pattern === "state" && (
        <>
          <p className="text-sm text-muted-foreground">
            El patrón State permite que un objeto altere su comportamiento
            cuando su estado interno cambia. El objeto parecerá cambiar su
            clase.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Pasos de Implementación:</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Crea todos los archivos generados en tu proyecto</li>
              <li>
                Adjunta el script {`${className}Controller`} a tu objeto de
                juego
              </li>
              <li>Implementa el comportamiento específico para cada estado</li>
              <li>
                Configura las transiciones entre estados según las condiciones
                de tu juego
              </li>
            </ol>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Ejemplo de Uso:</h4>
            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
              {`// Transitioning to a different state
void Update() {
  // Check some condition
  if (someCondition) {
    // Change to a different state
    ${className}Controller.Set${
                states.find((s) => s.enabled)?.name || "State"
              }State();
  }
}`}
            </pre>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Casos de Uso Comunes:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Controladores de Personajes</li>
              <li>Comportamiento de IA de Enemigos</li>
              <li>Gestión del Flujo del Juego</li>
              <li>Gestión de Estados de UI</li>
            </ul>
          </div>
        </>
      )}

      {pattern === "object-pool" && (
        <>
          <p className="text-sm text-muted-foreground">
            El patrón Object Pool optimiza el rendimiento reutilizando objetos
            pre-inicializados en lugar de crear y destruir instancias
            continuamente.
          </p>

          {objectPoolVariant === "custom" && (
            <div className="space-y-2 my-3">
              <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-3 text-sm">
                <p className="font-medium mb-1">Pool Custom con Stack</p>
                <p className="text-xs">
                  Implementación mínima usando Stack{`<T>`}. Ideal para proyectos
                  sin dependencias adicionales.
                </p>
              </div>
              <h4 className="font-medium text-sm mt-4">
                Pasos de Implementación:
              </h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Asigna el prefab de Pooled{className} en el Inspector</li>
                <li>Configura el tamaño inicial del pool (initPoolSize)</li>
                <li>Usa pool.Get() para obtener instancias</li>
                <li>Llama a instance.Release() para devolver al pool</li>
              </ol>
            </div>
          )}

          {objectPoolVariant === "generic" && (
            <div className="space-y-2 my-3">
              <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-3 text-sm">
                <p className="font-medium mb-1">Pool Genérico con UnityEngine.Pool</p>
                <p className="text-xs">
                  Implementación con la API oficial de Unity. Ofrece más
                  configuración y control del ciclo de vida.
                </p>
              </div>
              <h4 className="font-medium text-sm mt-4">
                Pasos de Implementación:
              </h4>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>
                  Implementa IPooledWithRef{`<T>`} en tu objeto pooleable
                </li>
                <li>Asigna el prefab en {className}Pool{`<T>`}</li>
                <li>Configura defaultCapacity y maxSize según tus necesidades</li>
                <li>Usa pool.Get() para obtener y pool.Release() para devolver</li>
                <li>
                  Opcionalmente implementa auto-release llamando a Release()
                  internamente
                </li>
              </ol>
            </div>
          )}

          <div className="mt-4 rounded-md bg-muted p-3">
            <h4 className="font-medium text-sm mb-2">Ejemplo de Uso:</h4>
            <pre className="text-xs overflow-x-auto bg-background p-2 rounded">
              {objectPoolVariant === "custom"
                ? `// En tu script de spawner/arma
[SerializeField] private ${className}Pool pool;

void Shoot()
{
    Pooled${className} item = pool.Get();
    item.transform.position = spawnPoint.position;
    // Configurar velocidad, dirección, etc.
}

// En Pooled${className}.cs cuando debe destruirse
void OnBecameInvisible()
{
    Release(); // Devuelve al pool
}`
                : `// En tu script de spawner/arma
[SerializeField] private ${className}Pool<Pooled${className}> pool;

void Shoot()
{
    Pooled${className} item = pool.Get();
    item.transform.position = spawnPoint.position;
    // Configurar velocidad, dirección, etc.
}

// En Pooled${className}.cs (auto-release)
void OnBecameInvisible()
{
    Release(); // Se devuelve al pool automáticamente
}`}
            </pre>
          </div>
          <div className="space-y-2 mt-4">
            <h4 className="font-medium text-sm">Casos de Uso Comunes:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Proyectiles y Balas</li>
              <li>Efectos de Partículas</li>
              <li>Enemigos que respawnean</li>
              <li>Objetos de UI temporales</li>
              <li>Audio Sources para efectos de sonido</li>
            </ul>
          </div>
        </>
      )}

      <div className="pt-4 border-t mt-4">
        <h3 className="font-medium mb-2">Integración con Diagramas</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Visualiza este patrón con nuestro editor de diagramas para comprender
          mejor su estructura y relaciones.
        </p>
        <Link href={generateDiagramUrl()}>
          <Button>
            <GitFork className="mr-2 h-4 w-4" />
            Abrir en Editor de Diagramas
          </Button>
        </Link>
      </div>
    </>
  );
}
