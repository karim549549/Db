import React, { memo, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSchemaStore } from "@/stores/schemaStore";

interface LeftSheetProps {
  onSheetClose?: () => void;
}

export interface LeftSheetRef {
  open: () => void;
  close: () => void;
}

const LeftSheet = forwardRef<LeftSheetRef, LeftSheetProps>(({ onSheetClose }, ref) => {
  const { nodes, edges, selectedNode, handleNodeDataChange } = useSchemaStore();
  const [name, setName] = useState(selectedNode?.data.name || "");
  const [properties, setProperties] = useState(selectedNode?.data.properties || []);
  const [isOpen, setIsOpen] = useState(true);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));

  useEffect(() => {
    if (selectedNode) {
      setName(selectedNode.data.name);
      setProperties(selectedNode.data.properties);
    } else {
      setName("");
      setProperties([]);
    }
  }, [selectedNode]);

  const handleClose = () => {
    setIsOpen(false);
    onSheetClose?.();
  };

  const handleSave = () => {
    if (selectedNode) {
      handleNodeDataChange(selectedNode.id, { name, properties });
    }
  };

  const handlePropertyChange = (index: number, field: string, value: string) => {
    const newProperties = [...properties];
    newProperties[index] = { ...newProperties[index], [field]: value };
    setProperties(newProperties);
  };

  const addProperty = () => {
    setProperties([...properties, { id: `prop-${Date.now()}`, name: "", type: "" }]);
  };

  const removeProperty = (index: number) => {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  };

  if (!isOpen) return null;

  return (
    <div className="h-full w-80 border-r bg-background p-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Schema</h2>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {selectedNode ? (
        <div>
          <h3 className="text-md font-semibold mt-4">Edit Node</h3>
          <div className="mt-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <h4 className="text-md font-semibold mt-4">Properties</h4>
          {properties.map((prop, index) => (
            <div key={prop.id} className="flex items-center gap-2 mt-2">
              <Input
                placeholder="Name"
                value={prop.name}
                onChange={(e) => handlePropertyChange(index, "name", e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Type"
                value={prop.type}
                onChange={(e) => handlePropertyChange(index, "type", e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" onClick={() => removeProperty(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button onClick={addProperty} className="mt-2">Add Property</Button>
          <Button onClick={handleSave} className="mt-4">Save</Button>
        </div>
      ) : (
        <div>
          <h3 className="text-md font-semibold mt-4">Nodes</h3>
          <ul className="text-sm text-muted-foreground">
            {nodes.map((node) => (
              <li key={node.id}>{node.data.name}</li>
            ))}
          </ul>
          <h3 className="text-md font-semibold mt-4">Edges</h3>
          <ul className="text-sm text-muted-foreground">
            {edges.map((edge) => (
              <li key={edge.id}>{`${edge.source} -> ${edge.target}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

LeftSheet.displayName = 'LeftSheet';

export default memo(LeftSheet);
