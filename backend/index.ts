import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import "dotenv/config";

// 1. Plain JSON schema for Gemini (no zod-to-json-schema needed)
const medicalJsonSchema = {
  type: "object",
  properties: {
    problem: {
      type: "string",
      description: "The medical problem identified",
    },
    symptoms: {
      type: "array",
      items: { type: "string" },
      description: "List of symptoms",
    },
    prognosis: {
      type: "string",
      description: "Expected outcome or prognosis",
      nullable: true,
    },
    severity: {
      type: "string",
      enum: ["Low", "Medium", "High"],
      description: "Severity level",
      nullable: true,
    },
  },
  required: ["problem", "symptoms"],
};

// 2. Zod schema only used for TypeScript type + runtime validation
const MedicalSchema = z.object({
  problem: z.string(),
  symptoms: z.array(z.string()),
  prognosis: z.string().optional(),
  severity: z.enum(["Low", "Medium", "High"]).optional(),
});

type MedicalOutput = z.infer<typeof MedicalSchema>;

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: [
      { role: "user", parts: [{ text: "I have a sharp pain in my knee." }] },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: medicalJsonSchema,  // ← plain object, always works
    },
  });

  const raw = response.text;
  if (!raw) throw new Error("Empty response from model");

  const parsed: MedicalOutput = MedicalSchema.parse(JSON.parse(raw));

  console.log("--- STRUCTURED OUTPUT ---");
  console.log(parsed);
}

main().catch(console.error);