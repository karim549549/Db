"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SCHEMA_GENERATION_PROMPT } from "@/lib/prompts";
import { EntityNode } from "@/components/Entity";
import { Edge } from "@xyflow/react";

interface SchemaResponse {
  type: 'schema' | 'message';
  nodes?: EntityNode[];
  edges?: Edge[];
  message?: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

import { ChatMessage } from "@/lib/types/chat.type";
import { Content } from "@google/generative-ai";

// ... (rest of the file)

export async function generateSchemaAction(
  userInput: string,
  chatHistory: ChatMessage[],
  currentNodes: EntityNode[],
  currentEdges: Edge[]
): Promise<SchemaResponse> {
  // ... (rest of the function)

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

  const mappedHistory: Content[] = chatHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));

  const fullPrompt = `
${SCHEMA_GENERATION_PROMPT}

---
Current Schema:
Nodes: ${JSON.stringify(currentNodes, null, 2)}
Edges: ${JSON.stringify(currentEdges, null, 2)}
---

User Input: ${userInput}
`;

  try {
    const result = await model.generateContent({
      contents: [...mappedHistory, { role: 'user', parts: [{ text: fullPrompt }] }],
    });
    const response = result.response;
    const text = response.text();

    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);

    if (jsonMatch && jsonMatch[1]) {
      try {
        const parsedResponse = JSON.parse(jsonMatch[1]);
        return { type: 'schema', nodes: parsedResponse.nodes, edges: parsedResponse.edges };
      } catch (jsonError) {
        console.error("Error parsing JSON from AI response:", jsonError);
        return { type: 'message', message: "I received a schema, but it was malformed. Please try again." };
      }
    } else {
      return { type: 'message', message: text };
    }
  } catch (error) {
    console.error("Error generating content from AI:", error);
    throw new Error("Failed to generate schema from AI.");
  }
}
