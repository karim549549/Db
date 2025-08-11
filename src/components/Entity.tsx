import React, { memo } from "react";
import { Node, NodeProps, Handle, Position } from "@xyflow/react";

export type EntityData = {
  name: string;
  properties: {
    id: string;
    name: string;
    type: string;
    required?: boolean;
  }[];
};
export type EntityNode = Node<EntityData, "entity">;

function Entity({ data }: NodeProps<EntityNode>) {
  return (
    <div className="rounded-md bg-card shadow-md border border-border overflow-hidden min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-primary" />

      <div className="bg-primary text-primary-foreground p-2 font-bold text-center">
        {data.name}
      </div>

      <div className="p-2">
        {data.properties.map((prop) => (
          <div key={prop.id} className="flex justify-between text-sm py-1 border-b last:border-b-0">
            <span className="font-medium">
              {prop.required ? "*" : ""} {prop.name}
            </span>
            <span className="text-muted-foreground">{prop.type}</span>
          </div>
        ))}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary" />
    </div>
  );
}

export default memo(Entity);
