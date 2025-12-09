"use server";

import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function deleteUserData() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await db.delete(documents).where(eq(documents.userId, userId));

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user data:", error);
    return { success: false, error: "Failed to delete user data" };
  }
}
