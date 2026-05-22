import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import process from "node:process";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const Address = z.object({
  street: z.string().describe('ANY street adress but shoudl be logical, absed on request'),
  city: z.string().describe('ANY city but base on request, but shoudl be logical'),
});
const Person = z.object({
  homeAddress: Address,
  workAddress: Address,
  name: z.string().describe('same with the rqesut fi location then assumign it lives thre'),

});


const asnwer  = z.object({



});
const question = z.object({
  title: z.string().max(80).describe('question related to better udnertsd , analise later users sympotm'),
  descript: z.string().max(80).describe('mini explaining of a question'),
  answers: z.array(z.string()).length(3).describe('answers that user selects based on question, that provide most info')
});


const StructuredResponse = z.object({
  validity: z.boolean(),
  title: z.string().describe('user sympot title , one or two words'),
  description: z.string(),
  questions1: z.object({
    title: z.string().describe('questions title, shortest as possib;e'),
    descript: z.string(),
    answers: z.array(z.string()).length(3)
  }).optional(),
  question2: z.object({
    title: z.string().describe('questions title, shortest as possib;e'),
    descript: z.string(),
    answers: z.array(z.string()).length(3)
  }).optional(),
  analysis: z.string().optional() 
});

const FinalResponseSchemaarray = z.array(StructuredResponse);

 const  schema =z.object({
howmanysymp : z.number(),
symptomarray : FinalResponseSchemaarray,
 });


export const AiResult = async (symptoms: string) => {

  if (!genAI || !genAI.models) {
    throw new Error("GenAI is not initialized. Check your API Key.");
  }
  const result = await genAI.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
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
