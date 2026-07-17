import { client } from "@/lib/db";

const db = client.db("test");
const userTokens = db.collection("userTokens");

export async function ensureUser(userId: string) {
  await userTokens.updateOne(
    { userId },
    {
      $setOnInsert: {
        userId,
        tokens: 100000,
        createdAt: new Date(),
      },
    },
    {
      upsert: true,
    }
  );
}

export async function spendTokens(
  userId: string,
  amount: number
): Promise<boolean> {
  const result = await userTokens.updateOne(
    {
      userId,
      tokens: { $gte: amount }, 
    },
    {
      $inc: {
        tokens: -amount,
      },
    }
  );

  return result.modifiedCount === 1;
}

export async function getUserTokens(userId: string) {
  const user = await userTokens.findOne(
    { userId },
    {
      projection: {
        tokens: 1,
      },
    }
  );

  return user?.tokens ?? 0;
}