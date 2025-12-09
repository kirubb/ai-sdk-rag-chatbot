import { cosineDistance, desc, gt, sql, eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { db } from "./db-config";
import { documents } from "./db-schema";
import { generateEmbedding } from "./embeddings";

/**
 * Search for similar documents using Drizzle ORM with cosineDistance
 */
export async function searchDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.5
) {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  // Generate embedding for the search query

  const embedding = await generateEmbedding(query);

  // Calculate similarity using Drizzle's cosineDistance(not similarity) function
  // This creates a SQL expression for similarity calculation by subtracting from 1
  const similarity = sql<number>`1 - (${cosineDistance(
    documents.embedding,
    embedding
  )})`;

  // Use Drizzle's query builder for the search
  const similarDocuments = await db
    .select({
      id: documents.id,
      content: documents.content,
      similarity,
    })
    .from(documents)
    .where(and(gt(similarity, threshold), eq(documents.userId, userId)))
    .orderBy(desc(similarity))
    .limit(limit);

  return similarDocuments;
}
