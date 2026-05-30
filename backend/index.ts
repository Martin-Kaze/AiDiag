import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import process from "node:process";


process.loadEnvFile();

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const Address = z.object({
  street: z.string(),
  city: z.string(),
});

const Person = z.object({
  homeAddress: Address,
  workAddress: Address,
  name: z.string(),
});

console.log(JSON.stringify(Person.toJSONSchema(), null, 2));

const result = await genAI.models.generateContent({
  model: "gemini-3.1-flash-lite-preview",
  contents: "Return a woman old person with a name and age. and all other info",
  config: {
    responseMimeType: "application/json",
    responseJsonSchema: Person.toJSONSchema(),
    thinkingConfig: { thinkingBudget: 0 }
  },
});

console.log('--------------Results---------------');
console.log(result.text);