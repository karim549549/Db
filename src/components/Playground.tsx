import React from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
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
}

export default function Playground({ nodeTypes, ...props }: PlaygroundProps) {
  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      fitView
      {...props}
    >
      <Background gap={10} variant={BackgroundVariant.Lines} />
      <Controls />
    </ReactFlow>
  );
}
