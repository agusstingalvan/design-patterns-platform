"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CodeViewer } from "@/components/generator/CodeViewer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Pattern {
  id: string;
  pattern: {
    className: string;
    files: { [key: string]: string };
    generatedAt: string;
  };
  category_id: string;
  categories: {
    name: string;
  };
}

interface Project {
  id: string;
  name: string;
  shared: boolean;
  patterns: Pattern[];
}

interface GeneratorClientProps {
  project: Project;
}

export function GeneratorClient({ project }: GeneratorClientProps) {
  const pattern = project.patterns[0];

  if (!pattern) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-4">
              No se encontró ningún patrón
            </h2>
            <Button asChild>
              <Link href="/collections">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver a Colecciones
              </Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const { className, files } = pattern.pattern;
  const patternName = pattern.categories.name;

  // Create fileNames mapping
  const fileNames: { [key: string]: string } = {};
  Object.keys(files).forEach((key) => {
    if (key === "readme") {
      fileNames[key] = "README.md";
    } else if (key === "main") {
      fileNames[key] = `${className}.cs`;
    } else if (key === "interface") {
      fileNames[key] = `I${className}.cs`;
    } else {
      fileNames[key] = `${key}.cs`;
    }
  });

  // Create usage content (placeholder)
  const usageContent = (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Cómo usar este patrón</h3>
        <p className="text-muted-foreground">
          Este patrón fue generado el{" "}
          {new Date(pattern.pattern.generatedAt).toLocaleString()}
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Archivos incluidos:</h4>
        <ul className="list-disc list-inside space-y-1">
          {Object.keys(files).map((key) => (
            <li key={key} className="text-muted-foreground">
              {fileNames[key]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/collections">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Link>
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {project.name}
              </h1>
              <Badge variant={project.shared ? "default" : "secondary"}>
                {project.shared ? "Compartido" : "Privado"}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Patrón:{" "}
              <span className="font-medium capitalize">{patternName}</span> •
              Clase: <span className="font-medium">{className}</span>
            </p>
          </div>

          <Card className="relative">
            <div className="h-[700px]">
              <CodeViewer
                generatedFiles={files}
                fileNames={fileNames}
                pattern={patternName}
                className={className}
                usageContent={usageContent}
              />
            </div>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
