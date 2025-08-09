# Gemini Agent Rules and Context

## Code Style and Typing
- **Avoid `any` type**: Never use `any` as a type in TypeScript. Always strive for explicit and strict typing. If a type is unknown or complex, define an interface or a more specific generic type.

## Codebase Context
- **React Flow Custom Nodes**: The project uses `@xyflow/react` for flow diagrams. Custom nodes, such as `Entity` components, are defined. The data structure for these nodes conforms to `EntityProps['data']`.