"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code2, GitFork, LogOut, User, FolderOpen } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { signInWithGithub, signOut } from "@/app/auth/actions";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function SiteHeader() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    await signInWithGithub();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = (user: SupabaseUser) => {
    if (user.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(" ");
      return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : names[0][0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/generator" className="mr-6 flex items-center space-x-2">
            <GitFork className="h-6 w-6" />
            <div className="flex flex-col ">
              <span className="hidden font-bold sm:inline-block">
                Patrones de programación de videojuegos
              </span>
              <span className="text-sm text-foreground/60">
                Trabajo Final de Carrera
              </span>
            </div>
          </Link>

        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
<nav className="flex items-center space-x-4">
            <Link
              href="/generator"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <div className="flex items-center gap-1">
                <Code2 className="h-4 w-4" />
                <span>Generador de Patrones</span>
              </div>
            </Link>

            {/* Auth Section */}
            {loading ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.user_metadata?.avatar_url}
                        alt={
                          user.user_metadata?.full_name ||
                          user.email ||
                          "Usuario"
                        }
                      />
                      <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.user_metadata?.full_name && (
                        <p className="font-medium">
                          {user.user_metadata.full_name}
                        </p>
                      )}
                      {user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/collections" className="cursor-pointer">
                      <FolderOpen className="mr-2 h-4 w-4" />
                      <span>Colecciones</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleSignIn} variant="default" size="sm">
                <User className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
