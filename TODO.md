# Today TODO

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
