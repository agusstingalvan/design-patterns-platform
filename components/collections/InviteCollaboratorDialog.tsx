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
import { inviteCollaborator } from "@/app/collections/actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface InviteCollaboratorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteCollaboratorDialog({
  open,
  onOpenChange,
}: InviteCollaboratorDialogProps) {
  const [email, setEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleInvite = async () => {
    if (!email.trim()) {
      setError("Por favor, ingresa un email");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor, ingresa un email válido");
      return;
    }

    setIsInviting(true);
    setError(null);

    try {
      const result = await inviteCollaborator(email.trim());

      if (result.error) {
        setError(result.error);
      } else {
        // Reset form and close dialog
        setEmail("");
        onOpenChange(false);

        // Show success toast
        toast({
          title: "¡Colaborador invitado!",
          description: "El colaborador ha sido agregado a tu equipo.",
        });

        // Refresh the page
        router.refresh();
      }
    } catch (err) {
      setError("Error al invitar al colaborador. Por favor, intenta de nuevo.");
      console.error("Invite collaborator error:", err);
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invitar Colaborador</DialogTitle>
          <DialogDescription>
            Invita a un colaborador a tu equipo ingresando su email. El usuario
            debe estar registrado en la plataforma.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email del Colaborador</Label>
            <Input
              id="email"
              type="email"
              placeholder="colaborador@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isInviting}
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
            disabled={isInviting}
          >
            Cancelar
          </Button>
          <Button onClick={handleInvite} disabled={isInviting}>
            {isInviting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Invitando...
              </>
            ) : (
              "Invitar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
