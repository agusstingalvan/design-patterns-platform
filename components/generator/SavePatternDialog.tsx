"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { savePattern } from "@/app/generator/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface SavePatternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  generatedFiles: { [key: string]: string };
  pattern: string;
  className: string;
}

export function SavePatternDialog({
  open,
  onOpenChange,
  generatedFiles,
  pattern,
  className,
}: SavePatternDialogProps) {
  const [projectName, setProjectName] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!projectName.trim()) {
      setError("Por favor, ingresa un nombre de proyecto");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const result = await savePattern({
        projectName: projectName.trim(),
        isShared,
        pattern,
        className,
        generatedFiles,
      });

      if (result.error) {
        setError(result.error);
      } else {
        // Reset form and close dialog
        setProjectName("");
        setIsShared(false);
        onOpenChange(false);

        // Show success toast
        toast({
          title: "¡Patrón guardado!",
          description: "Tu patrón se ha guardado exitosamente.",
        });

        // Refresh the page
        router.refresh();
      }
    } catch (err) {
      setError("Error al guardar el patrón. Por favor, intenta de nuevo.");
      console.error("Save pattern error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle>Guardar Patrón</DialogTitle>
          <DialogDescription>
            Guarda tu patrón generado para acceder a él más tarde.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="projectName">Nombre del Proyecto</Label>
            <Input
              id="projectName"
              placeholder="Mi Proyecto de Unity"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              disabled={isSaving}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="shared">Compartir con el equipo</Label>
              <p className="text-sm text-muted-foreground">
                Otros miembros de tu equipo podrán ver este patrón
              </p>
            </div>
            <Switch
              id="shared"
              checked={isShared}
              onCheckedChange={setIsShared}
              disabled={isSaving}
            />
          </div>
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
