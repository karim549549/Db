import { useState, useEffect } from 'react';
import { Edge } from '@xyflow/react';
import { EntityNode } from '@/components/Entity';
import { initialNodes, initialEdges } from '@/lib/constants/Intitial';

const LOCAL_STORAGE_NODES_KEY = 'flowNodes';
const LOCAL_STORAGE_EDGES_KEY = 'flowEdges';

export const useSchemaPersistence = () => {
  const [nodes, setNodes] = useState<EntityNode[]>(() => {
    if (typeof window !== 'undefined') {
      const storedNodes = localStorage.getItem(LOCAL_STORAGE_NODES_KEY);
      return storedNodes ? JSON.parse(storedNodes) : initialNodes;
    }
    return initialNodes;
  });

  const [edges, setEdges] = useState<Edge[]>(() => {
    if (typeof window !== 'undefined') {
      const storedEdges = localStorage.getItem(LOCAL_STORAGE_EDGES_KEY);
      return storedEdges ? JSON.parse(storedEdges) : initialEdges;
    }
    return initialEdges;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_NODES_KEY, JSON.stringify(nodes));
    }
  }, [nodes]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_EDGES_KEY, JSON.stringify(edges));
    }
  }, [edges]);

  const clearSchema = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  return { nodes, setNodes, edges, setEdges, clearSchema };
};
