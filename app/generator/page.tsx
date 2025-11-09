"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Gamepad2 } from "lucide-react";
import { SingletonConfig, StateConfig } from "@/components/generator/PatternConfiguration";
import { CodeViewer } from "@/components/generator/CodeViewer";
import { UsageInfo } from "@/components/generator/UsageInfo";
import { generateSingletonCode } from "@/lib/generators/singleton";
import { generateStateCode } from "@/lib/generators/state";

export default function GeneratorPage() {
  const [pattern, setPattern] = useState<"singleton" | "state">("singleton");
  const [className, setClassName] = useState("GameManager");
  const [generatedFiles, setGeneratedFiles] = useState<{
    [key: string]: string;
  }>({});
  const [fileNames, setFileNames] = useState<{ [key: string]: string }>({});

  // Singleton options
  const [lazyInit, setLazyInit] = useState(false);
  const [threadSafe, setThreadSafe] = useState(false);

  // State pattern options
  const [hierarchicalStates, setHierarchicalStates] = useState(false);
  const [states, setStates] = useState([
    { name: "Idle", enabled: true },
    { name: "Move", enabled: true },
    { name: "Action", enabled: true },
  ]);
  const [callbackMethods, setCallbackMethods] = useState([
    {
      name: "OnTriggerEnter",
      enabled: true,
      paramType: "Collider",
      paramName: "other",
    },
    {
      name: "OnCollisionEnter",
      enabled: false,
      paramType: "Collision",
      paramName: "collision",
    },
    {
      name: "HandleEvent",
      enabled: false,
      paramType: "object",
      paramName: "eventData",
    },
  ]);

  // Generate code when pattern, className, or options change
  useEffect(() => {
    generateCode();
  }, [
    pattern,
    className,
    lazyInit,
    threadSafe,
    hierarchicalStates,
    callbackMethods,
    states,
  ]);

  const generateCode = () => {
    if (pattern === "singleton") {
      const { files, names } = generateSingletonCode({
        className,
        lazyInit,
        threadSafe,
      });
      setGeneratedFiles(files);
      setFileNames(names);
    } else if (pattern === "state") {
      const { files, names } = generateStateCode({
        className,
        hierarchicalStates,
        states,
        callbackMethods,
      });
      setGeneratedFiles(files);
      setFileNames(names);
    }
  };

  return (
    <div className="flex min-h-screen flex-col px-4 overflow-hidden">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-4">
            {/* <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Generador de Código
              </h1>
              <p className="text-muted-foreground">
                Genera código de patrones de diseño personalizado para tu motor de juego
              </p>
            </div> */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="h-[calc(100vh-210px)] overflow-y-scroll">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pattern">Seleccionar Patrón</Label>
                      <Select
                        value={pattern}
                        onValueChange={(value: "singleton" | "state") =>
                          setPattern(value)
                        }
                      >
                        <SelectTrigger id="pattern">
                          <SelectValue placeholder="Seleccionar patrón" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="singleton">
                            <div className="flex items-center">
                              <Gamepad2 className="mr-2 h-4 w-4" />
                              <span>Singleton</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="state">
                            <div className="flex items-center">
                              <Gamepad2 className="mr-2 h-4 w-4" />
                              <span>State</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {pattern === "singleton" && (
                      <SingletonConfig
                        className={className}
                        lazyInit={lazyInit}
                        threadSafe={threadSafe}
                        onClassNameChange={setClassName}
                        onLazyInitChange={setLazyInit}
                        onThreadSafeChange={setThreadSafe}
                      />
                    )}

                    {pattern === "state" && (
                      <StateConfig
                        className={className}
                        hierarchicalStates={hierarchicalStates}
                        states={states}
                        callbackMethods={callbackMethods}
                        onClassNameChange={setClassName}
                        onHierarchicalStatesChange={setHierarchicalStates}
                        onStatesChange={setStates}
                        onCallbackMethodsChange={setCallbackMethods}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="h-[calc(100vh-210px)] overflow-y-scroll relative">
                <CardContent className="p-0">
                  <CodeViewer
                    generatedFiles={generatedFiles}
                    fileNames={fileNames}
                    pattern={pattern}
                    className={className}
                    usageContent={
                      <UsageInfo
                        pattern={pattern}
                        className={className}
                        states={states}
                      />
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
