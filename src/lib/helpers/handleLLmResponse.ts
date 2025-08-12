import { useSchemaContextStore } from "@/stores/schemaContext";
import { ContextUpdate, SchemaResponse } from "@/lib/types/schema.type";

// Safe JSON parse with type inference
function safeJSONParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    try {
      const fixed = text
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]")
        .replace(/[\u0000-\u001F]+/g, "");
      return JSON.parse(fixed) as T;
    } catch {
      return null;
    }
  }
}

export function handleLLMResponse(rawText: string): SchemaResponse {
  console.log("Raw LLM Response:", rawText);

  const cleanedText = rawText
    .replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, "$1")
    .trim();

  console.log("Sanitized Response:", cleanedText);

  const parsed = safeJSONParse<SchemaResponse>(cleanedText);

  if (!parsed) {
    console.warn("Failed to parse LLM JSON, returning fallback.");
    return {
      type: "chat",
      message: cleanedText || "I couldn't process that response.",
      reasoning: "Invalid or unparsable JSON. Using plain text.",
      context_update: {
        summary: "",
        entities: [],
        schema_changes: [],
        tokens_used: 0,
      },
    };
  }

  const context_update: ContextUpdate = parsed.context_update?.summary
    ? parsed.context_update
    : { summary: "", entities: [], schema_changes: [], tokens_used: 0 };

  // Save context for next request
  if (context_update.summary) {
    const { setContext } = useSchemaContextStore.getState();
    setContext(context_update.summary);
  }

  // Decide what type of response it is
  if (
    parsed.type === "schema" &&
    Array.isArray(parsed.nodes) &&
    Array.isArray(parsed.edges)
  ) {
    return {
      type: "schema",
      nodes: parsed.nodes,
      edges: parsed.edges,
      message: parsed.message || "Schema updated successfully!",
      reasoning: parsed.reasoning || "",
      context_update,
    };
  }

  if (parsed.type === "chat") {
    return {
      type: "chat",
      message: parsed.message || "I understand your message.",
      reasoning: parsed.reasoning || "",
      context_update,
    };
  }

  // Unknown type
  console.warn("Unknown LLM response type:", parsed.type);
  return {
    type: "chat",
    message: parsed.message || cleanedText,
    reasoning: parsed.reasoning || "Unknown response type from LLM.",
    context_update,
  };
}
