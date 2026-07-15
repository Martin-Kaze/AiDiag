
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
  provideScore: tool({
  description: "Provide the user's wellness score based on their YouTube subscriptions and content. for each month cateogry",
  inputSchema: z.object({
    chartData: z.array(
      z.object({
        month: z.enum([
          "Health",
          "Chill",
          "Bait",
          "Learn",
          "Fun",
          "Feud",
        ]),
        average: z.number().min(0).max(100),
        yours: z.number().min(0).max(100),
      })
    ),
  }),
}),
} satisfies ToolSet;

export type ChatUITools = InferUITools<typeof chatTools>;