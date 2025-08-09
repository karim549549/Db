"use server";
import { GoogleGenAI } from "@google/genai";
import { SCHEMA_GENERATION_PROMPT } from "@/lib/prompts";
import { EntityNode } from "@/components/Entity";
import { Edge } from "@xyflow/react";

interface SchemaResponse {
  nodes: EntityNode[];
  edges: Edge[];
}

const model = new GenerativeModel({ model: "gemini-2.0-flash-001" });
export async function generateSchemaAction(
  userInput: string
): Promise<SchemaResponse> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }
  console.log(
    "Using API Key (last 5 chars):",
    process.env.GEMINI_API_KEY.slice(-5)
  );

  const model = new GenerativeModel({ model: "gemini-2.0-flash-001" });
  const prompt = SCHEMA_GENERATION_PROMPT + userInput;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Attempt to parse the JSON. The model might return extra text or markdown.
    // Attempt to parse the JSON. The model might return extra text or markdown.
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    let jsonString = text;

    if (jsonMatch && jsonMatch[1]) {
      jsonString = jsonMatch[1];
    }

    const parsedResponse: SchemaResponse = JSON.parse(jsonString);
    return parsedResponse;
  } catch (error) {
    console.error("Error generating content from AI:", error);
    throw new Error("Failed to generate schema from AI.");
  }
}
