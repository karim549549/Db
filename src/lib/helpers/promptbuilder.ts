import { EntityNode } from "@/components/Entity";
import { Edge } from "@xyflow/react";
import { SCHEMA_GENERATION_PROMPT } from "../prompts";
import { useSchemaContextStore } from "@/stores/schemaContext";

export function buildPrompt(
  userInput: string,
  nodes: EntityNode[],
  edges: Edge[]
): string {
  const { context } = useSchemaContextStore.getState();

  return `
${SCHEMA_GENERATION_PROMPT}

---
Current Context (Summarized from earlier steps):
${context}
---
Current Schema:
Nodes: ${JSON.stringify(nodes, null, 2)}
Edges: ${JSON.stringify(edges, null, 2)}
---

User Input: ${userInput}
`;
}
