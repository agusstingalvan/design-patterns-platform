import { Button } from "@/components/ui/button";
import { GitFork } from "lucide-react";
import Link from "next/link";

interface State {
  name: string;
  enabled: boolean;
}

interface UsageInfoProps {
  pattern: "singleton" | "state" | "flyweight";
  className: string;
  states?: State[];
  singletonVariant?: "minimal" | "persistent" | "generic";
}

export function UsageInfo({
  pattern,
  className,
  states = [],
  singletonVariant = "minimal",
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
              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium mb-1">
                  Variante: Código Mínimo
                </p>
                <p className="text-xs text-muted-foreground">
                  Esta es la implementación más simple del patrón Singleton.
                  Perfecta para casos básicos donde solo necesitas una única
                  instancia sin persistencia entre escenas.
                </p>
              </div>
            </div>
          )}

          {singletonVariant === "persistent" && (
            <div className="space-y-2 my-3">
              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium mb-1">
                  Variante: Persistente y Lazy
                </p>
                <p className="text-xs text-muted-foreground">
                  Implementación con persistencia entre escenas
                  (DontDestroyOnLoad) y creación perezosa. Ideal para managers
                  que deben existir durante todo el ciclo de vida del juego.
                </p>
              </div>
            </div>
          )}

          {singletonVariant === "generic" && (
            <div className="space-y-2 my-3">
              <div className="rounded-md bg-muted p-3 text-sm">
                <p className="font-medium mb-1">
                  Variante: Genérico Reutilizable
                </p>
                <p className="text-xs text-muted-foreground">
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
              <li>Catálogos compartidos de recursos</li>
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

      {pattern === "flyweight" && (
        <>
          <p className="text-sm text-muted-foreground">
            Flyweight comparte información común entre objetos similares para
            reducir la duplicación de estado.
          </p>
          <div className="space-y-2 my-3">
            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="font-medium mb-1">Estado intrínseco y extrínseco</p>
              <p className="text-xs">Flyweight contiene tipo, mesh, material, color y otros datos compartidos e inmutables. Context contiene posición, rotación, dirección, vida y velocidad de cada entidad.</p>
            </div>
            <h4 className="font-medium text-sm mt-4">Pasos de Implementación:</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Crea una factoría por tipo de recurso compartido</li>
              <li>Obtén el Flyweight usando una clave estable</li>
              <li>Crea un Context por entidad con su estado extrínseco</li>
            </ol>
          </div>

          <div className="mt-4 rounded-md bg-muted p-3">
            <h4 className="font-medium text-sm mb-2">Ejemplo de Uso:</h4>
            <pre className="text-xs overflow-x-auto bg-background p-2 rounded">{`var factory = new ${className}FlyweightFactory();
var flyweight = factory.GetFlyweight("Oak", "Mesh y material de roble");

var entity = new ${className}Context(
    flyweight,
    new Vector3(0f, 0f, 0f),
    Quaternion.identity
);`}</pre>
          </div>
          <div className="space-y-2 mt-4">
            <h4 className="font-medium text-sm">Casos de Uso Comunes:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Árboles y vegetación repetida</li>
              <li>Tiles y terreno</li>
              <li>Enemigos con recursos visuales comunes</li>
              <li>Iconos y elementos de interfaz repetidos</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
