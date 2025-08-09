import { Edge } from "@xyflow/react";
import { EntityNode } from "@/components/Entity";

export const initialNodes: EntityNode[] = [
  {
    id: "1",
    type: "entity",
    position: { x: 250, y: 5 },
    data: {
      name: "Users",
      properties: [
        { id: "p1", name: "id", type: "UUID" },
        { id: "p2", name: "username", type: "VARCHAR(255)" },
        { id: "p3", name: "email", type: "VARCHAR(255)" },
        { id: "p4", name: "created_at", type: "TIMESTAMP" },
      ],
    },
  },
  {
    id: "2",
    type: "entity",
    position: { x: 100, y: 200 },
    data: {
      name: "Products",
      properties: [
        { id: "p1", name: "id", type: "UUID" },
        { id: "p2", name: "name", type: "VARCHAR(255)" },
        { id: "p3", name: "price", type: "DECIMAL(10, 2)" },
        { id: "p4", name: "stock", type: "INT" },
      ],
    },
  },
  {
    id: "3",
    type: "entity",
    position: { x: 400, y: 200 },
    data: {
      name: "Orders",
      properties: [
        { id: "p1", name: "id", type: "UUID" },
        { id: "p2", name: "user_id", type: "UUID" },
        { id: "p3", name: "product_id", type: "UUID" },
        { id: "p4", name: "quantity", type: "INT" },
        { id: "p5", name: "order_date", type: "TIMESTAMP" },
      ],
    },
  },
  {
    id: "4",
    type: "entity",
    position: { x: 600, y: 100 },
    data: {
      name: "Categories",
      properties: [
        { id: "p1", name: "id", type: "UUID" },
        { id: "p2", name: "name", type: "VARCHAR(255)" },
      ],
    },
  },
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-1", source: "3", target: "1" },
  { id: "e2-4", source: "2", target: "4" },
];
