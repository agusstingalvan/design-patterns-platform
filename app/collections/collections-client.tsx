"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { CreateTeamDialog } from "@/components/collections/CreateTeamDialog";
import { InviteCollaboratorDialog } from "@/components/collections/InviteCollaboratorDialog";
import { Users, Search, UserPlus, LogOut, FolderOpen } from "lucide-react";
import Link from "next/link";
import { leaveTeam } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Project {
  id: string;
  name: string;
  shared: boolean;
  created_at: string;
  patterns: Array<{
    id: string;
    category_id: string;
    pattern: any;
    categories: {
      name: string;
    };
  }>;
}

interface CollectionsClientProps {
  initialProjects: Project[];
  hasTeam: boolean;
  teamName: string | null;
}

export function CollectionsClient({
  initialProjects,
  hasTeam,
  teamName,
}: CollectionsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [inviteCollaboratorOpen, setInviteCollaboratorOpen] = useState(false);
  const [isLeavingTeam, setIsLeavingTeam] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const filteredProjects = initialProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLeaveTeam = async () => {
    setIsLeavingTeam(true);
    try {
      const result = await leaveTeam();
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Equipo abandonado!",
          description: "Has abandonado el equipo exitosamente.",
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al abandonar el equipo.",
        variant: "destructive",
      });
    } finally {
      setIsLeavingTeam(false);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="flex flex-1 justify-center overflow-y-auto py-8">
        <div className="container max-w-7xl space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Colecciones</h1>
              <p className="text-muted-foreground">
                Gestiona tus proyectos y patrones guardados
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {hasTeam ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInviteCollaboratorOpen(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invitar Colaborador
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        Abandonar Equipo
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción te removerá del equipo "{teamName}". Ya no
                          tendrás acceso a los proyectos compartidos del equipo.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleLeaveTeam}
                          disabled={isLeavingTeam}
                        >
                          {isLeavingTeam ? "Abandonando..." : "Abandonar"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCreateTeamOpen(true)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Crear Equipo
                </Button>
              )}
            </div>
          </div>

          {hasTeam && teamName && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Equipo: <span className="text-primary">{teamName}</span>
                </p>
              </div>
            </div>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No se encontraron proyectos
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Intenta con otros términos de búsqueda"
                  : "Crea tu primer patrón en el generador"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link href="/generator">Ir al Generador</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/generator/${project.id}`}
                  className="block"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">
                        {project.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              project.shared
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            }`}
                          >
                            {project.shared ? "Compartido" : "Privado"}
                          </span>
                        </div>
                        {project.patterns.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Patrón:{" "}
                            <span className="font-medium">
                              {project.patterns[0].categories.name}
                            </span>
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Creado:{" "}
                          {new Date(project.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <CreateTeamDialog
        open={createTeamOpen}
        onOpenChange={setCreateTeamOpen}
        onTeamCreated={() => router.refresh()}
      />
      <InviteCollaboratorDialog
        open={inviteCollaboratorOpen}
        onOpenChange={setInviteCollaboratorOpen}
      />
    </div>
  );
}
