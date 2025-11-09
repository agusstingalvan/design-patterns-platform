import { Button } from "@/components/ui/button";
import { GitFork } from "lucide-react";
import Link from "next/link";

interface State {
  name: string;
  enabled: boolean;
}

interface UsageInfoProps {
  pattern: "singleton" | "state";
  className: string;
  states?: State[];
}

export function UsageInfo({ pattern, className, states = [] }: UsageInfoProps) {
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
            El patrón Singleton asegura que una clase tenga solo una instancia
            y proporciona un punto de acceso global a ella.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Pasos de Implementación:</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Crea un nuevo script con el código generado</li>
              <li>
                Adjunta el script a un GameObject en tu escena (Unity)
              </li>
              <li>
                Accede a la instancia singleton usando{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">{`${className}.Instance`}</code>
              </li>
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
              <li>Gestores de Juego</li>
              <li>Sistemas de Audio</li>
              <li>Gestores de Entrada</li>
              <li>Sistemas de Guardado/Carga</li>
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
              <li>
                Implementa el comportamiento específico para cada estado
              </li>
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
    ${className}Controller.Set${states.find((s) => s.enabled)?.name || "State"}State();
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
