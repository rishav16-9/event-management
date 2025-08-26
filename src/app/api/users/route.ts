import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { NextResponse, NextRequest } from "next/server";

// GET /api/events
export async function GET() {
  const allUsers = await db.select().from(users);
  return NextResponse.json(allUsers);
}

export async function PUT(req: NextRequest) {
  const { id, role } = await req.json();

  const [updated] = await db
    .update(users)
    .set({ role })
    .where(eq(users.id, id))
    .returning();

  return NextResponse.json(updated);
}
