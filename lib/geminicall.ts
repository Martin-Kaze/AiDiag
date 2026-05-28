import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import process from "node:process";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY! });




const StructuredResponse = z.object({
  validity: z.boolean(),
  title: z.string().describe('how hsi symptom relate to his subsciber list'),
  description: z.string().describe('cahnnels eh subicers like top 3 first'),
  questions1: z.object({
    title: z.string().describe('questions title, shortest as possib;e'),
    descript: z.string(),
    answers: z.array(z.string()).length(3)
  }).optional().describe('find channel repalted to user symtpom and ask mroe info tto know how these channels u personlay knwo affect him'),
  question2: z.object({
    title: z.string().describe('questions title, shortest as possib;e'),
    descript: z.string(),
    answers: z.array(z.string()).length(3)
  }).optional().describe('find channel repalted to user symtpom and ask mroe info tto know how these channels u personlay knwo affect him'),
  analysis: z.string().optional() 
});

const FinalResponseSchemaarray = z.array(StructuredResponse);

 const  schema =z.object({
howmanychannles : z.number().describe('number of how many channles user subviberd'),
symptomarray : FinalResponseSchemaarray,
 });


export const AiResult = async (symptoms: string) => {

  if (!genAI || !genAI.models) {
    throw new Error("GenAI is not initialized. Check your API Key.");
  }
  const result = await genAI.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: symptoms,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: schema.toJSONSchema(),
      thinkingConfig: { thinkingBudget: 0 }
    },
  });

  if (!result || !result.text) {
    throw new Error("No response text received from AI");
  }
  const responseText = result.text; 
  return JSON.parse(responseText);
};
