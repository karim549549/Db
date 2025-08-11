"use client";
import React, { memo, useCallback } from "react";
import {
  ReactFlow,
  NodeTypes,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeMouseHandler,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import { useSchemaStore } from "@/stores/schemaStore";
import { EntityNode } from "@/components/Entity";
import Entity from "@/components/Entity";
import MemoizedBackground from "./MemoizedBackground";
import MemoizedControls from "./MemoizedControls";

interface PlaygroundProps {
  className?: string;
}

function Playground({ className }: PlaygroundProps) {
  const { nodes, edges, setNodes, setEdges, setSelectedNode, isLoading } = useSchemaStore();
  
  const nodeTypes: NodeTypes = { entity: Entity };
  
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodes) as EntityNode[]),
    [nodes, setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback((changes) => {
    setEdges(applyEdgeChanges(changes, edges));
  }, [edges, setEdges]);

  const onConnect: OnConnect = useCallback((connection) => {
    setEdges(addEdge(connection, edges));
  }, [edges, setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedNode(node as EntityNode);
  }, [setSelectedNode]);
  
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-2xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            <p className="text-lg font-medium">Generating schema...</p>
          </div>
        </div>
      )}
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <MemoizedBackground gap={10}/>
        <MemoizedControls />
      </ReactFlow>
    </div>
  );
}

export default memo(Playground);
