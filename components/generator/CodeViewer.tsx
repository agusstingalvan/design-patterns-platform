"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  ClipboardCopy,
  Code2,
  Download,
  Archive,
  FileText,
  Wand2,
  Save,
  GitPullRequest,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SavePatternDialog } from "./SavePatternDialog";
import { CreatePRDialog } from "./CreatePRDialog";
import JSZip from "jszip";
import FileSaver from "file-saver";

interface CodeViewerProps {
  generatedFiles: { [key: string]: string };
  fileNames: { [key: string]: string };
  pattern: string;
  className: string;
  usageContent: React.ReactNode;
}

export function CodeViewer({
  generatedFiles,
  fileNames,
  pattern,
  className,
  usageContent,
}: CodeViewerProps) {
  const [activeFile, setActiveFile] = useState(
    Object.keys(generatedFiles)[0] || "main"
  );
  const [copied, setCopied] = useState(false);
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [createPRDialogOpen, setCreatePRDialogOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedFiles[activeFile] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyReadme = () => {
    const readmeContent = generatedFiles["readme"] || "";
    navigator.clipboard.writeText(readmeContent);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  const handleDownloadReadme = () => {
    const readmeContent = generatedFiles["readme"] || "";
    const blob = new Blob([readmeContent], {
      type: "text/markdown;charset=utf-8",
    });
    FileSaver.saveAs(blob, "README.md");
  };

  const handleDownloadFile = () => {
    const blob = new Blob([generatedFiles[activeFile] || ""], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, fileNames[activeFile] || "file.txt");
  };

  const handleDownloadAll = async () => {
    try {
      const zip = new JSZip();

      // Add each file to the zip
      Object.keys(generatedFiles).forEach((key) => {
        if (fileNames[key]) {
          zip.file(fileNames[key], generatedFiles[key] || "");
        }
      });

      // Generate the zip file and trigger download
      const content = await zip.generateAsync({ type: "blob" });
      FileSaver.saveAs(content, `${pattern}-unity-${className}.zip`);
    } catch (error) {
      console.error("Error creating zip file:", error);
      alert("Error creating zip file. Please try again.");
    }
  };

  return (
    <>
      <SavePatternDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        generatedFiles={generatedFiles}
        pattern={pattern}
        className={className}
      />
      <CreatePRDialog
        open={createPRDialogOpen}
        onOpenChange={setCreatePRDialogOpen}
        generatedFiles={generatedFiles}
        fileNames={fileNames}
        pattern={pattern}
        className={className}
      />
      <Tabs defaultValue="code">
        <div className="flex items-center justify-between border-b px-4 absolute top-0 right-0 left-0 z-10">
          <TabsList className="h-12">
            <TabsTrigger value="code" className="flex items-center">
              <Code2 className="mr-2 h-4 w-4" />
              Código
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center">
              <Code2 className="mr-2 h-4 w-4" />
              Uso
            </TabsTrigger>
          </TabsList>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Wand2 className="mr-2 h-4 w-4" />
                Acciones
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setSaveDialogOpen(true)}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Patrón
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCreatePRDialogOpen(true)}>
                <GitPullRequest className="mr-2 h-4 w-4" />
                Crear Pull Request
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopyReadme}>
                {copiedReadme ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    README Copiado
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Copiar README
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadReadme}>
                <Download className="mr-2 h-4 w-4" />
                Descargar README
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Código Copiado
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="mr-2 h-4 w-4" />
                    Copiar Código
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadFile}>
                <Download className="mr-2 h-4 w-4" />
                Descargar Archivo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDownloadAll}>
                <Archive className="mr-2 h-4 w-4" />
                Descargar Todo (ZIP)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <TabsContent value="code" className="m-0 pt-[50px]">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              {Object.keys(generatedFiles).map((key) => (
                <button
                  key={key}
                  className={`px-4 py-2 text-sm whitespace-nowrap ${
                    activeFile === key
                      ? "border-b-2 border-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveFile(key)}
                >
                  {fileNames[key] || key}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-[600px] min-h-[400px]">
            <Textarea
              className="font-mono text-sm h-full rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={generatedFiles[activeFile] || ""}
              readOnly
            />
          </div>
        </TabsContent>
        <TabsContent value="usage" className="p-4 space-y-4">
          {usageContent}
        </TabsContent>
      </Tabs>
    </>
  );
}
