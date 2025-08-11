# Gemini Agent Rules and Context

## Code Style and Typing
- **Avoid `any` type**: Never use `any` as a type in TypeScript. Always strive for explicit and strict typing. If a type is unknown or complex, define an interface or a more specific generic type.

## Codebase Context
- **React Flow**: The project uses `@xyflow/react` for flow diagrams.
- **Custom Nodes**: The diagram uses custom nodes, specifically the `Entity` component, to represent database tables or other entities. The data for these nodes is defined by the `EntityData` type.
- **State Management**: The main application state (nodes, edges, selected node, loading state) is managed by `zustand` in `src/stores/schemaStore.ts`. The `useSchemaStore` hook provides access to the state and functions to manipulate it. The state is persisted to local storage.
- **Component Structure**:
    - `Playground.tsx`: A wrapper around the `ReactFlow` component that displays the diagram. It gets the state from the `useSchemaStore`.
    - `LeftSheet.tsx`: A side panel used for manually editing the schema. It displays the list of nodes and edges, and a form to edit the selected node's properties.
    - `ChatAi.tsx`: A chat interface for interacting with the AI to generate and modify the schema. It uses the `useChatHistory` hook to manage chat history and calls the `generateSchemaAction` server action.
    - `Entity.tsx`: The custom node component for the flow diagram.

## Application Architecture
- **State Management**: The application uses `zustand` for centralized state management.
- **Component Communication**: Components communicate primarily through the `zustand` store.
- **Schema Editing**:
    - **Manual Editing**: The `LeftSheet` component allows users to manually edit the properties of a selected node (entity). Changes are saved to the `zustand` store.
    - **AI-powered Editing**: The `ChatAi` component allows users to generate and modify the schema using natural language prompts. The `generateSchemaAction` server action is used to process the prompts and return the updated schema, which is then saved to the `zustand` store.

## TODOs from TODO.md
- [ ] Fix AI response handling (no raw JSON shown)
  - [ ] Server (`src/app/actions.ts`): parse code-fenced JSON first; fallback to raw JSON; else treat as chat string only
  - [ ] Client (`src/components/ChatAi.tsx`):
    - [ ] If response.type === "schema": apply via store (`setNodes`, `setEdges`) and append only `response.message`
    - [ ] If response.type === "chat": append only `response.message`
    - [ ] Never append raw JSON
  - [ ] (Optional) Add Zod validator for schema shape
- [ ] Add missing not-found route
  - [ ] Create `src/app/not-found.tsx` to fix build error
- [ ] Remove initial demo nodes/edges
  - [ ] In `src/stores/schemaStore.ts`, initialize to empty arrays while keeping localStorage hydration
- [ ] LeftSheet: manual editing features + UI polish
  - [ ] Entity CRUD: create, rename, delete
  - [ ] Property CRUD: add/remove, edit name/type (dropdown: VARCHAR, TEXT, INT, DECIMAL, UUID, TIMESTAMP, BOOLEAN)
  - [ ] Relationship management: add/remove edges (source/target pickers)
  - [ ] Validation (no empty names, unique IDs), sticky footer Save/Discard
- [ ] Reduce re-renders via selective subscriptions
  - [ ] Use Zustand selectors with `shallow` in `Playground` and `LeftSheet`
- [ ] Improve readability: auto-layout
  - [ ] Integrate Dagre/ELK to compute positions on schema updates to minimize edge crossings
- [ ] Backend decision
  - [ ] Keep Next.js fullstack for now (decouple later if/when needed)
- [ ] UX polish
  - [ ] Scoped spinner; disable Chat input while generating
  - [ ] Success/error toasts for schema apply
  - [ ] Debounce/rate-limit generate action
