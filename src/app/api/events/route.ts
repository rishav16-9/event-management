import { db } from "@/db";
import { eq } from "drizzle-orm";
import { events } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

// GET /api/events
export async function GET() {
  const allEvents = await db.select().from(events);
  return NextResponse.json(allEvents);
}

// POST /api/events (create)
export async function POST(req: NextRequest) {
  const { title, description, createdBy } = await req.json();
  const [newEvent] = await db
    .insert(events)
    .values({
      title,
      description,
      createdBy,
    })
    .returning();
  return NextResponse.json(newEvent);
}

// PUT /api/events/:id (update)
export async function PUT(req: NextRequest) {
  const { id, title, description } = await req.json();
  const [updated] = await db
    .update(events)
    .set({ title, description })
    .where(eq(events.id, id))
    .returning();
  return NextResponse.json(updated);
}

// DELETE /api/events/:id
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.error();

  await db.delete(events).where(eq(events.id, id)).returning();

  return NextResponse.json({ success: true });
}
