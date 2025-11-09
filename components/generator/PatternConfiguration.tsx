import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface SingletonConfigProps {
  className: string;
  lazyInit: boolean;
  threadSafe: boolean;
  onClassNameChange: (value: string) => void;
  onLazyInitChange: (value: boolean) => void;
  onThreadSafeChange: (value: boolean) => void;
}

export function SingletonConfig({
  className,
  lazyInit,
  threadSafe,
  onClassNameChange,
  onLazyInitChange,
  onThreadSafeChange,
}: SingletonConfigProps) {
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
        <h3 className="font-medium mb-2">Opciones de Singleton</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lazy-init"
              checked={lazyInit}
              onCheckedChange={(checked) => onLazyInitChange(checked === true)}
            />
            <Label htmlFor="lazy-init">Inicialización Perezosa</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="thread-safe"
              checked={threadSafe}
              onCheckedChange={(checked) =>
                onThreadSafeChange(checked === true)
              }
            />
            <Label htmlFor="thread-safe">Seguro para Hilos</Label>
          </div>
        </div>
      </div>
    </>
  );
}

interface State {
  name: string;
  enabled: boolean;
}

interface CallbackMethod {
  name: string;
  enabled: boolean;
  paramType: string;
  paramName: string;
}

interface StateConfigProps {
  className: string;
  hierarchicalStates: boolean;
  states: State[];
  callbackMethods: CallbackMethod[];
  onClassNameChange: (value: string) => void;
  onHierarchicalStatesChange: (value: boolean) => void;
  onStatesChange: (states: State[]) => void;
  onCallbackMethodsChange: (methods: CallbackMethod[]) => void;
}

export function StateConfig({
  className,
  states,
  callbackMethods,
  onClassNameChange,
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

  const addCallbackMethod = () => {
    onCallbackMethodsChange([
      ...callbackMethods,
      {
        name: `CustomCallback${callbackMethods.length + 1}`,
        enabled: true,
        paramType: "object",
        paramName: "data",
      },
    ]);
  };

  const removeCallbackMethod = (index: number) => {
    const newCallbacks = [...callbackMethods];
    newCallbacks.splice(index, 1);
    onCallbackMethodsChange(newCallbacks);
  };

  const updateCallbackMethod = (
    index: number,
    field: string,
    value: string
  ) => {
    const newCallbacks = [...callbackMethods];
    newCallbacks[index] = { ...newCallbacks[index], [field]: value };
    onCallbackMethodsChange(newCallbacks);
  };

  const toggleCallbackEnabled = (index: number) => {
    const newCallbacks = [...callbackMethods];
    newCallbacks[index].enabled = !newCallbacks[index].enabled;
    onCallbackMethodsChange(newCallbacks);
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
        {/* <h3 className="font-medium mb-2">
          Opciones de Máquina de Estados
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hierarchical"
              checked={hierarchicalStates}
              onCheckedChange={(checked) =>
                setHierarchicalStates(checked === true)
              }
            />
            <Label htmlFor="hierarchical">
              Estados Jerárquicos
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="event-driven"
              checked={eventDriven}
              onCheckedChange={(checked) =>
                setEventDriven(checked === true)
              }
            />
            <Label htmlFor="event-driven">
              Transiciones por Eventos
            </Label>
          </div>
        </div> */}

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

        <h3 className="font-medium mt-4 mb-2">Métodos de Callback</h3>
        <div className="space-y-3">
          {callbackMethods.map((callback, index) => (
            <div key={index} className="space-y-2 border p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`callback-${index}`}
                  checked={callback.enabled}
                  onCheckedChange={() => toggleCallbackEnabled(index)}
                />
                <Input
                  value={callback.name}
                  onChange={(e) =>
                    updateCallbackMethod(index, "name", e.target.value)
                  }
                  placeholder="Nombre del método"
                  className="flex-1"
                />
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCallbackMethod(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={callback.paramType}
                  onChange={(e) =>
                    updateCallbackMethod(index, "paramType", e.target.value)
                  }
                  placeholder="Tipo de parámetro"
                />
                <Input
                  value={callback.paramName}
                  onChange={(e) =>
                    updateCallbackMethod(index, "paramName", e.target.value)
                  }
                  placeholder="Nombre del parámetro"
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addCallbackMethod}
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Método Callback
          </Button>
        </div>
      </div>
    </>
  );
}
