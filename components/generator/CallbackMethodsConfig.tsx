import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export interface CallbackMethod {
  name: string;
  enabled: boolean;
  paramType: string;
  paramName: string;
}

interface CallbackMethodsConfigProps {
  callbackMethods: CallbackMethod[];
  onCallbackMethodsChange: (methods: CallbackMethod[]) => void;
}

export function CallbackMethodsConfig({
  callbackMethods,
  onCallbackMethodsChange,
}: CallbackMethodsConfigProps) {
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
    <div className="pt-2">
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
  );
}
