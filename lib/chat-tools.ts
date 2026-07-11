
import { tool, type InferUITools, type ToolSet } from 'ai';
import { z } from 'zod';

export const chatTools = {
  getSubList: tool({
    description: 'Getting active subscriptions',
    inputSchema: z.object({}),
  }),
  getVideos: tool({
    description: 'Get the latest couple of videos based on a channel id',
    inputSchema: z.object({
      channelId: z.string().describe('The YouTube channel ID'),
    }),
  }),
} satisfies ToolSet;

export type ChatUITools = InferUITools<typeof chatTools>;