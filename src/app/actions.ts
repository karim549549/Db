"use server";

import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { buildPrompt } from "@/lib/helpers/promptbuilder";
import { EntityNode } from "@/components/Entity";
import { Edge } from "@xyflow/react";
import { SchemaResponse } from "@/lib/types/schema.type";
import { handleLLMResponse } from "@/lib/helpers/handleLLmResponse";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate schema or chat response from Gemini based on the current graph state and chat history
 */
export async function generateSchemaAction(
  userInput: string,
  currentNodes: EntityNode[],
  currentEdges: Edge[]
): Promise<SchemaResponse> {
  try {
    const fullPrompt = buildPrompt(userInput, currentNodes, currentEdges);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
    });
    return handleLLMResponse(result.response.text());
  } catch (error) {
    console.error("Error generating schema:", error);
    return {
      type: "error",
      message: "Failed to generate response from AI. Please try again.",
      reasoning:
        error instanceof Error ? error.message : "Unknown AI service error.",
      context_update: {
        summary: "",
        entities: [],
        schema_changes: [],
        tokens_used: 0,
      },
    };
  }
}
