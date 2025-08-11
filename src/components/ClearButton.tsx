"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSchemaStore } from "@/stores/schemaStore";

function ClearButton() {
  const { clearSchema } = useSchemaStore();

  return (
    <Button variant="outline" size="sm" onClick={clearSchema} title="Clear Schema">
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

export default ClearButton;
