import { db } from "@/db";
import { NextResponse } from "next/server";
import {users} from "@/db/schema";

// GET /api/events
export async function GET() {
  const allUsers = await db.select().from(users);
  return NextResponse.json(allUsers);
}
