"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SCHEMA_GENERATION_PROMPT } from "@/lib/prompts";
import { EntityNode } from "@/components/Entity";
import { Edge } from "@xyflow/react";
import { ChatMessage } from "@/lib/types/chat.type";
import { Content } from "@google/generative-ai";

interface SchemaResponse {
  type: "schema" | "chat" | "error";
  nodes?: EntityNode[];
  edges?: Edge[];
  message?: string;
  reasoning?: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateSchemaAction(
  userInput: string,
  chatHistory: ChatMessage[],
  currentNodes: EntityNode[],
  currentEdges: Edge[]
): Promise<SchemaResponse> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

  const mappedHistory: Content[] = chatHistory.map((msg) => ({
    role: msg.sender === "user" ? "user" : "model",
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
      contents: [
        ...mappedHistory,
        { role: "user", parts: [{ text: fullPrompt }] },
      ],
    });

    const response = result.response;
    let text = response.text();
    console.log("Raw LLM Response:", text);

    // 🔹 Remove markdown code fences and trim
    text = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, "$1").trim();
    console.log("Sanitized Response:", text);

    // Try to parse the response as JSON first
    try {
      const parsedResponse = JSON.parse(text);
      console.log("Parsed Response:", parsedResponse);

      if (
        parsedResponse.type === "schema" &&
        parsedResponse.nodes &&
        parsedResponse.edges
      ) {
        return {
          type: "schema",
          nodes: parsedResponse.nodes,
          edges: parsedResponse.edges,
          message: parsedResponse.message || "Schema updated successfully!",
          reasoning: parsedResponse.reasoning,
        };
      }

      if (parsedResponse.type === "chat") {
        return {
          type: "chat",
          message: parsedResponse.message || "I understand your message.",
          reasoning: parsedResponse.reasoning,
        };
      }

      return {
        type: "chat",
        message: parsedResponse.message || text,
        reasoning: parsedResponse.reasoning,
      };
    } catch (err) {
      console.warn("JSON parsing failed:", err);
      return {
        type: "chat",
        message: text,
        reasoning:
          "Response was not in valid JSON format, treating as chat message.",
      };
    }
  } catch (error) {
    console.error("Error generating content from AI:", error);
    return {
      type: "error",
      message: "Failed to generate response from AI. Please try again.",
      reasoning: "AI service error occurred.",
    };
  }
}
