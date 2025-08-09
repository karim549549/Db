"use client";
import React, { useCallback, useState } from "react";
import Playground from "@/components/Playground";
import { EntityNode } from "@/components/Entity";
import { initialNodes, initialEdges } from "@/lib/constants/Intitial";
import {
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";
import ChatAi from "@/components/ChatAi";
import Entity from "@/components/Entity"; // Added import
import LeftSheet from "@/components/LeftSheet";
import ThemeSwitch from "@/components/ThemeSwitch";
import ShareButton from "@/components/ShareButton";
import ExportButton from "@/components/ExportButton";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import '@xyflow/react/dist/style.css';
import { generateSchemaAction } from "@/app/actions";

const nodeTypes = { entity: Entity }; // Added definition


export default function Flow() {
  const [nodes, setNodes] = useState<EntityNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isSheetOpen, setIsSheetOpen] = useState(true);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds) as EntityNode[]),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect: OnConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const handleGenerateSchema = async (userInput: string) => {
    console.log("Generating schema for:", userInput);
    try {
      const response = await generateSchemaAction(userInput);
      setNodes(response.nodes);
      setEdges(response.edges);
    } catch (error) {
      console.error("Failed to generate schema:", error);
    }
  };

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <div className="h-screen w-screen flex">
      <AnimatePresence>
        {isSheetOpen && (
          <motion.div
            key="left-sheet"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full z-50"
          >
            <LeftSheet toggleSheet={toggleSheet} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 relative">
        <Playground
          className="h-full w-full"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes} // Passed nodeTypes
        />

        <div className="absolute top-4 left-4 z-20">
          <AnimatePresence>
            {!isSheetOpen && (
              <motion.div
                key="toggle-button"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Button variant="outline" size="sm" onClick={toggleSheet}>
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
            <ExportButton />
            <ShareButton />
            <ThemeSwitch />
          </div>
        </div>

        <ChatAi onGenerateSchema={handleGenerateSchema} />
      </div>
    </div>
  );
}