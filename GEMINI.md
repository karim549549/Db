# Gemini Agent Rules and Context

## Code Style and Typing
- **Avoid `any` type**: Never use `any` as a type in TypeScript. Always strive for explicit and strict typing. If a type is unknown or complex, define an interface or a more specific generic type.

## Codebase Context
- **React Flow Custom Nodes**: The project uses `@xyflow/react` for flow diagrams. Custom nodes, such as `Entity` components, are defined. The data structure for these nodes conforms to `EntityProps['data']`.

## TODO: Chat AI Enhancements
- **Contextual Chat**: Implement logic for Gemini to maintain conversation context and apply iterative changes to schema based on user's follow-up prompts.
- **Prompt Quota/Limit**: Add a mechanism to limit the size or complexity of user prompts sent to the AI.
- **Append User Prompt to History**: Ensure all user inputs are consistently appended to the chat display history.
- **General Chat with Model**: Allow users to engage in general conversation with the AI model, not just schema generation.
- **Accept/Apply Changes Workflow**: Implement a workflow where the AI's proposed schema changes are presented to the user for explicit acceptance/application before being reflected in the Playground.
- **Append Model Response to History**: Ensure all AI model responses are consistently appended to the chat display history.
