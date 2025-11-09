"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { BookOpen, Code2, GitFork, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GitFork className="h-6 w-6" />
            <div className="flex flex-col ">
              <span className="hidden font-bold sm:inline-block">
                Game Design Patterns
              </span>
              <span className="text-sm text-foreground/60">TESIS</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {/* <Link href="/patterns" className="transition-colors hover:text-foreground/80 text-foreground/60">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Patterns</span>
              </div>
            </Link> */}

            {/* <Link
              href="/diagram"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                <span>Diagram Editor</span>
              </div>
            </Link> */}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-4">
            {/* <ModeToggle /> */}
            <Link
              href="/generator"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <div className="flex items-center gap-1">
                <Code2 className="h-4 w-4" />
                <span>Generador de Patrones</span>
              </div>
            </Link>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Menu"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] md:hidden">
                <DropdownMenuItem asChild>
                  <Link href="/patterns" className="w-full cursor-pointer">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Patterns</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/generator" className="w-full cursor-pointer">
                    <Code2 className="mr-2 h-4 w-4" />
                    <span>Code Generator</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/diagram" className="w-full cursor-pointer">
                    <GitFork className="mr-2 h-4 w-4" />
                    <span>Diagram Editor</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
