import "dotenv/config";
import {GoogleGenAI} from '@google/genai';
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const a = z.string().describe('test').meta();


console.log(a);