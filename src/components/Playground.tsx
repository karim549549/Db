import React from "react";
import {
  ReactFlow,
  Background,
  Controls,
  NodeTypes,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";

interface PlaygroundProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  nodeTypes: NodeTypes;
  className?: string;
  isLoading?: boolean;
}

export default function Playground({ nodeTypes, className, isLoading, ...props }: PlaygroundProps) {
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-2xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            <p className="text-lg font-medium">Generating schema...</p>
          </div>
        </div>
      )}
      <ReactFlow
        nodeTypes={nodeTypes}
        fitView
        {...props}
      >
        <Background gap={10}/>
        <Controls />
      </ReactFlow>
    </div>
  );
}
