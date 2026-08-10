import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

interface FlyweightConfigProps {
  className: string;
  flyweightKey: string;
  intrinsicState: string;
  sharedType: string;
  meshName: string;
  materialName: string;
  color: string;
  initialHealth: number;
  initialSpeed: number;
  directionX: number;
  directionY: number;
  directionZ: number;
  onClassNameChange: (value: string) => void;
  onFlyweightKeyChange: (value: string) => void;
  onIntrinsicStateChange: (value: string) => void;
  onSharedTypeChange: (value: string) => void;
  onMeshNameChange: (value: string) => void;
  onMaterialNameChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onInitialHealthChange: (value: number) => void;
  onInitialSpeedChange: (value: number) => void;
  onDirectionXChange: (value: number) => void;
  onDirectionYChange: (value: number) => void;
  onDirectionZChange: (value: number) => void;
}

export function FlyweightConfig({
  className,
  flyweightKey,
  intrinsicState,
  sharedType,
  meshName,
  materialName,
  color,
  initialHealth,
  initialSpeed,
  directionX,
  directionY,
  directionZ,
  onClassNameChange,
  onFlyweightKeyChange,
  onIntrinsicStateChange,
  onSharedTypeChange,
  onMeshNameChange,
  onMaterialNameChange,
  onColorChange,
  onInitialHealthChange,
  onInitialSpeedChange,
  onDirectionXChange,
  onDirectionYChange,
  onDirectionZChange,
}: FlyweightConfigProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="class-name">Nombre de Clase Base</Label>
        <Input
          id="class-name"
          value={className}
          onChange={(e) => onClassNameChange(e.target.value)}
          placeholder="ej. Tree, EnemyVisual, TerrainTile"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="flyweight-key">Clave del Flyweight</Label>
        <Input
          id="flyweight-key"
          value={flyweightKey}
          onChange={(e) => onFlyweightKeyChange(e.target.value)}
          placeholder="ej. Oak"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="intrinsic-state">Estado Intrínseco Compartido</Label>
        <Input
          id="intrinsic-state"
          value={intrinsicState}
          onChange={(e) => onIntrinsicStateChange(e.target.value)}
          placeholder="ej. Mesh y material de roble"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="shared-type">Tipo Compartido</Label>
        <Input id="shared-type" value={sharedType} onChange={(e) => onSharedTypeChange(e.target.value)} placeholder="ej. Vegetación" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="mesh-name">Mesh Compartido</Label>
          <Input id="mesh-name" value={meshName} onChange={(e) => onMeshNameChange(e.target.value)} placeholder="ej. OakMesh" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="material-name">Material Compartido</Label>
          <Input id="material-name" value={materialName} onChange={(e) => onMaterialNameChange(e.target.value)} placeholder="ej. OakMaterial" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shared-color">Color Compartido</Label>
        <Input id="shared-color" value={color} onChange={(e) => onColorChange(e.target.value)} placeholder="ej. Verde oscuro" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="initial-health">Vida Inicial</Label>
          <Input id="initial-health" type="number" value={initialHealth} onChange={(e) => onInitialHealthChange(Number(e.target.value) || 0)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="initial-speed">Velocidad Inicial</Label>
          <Input id="initial-speed" type="number" value={initialSpeed} onChange={(e) => onInitialSpeedChange(Number(e.target.value) || 0)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Dirección Inicial</Label>
        <div className="grid grid-cols-3 gap-3">
          <Input aria-label="Dirección X" type="number" value={directionX} onChange={(e) => onDirectionXChange(Number(e.target.value) || 0)} placeholder="X" />
          <Input aria-label="Dirección Y" type="number" value={directionY} onChange={(e) => onDirectionYChange(Number(e.target.value) || 0)} placeholder="Y" />
          <Input aria-label="Dirección Z" type="number" value={directionZ} onChange={(e) => onDirectionZChange(Number(e.target.value) || 0)} placeholder="Z" />
        </div>
      </div>

      <div className="pt-2">
        <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <p className="font-medium mb-1">Flyweight Pattern</p>
          <p className="text-xs">
            Comparte tipo, recursos visuales y configuración base. Cada contexto conserva posición, rotación, vida, velocidad y dirección propias.
          </p>
        </div>
      </div>
    </>
  );
}
