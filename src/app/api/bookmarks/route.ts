import { auth } from "@/lib/auth";
import { db } from "@/db";
import { bookmarks } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET all bookmarks for the logged-in user
export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user?.id;
  const rows = await db
    .select({ eventId: bookmarks.eventId })
    .from(bookmarks)
    .where(eq(bookmarks.userId, user!));

  return NextResponse.json(rows.map((r) => r.eventId));
}

// POST to add a bookmark
export async function POST(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user?.id;
  const { eventId } = await req.json();

  const existing = await db
    .select()
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, userId!), eq(bookmarks.eventId, eventId)));

  if (existing.length > 0) {
    return NextResponse.json({ bookmarked: true });
  }

  await db.insert(bookmarks).values({
    userId: userId!,
    eventId,
  });

  return NextResponse.json({ bookmarked: true });
}

// DELETE to remove a bookmark
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user?.id;

  const url = new URL(req.url);
  const eventId = url.searchParams.get("eventId");
  if (!eventId)
    return NextResponse.json({ error: "Missing eventId" }, { status: 400 });

  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.userId, user!), eq(bookmarks.eventId, eventId)));

  return NextResponse.json({ bookmarked: false });
}
