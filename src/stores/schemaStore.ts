import { create } from "zustand";
import { Edge } from "@xyflow/react";
import { EntityNode } from "@/components/Entity";
import { EntityData } from "@/components/Entity";
import { initialNodes, initialEdges } from "@/lib/constants/Intitial";

interface SchemaState {
  nodes: EntityNode[];
  edges: Edge[];
  selectedNode: EntityNode | null;
  isLoading: boolean;
  setNodes: (nodes: EntityNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNode: (node: EntityNode | null) => void;
  setLoading: (loading: boolean) => void;
  clearSchema: () => void;
  updateNode: (nodeId: string, data: Partial<EntityNode["data"]>) => void;
  handleNodeDataChange: (nodeId: string, data: Partial<EntityData>) => void;
}

const LOCAL_STORAGE_NODES_KEY = "flowNodes";
const LOCAL_STORAGE_EDGES_KEY = "flowEdges";

// Load initial state from localStorage
const getInitialNodes = (): EntityNode[] => {
  if (typeof window !== "undefined") {
    const storedNodes = localStorage.getItem(LOCAL_STORAGE_NODES_KEY);
    return storedNodes ? JSON.parse(storedNodes) : initialNodes;
  }
  return initialNodes;
};

const getInitialEdges = (): Edge[] => {
  if (typeof window !== "undefined") {
    const storedEdges = localStorage.getItem(LOCAL_STORAGE_EDGES_KEY);
    return storedEdges ? JSON.parse(storedEdges) : initialEdges;
  }
  return initialEdges;
};

export const useSchemaStore = create<SchemaState>((set, get) => ({
  nodes: getInitialNodes(),
  edges: getInitialEdges(),
  selectedNode: null,
  isLoading: false,

  setNodes: (nodes: EntityNode[]) => {
    set({ nodes });
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_NODES_KEY, JSON.stringify(nodes));
    }
  },

  setEdges: (edges: Edge[]) => {
    set({ edges });
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_EDGES_KEY, JSON.stringify(edges));
    }
  },

  setSelectedNode: (selectedNode: EntityNode | null) => {
    set({ selectedNode });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  clearSchema: () => {
    set({ nodes: initialNodes, edges: initialEdges, selectedNode: null });
    if (typeof window !== "undefined") {
      localStorage.setItem(
        LOCAL_STORAGE_NODES_KEY,
        JSON.stringify(initialNodes)
      );
      localStorage.setItem(
        LOCAL_STORAGE_EDGES_KEY,
        JSON.stringify(initialEdges)
      );
    }
  },

  updateNode: (nodeId: string, data: Partial<EntityNode["data"]>) => {
    const { nodes } = get();
    const updatedNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, data: { ...node.data, ...data } };
      }
      return node;
    });
    get().setNodes(updatedNodes);
  },

  handleNodeDataChange: (nodeId: string, data: Partial<EntityData>) => {
    get().updateNode(nodeId, data);
  },
}));
