import { EntityNode } from "@/components/Entity";
import { Edge } from "@xyflow/react";

// ----------------------------------
// Field Types
// ----------------------------------
export interface Field {
  id?: string; // optional since LLM might generate it
  name: string;
  type: FieldType;
  required?: boolean;
}

export enum FieldType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Date = "date",
  Array = "array",
  Object = "object",
}

// ----------------------------------
// Entities & Schema
// ----------------------------------
export interface Entity {
  id?: string; // matching Node.id
  type?: "entity";
  position?: { x: number; y: number };
  data?: {
    name: string;
    properties: Field[];
  };
  relationships?: {
    name: string;
    type: string;
  }[];
}

export interface Schema {
  entities: Entity[];
}

// ----------------------------------
// Context from LLM
// ----------------------------------
export interface ContextUpdate {
  summary: string; // short summary of new info to remember
  entities: string[]; // entity names mentioned
  schema_changes: string[]; // changes or decisions made
  tokens_used: number; // tokens consumed this turn
}

// ----------------------------------
// Context for app state
// ----------------------------------
export type SchemaContext = {
  nodes: EntityNode[];
  edges: Edge[];
};

// ----------------------------------
// Main Response Type from LLM
// ----------------------------------
export type SchemaType = "schema" | "chat" | "error";

export interface SchemaResponse {
  type: SchemaType;
  message: string;
  reasoning: string;
  nodes?: EntityNode[]; // only present if type = schema
  edges?: Edge[]; // only present if type = schema
  context_update: ContextUpdate; // always present
}

// ----------------------------------
// Params for our action
// ----------------------------------
export interface GenerateSchemaParams {
  userInput: string;
  currentContext: SchemaContext;
}
