import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import { CallbackMethodsConfig, CallbackMethod } from "./CallbackMethodsConfig";

type SingletonVariant = "minimal" | "persistent" | "generic";
type ObjectPoolVariant = "custom" | "generic";

interface SingletonConfigProps {
  className: string;
  variant: SingletonVariant;
  persistence: boolean;
  lazyInstantiation: boolean;
  callbackMethods: CallbackMethod[];
  onClassNameChange: (value: string) => void;
  onVariantChange: (value: SingletonVariant) => void;
  onPersistenceChange: (value: boolean) => void;
  onLazyInstantiationChange: (value: boolean) => void;
  onCallbackMethodsChange: (methods: CallbackMethod[]) => void;
}

export function SingletonConfig({
  className,
  variant,
  persistence,
  lazyInstantiation,
  callbackMethods,
  onClassNameChange,
  onVariantChange,
  onPersistenceChange,
  onLazyInstantiationChange,
  onCallbackMethodsChange,
}: SingletonConfigProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="class-name">Nombre de Clase Principal</Label>
        <Input
          id="class-name"
          value={className}
          onChange={(e) => onClassNameChange(e.target.value)}
          placeholder="ej. GameManager, AudioManager, PlayerController"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="singleton-variant">Variante de Singleton</Label>
        <Select value={variant} onValueChange={onVariantChange}>
          <SelectTrigger id="singleton-variant">
            <SelectValue placeholder="Seleccionar variante" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minimal">
              <div className="flex flex-col items-start">
                <span className="font-medium">Código Mínimo</span>
                <span className="text-xs text-muted-foreground">
                  Patrón esencial y básico
                </span>
              </div>
            </SelectItem>
            <SelectItem value="persistent">
              <div className="flex flex-col items-start">
                <span className="font-medium">Persistente y Lazy</span>
                <span className="text-xs text-muted-foreground">
                  Con persistencia y creación perezosa
                </span>
              </div>
            </SelectItem>
            <SelectItem value="generic">
              <div className="flex flex-col items-start">
                <span className="font-medium">Genérico Reutilizable</span>
                <span className="text-xs text-muted-foreground">
                  Clase base genérica (2 archivos)
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {variant === "persistent" && (
        <div className="pt-2">
          <h3 className="font-medium mb-2">
            Opciones de Singleton Persistente
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="persistence"
                checked={persistence}
                onCheckedChange={(checked) =>
                  onPersistenceChange(checked === true)
                }
              />
              <Label htmlFor="persistence" className="text-sm">
                <span className="font-medium">DontDestroyOnLoad</span>
                <p className="text-xs text-muted-foreground">
                  Mantener el objeto entre escenas
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lazy-instantiation"
                checked={lazyInstantiation}
                onCheckedChange={(checked) =>
                  onLazyInstantiationChange(checked === true)
                }
              />
              <Label htmlFor="lazy-instantiation" className="text-sm">
                <span className="font-medium">Lazy Instantiation</span>
                <p className="text-xs text-muted-foreground">
                  Crear instancia automáticamente si no existe
                </p>
              </Label>
            </div>
          </div>
        </div>
      )}

      {variant === "minimal" && (
        <div className="pt-2">
          <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
            <p className="font-medium mb-1">Código Mínimo</p>
            <p className="text-xs">
              Esta variante genera el código más esencial y básico del patrón
              Singleton. Ideal para casos simples donde no se necesita
              persistencia entre escenas.
            </p>
          </div>
        </div>
      )}

      {variant === "generic" && (
        <div className="pt-2">
          <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
            <p className="font-medium mb-1">Singleton Genérico</p>
            <p className="text-xs">
              Esta variante genera una clase base genérica reutilizable
              (Singleton{`<T>`}) y una implementación concreta ({className}).
              Útil para crear múltiples singletons en tu proyecto.
            </p>
          </div>
        </div>
      )}

      <CallbackMethodsConfig
        callbackMethods={callbackMethods}
        onCallbackMethodsChange={onCallbackMethodsChange}
      />
    </>
  );
}

interface State {
  name: string;
  enabled: boolean;
}

interface StateConfigProps {
  className: string;
  includeController: boolean;
  states: State[];
  callbackMethods: CallbackMethod[];
  onClassNameChange: (value: string) => void;
  onIncludeControllerChange: (value: boolean) => void;
  onStatesChange: (states: State[]) => void;
  onCallbackMethodsChange: (methods: CallbackMethod[]) => void;
}

export function StateConfig({
  className,
  includeController,
  states,
  callbackMethods,
  onClassNameChange,
  onIncludeControllerChange,
  onStatesChange,
  onCallbackMethodsChange,
}: StateConfigProps) {
  const addState = () => {
    onStatesChange([
      ...states,
      { name: `State${states.length + 1}`, enabled: true },
    ]);
  };

  const removeState = (index: number) => {
    const newStates = [...states];
    newStates.splice(index, 1);
    onStatesChange(newStates);
  };

  const updateStateName = (index: number, name: string) => {
    const newStates = [...states];
    newStates[index].name = name;
    onStatesChange(newStates);
  };

  const toggleStateEnabled = (index: number) => {
    const newStates = [...states];
    newStates[index].enabled = !newStates[index].enabled;
    onStatesChange(newStates);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="class-name">Nombre de Clase Principal</Label>
        <Input
          id="class-name"
          value={className}
          onChange={(e) => onClassNameChange(e.target.value)}
          placeholder="ej. GameManager, Character, Enemy"
        />
      </div>

      <div className="pt-2">
        <h3 className="font-medium mb-2">
          Opciones de Máquina de Estados
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-controller"
              checked={includeController}
              onCheckedChange={(checked) =>
                onIncludeControllerChange(checked === true)
              }
            />
            <Label htmlFor="include-controller" className="text-sm">
              <span className="font-medium">Incluir Clase Controladora</span>
              <p className="text-xs text-muted-foreground">
                Generar archivo {className}.cs (Context class)
              </p>
            </Label>
          </div>
        </div>

        <h3 className="font-medium mt-4 mb-2">Estados</h3>
        <div className="space-y-3">
          {states.map((state, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                id={`state-${index}`}
                checked={state.enabled}
                onCheckedChange={() => toggleStateEnabled(index)}
              />
              <Input
                value={state.name}
                onChange={(e) => updateStateName(index, e.target.value)}
                placeholder="Nombre del estado"
                className="flex-1"
              />
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeState(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addState}
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Estado
          </Button>
        </div>

        <CallbackMethodsConfig
          callbackMethods={callbackMethods}
          onCallbackMethodsChange={onCallbackMethodsChange}
        />
      </div>
    </>
  );
}

interface ObjectPoolConfigProps {
  className: string;
  variant: ObjectPoolVariant;
  initPoolSize: number;
  defaultCapacity: number;
  maxSize: number;
  collectionCheck: boolean;
  includeExample: boolean;
  onClassNameChange: (value: string) => void;
  onVariantChange: (value: ObjectPoolVariant) => void;
  onInitPoolSizeChange: (value: number) => void;
  onDefaultCapacityChange: (value: number) => void;
  onMaxSizeChange: (value: number) => void;
  onCollectionCheckChange: (value: boolean) => void;
  onIncludeExampleChange: (value: boolean) => void;
}

export function ObjectPoolConfig({
  className,
  variant,
  initPoolSize,
  defaultCapacity,
  maxSize,
  collectionCheck,
  includeExample,
  onClassNameChange,
  onVariantChange,
  onInitPoolSizeChange,
  onDefaultCapacityChange,
  onMaxSizeChange,
  onCollectionCheckChange,
  onIncludeExampleChange,
}: ObjectPoolConfigProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="class-name">Nombre de Clase Base</Label>
        <Input
          id="class-name"
          value={className}
          onChange={(e) => onClassNameChange(e.target.value)}
          placeholder="ej. Projectile, Bullet, Effect"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pool-variant">Variante de Object Pool</Label>
        <Select value={variant} onValueChange={onVariantChange}>
          <SelectTrigger id="pool-variant">
            <SelectValue placeholder="Seleccionar variante" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">
              <div className="flex flex-col items-start">
                <span className="font-medium">Custom Stack</span>
                <span className="text-xs text-muted-foreground">
                  Pool mínimo con Stack (sin dependencias)
                </span>
              </div>
            </SelectItem>
            <SelectItem value="generic">
              <div className="flex flex-col items-start">
                <span className="font-medium">Generic UnityEngine.Pool</span>
                <span className="text-xs text-muted-foreground">
                  Pool genérico con API de Unity
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {variant === "custom" && (
        <div className="pt-2">
          <h3 className="font-medium mb-2">Configuración de Pool Custom</h3>
          <div className="space-y-2">
            <div>
              <Label htmlFor="init-pool-size" className="text-sm">
                Tamaño Inicial del Pool
              </Label>
              <Input
                id="init-pool-size"
                type="number"
                min="1"
                value={initPoolSize}
                onChange={(e) =>
                  onInitPoolSizeChange(parseInt(e.target.value) || 10)
                }
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Cantidad de objetos pre-inicializados
              </p>
            </div>
          </div>
        </div>
      )}

      {variant === "generic" && (
        <div className="pt-2">
          <h3 className="font-medium mb-2">
            Configuración de Pool Genérico
          </h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="default-capacity" className="text-sm">
                Capacidad por Defecto
              </Label>
              <Input
                id="default-capacity"
                type="number"
                min="1"
                value={defaultCapacity}
                onChange={(e) =>
                  onDefaultCapacityChange(parseInt(e.target.value) || 20)
                }
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Capacidad inicial del pool
              </p>
            </div>

            <div>
              <Label htmlFor="max-size" className="text-sm">
                Tamaño Máximo
              </Label>
              <Input
                id="max-size"
                type="number"
                min="1"
                value={maxSize}
                onChange={(e) =>
                  onMaxSizeChange(parseInt(e.target.value) || 100)
                }
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Límite máximo de objetos en el pool
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="collection-check"
                checked={collectionCheck}
                onCheckedChange={(checked) =>
                  onCollectionCheckChange(checked === true)
                }
              />
              <Label htmlFor="collection-check" className="text-sm">
                <span className="font-medium">Collection Check</span>
                <p className="text-xs text-muted-foreground">
                  Validación de objetos duplicados (solo en desarrollo)
                </p>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-example"
                checked={includeExample}
                onCheckedChange={(checked) =>
                  onIncludeExampleChange(checked === true)
                }
              />
              <Label htmlFor="include-example" className="text-sm">
                <span className="font-medium">Incluir Ejemplos</span>
                <p className="text-xs text-muted-foreground">
                  Generar clases de ejemplo (Pooled{className} y{" "}
                  {className}Spawner)
                </p>
              </Label>
            </div>
          </div>
        </div>
      )}

      <div className="pt-2">
        <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <p className="font-medium mb-1">Object Pool Pattern</p>
          <p className="text-xs">
            {variant === "custom"
              ? "Pool mínimo usando Stack<T>. Ideal para casos simples sin dependencias adicionales."
              : "Pool genérico usando UnityEngine.Pool. Ofrece más control y opciones de configuración."}
          </p>
        </div>
      </div>
    </>
  );
}
