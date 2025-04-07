"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Download, Plus, Save, Share2, Trash2 } from "lucide-react"
import { useCallback, useState } from "react"
import ReactFlow, { addEdge, Background, Controls, MiniMap, Panel, useEdgesState, useNodesState } from "reactflow"
import "reactflow/dist/style.css"

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "GameManager" },
    position: { x: 250, y: 5 },
    className: "bg-primary/10 border-primary/50 border rounded-md",
  },
  {
    id: "2",
    data: { label: "PlayerController" },
    position: { x: 100, y: 100 },
    className: "bg-background border rounded-md",
  },
  {
    id: "3",
    data: { label: "EnemyManager" },
    position: { x: 400, y: 100 },
    className: "bg-background border rounded-md",
  },
  {
    id: "4",
    data: { label: "UIController" },
    position: { x: 250, y: 200 },
    className: "bg-background border rounded-md",
  },
]

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e1-4", source: "1", target: "4", animated: true },
]

export default function DiagramPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [nodeName, setNodeName] = useState("")

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const addNode = useCallback(() => {
    if (!nodeName) return

    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: nodeName },
      position: {
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
      },
      className: "bg-background border rounded-md",
    }

    setNodes((nds) => nds.concat(newNode))
    setNodeName("")
  }, [nodeName, nodes.length, setNodes])

  const clearDiagram = useCallback(() => {
    setNodes([])
    setEdges([])
  }, [setNodes, setEdges])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">Pattern Diagram Editor</h1>
              <p className="text-muted-foreground">Create and visualize design pattern relationships for your game</p>
            </div>
            <div className="grid gap-4 md:grid-cols-[300px_1fr]">
              <div className="flex flex-col gap-4">
                <Card>
                  <CardContent className="p-4">
                    <Tabs defaultValue="add">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="add">Add</TabsTrigger>
                        <TabsTrigger value="templates">Templates</TabsTrigger>
                      </TabsList>
                      <TabsContent value="add" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="node-name">Node Name</Label>
                          <div className="flex gap-2">
                            <Input
                              id="node-name"
                              value={nodeName}
                              onChange={(e) => setNodeName(e.target.value)}
                              placeholder="Class name"
                            />
                            <Button size="icon" onClick={addNode}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Actions</Label>
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={clearDiagram}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Clear
                            </Button>
                            <Button variant="outline" size="sm">
                              <Save className="mr-2 h-4 w-4" />
                              Save
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="templates" className="pt-4">
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start" size="sm">
                            Singleton Pattern
                          </Button>
                          <Button variant="outline" className="w-full justify-start" size="sm">
                            Factory Method Pattern
                          </Button>
                          <Button variant="outline" className="w-full justify-start" size="sm">
                            Observer Pattern
                          </Button>
                          <Button variant="outline" className="w-full justify-start" size="sm">
                            State Pattern
                          </Button>
                          <Button variant="outline" className="w-full justify-start" size="sm">
                            Component Pattern
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Instructions</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Drag nodes to position them</li>
                      <li>• Connect nodes by dragging from one handle to another</li>
                      <li>• Use the panel on the left to add new nodes</li>
                      <li>• Save your diagram to revisit later</li>
                      <li>• Export as PNG or SVG for documentation</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="h-[600px] border rounded-md bg-muted/30">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  fitView
                >
                  <Controls />
                  <MiniMap />
                  <Background />
                  <Panel position="top-right">
                    <div className="bg-background p-2 rounded-md shadow-sm border">
                      <p className="text-xs text-muted-foreground">Drag between nodes to create connections</p>
                    </div>
                  </Panel>
                </ReactFlow>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

