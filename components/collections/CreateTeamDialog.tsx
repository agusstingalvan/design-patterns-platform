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
import { Loader2 } from "lucide-react";
import { createTeam } from "@/app/collections/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamCreated?: () => void;
}

export function CreateTeamDialog({
  open,
  onOpenChange,
  onTeamCreated,
}: CreateTeamDialogProps) {
  const [teamName, setTeamName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!teamName.trim()) {
      setError("Por favor, ingresa un nombre de equipo");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const result = await createTeam(teamName.trim());

      if (result.error) {
        setError(result.error);
      } else {
        // Reset form and close dialog
        setTeamName("");
        onOpenChange(false);

        // Show success toast
        toast({
          title: "¡Equipo creado!",
          description: "Tu equipo se ha creado exitosamente.",
        });

        // Call callback if provided
        if (onTeamCreated) {
          onTeamCreated();
        }

        // Refresh the page
        router.refresh();
      }
    } catch (err) {
      setError("Error al crear el equipo. Por favor, intenta de nuevo.");
      console.error("Create team error:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Equipo</DialogTitle>
          <DialogDescription>
            Crea un equipo para colaborar con otros desarrolladores en tus
            proyectos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="teamName">Nombre del Equipo</Label>
            <Input
              id="teamName"
              placeholder="Mi Equipo de Desarrollo"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              disabled={isCreating}
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
            disabled={isCreating}
          >
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={isCreating}>
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear Equipo"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
