"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { EventCardUser } from "../components/event-card-user";

interface EventType {
  id: string;
  title: string;
  description: string;
}

export const EventViewUser = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventType[]>([]);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  const fetchBookmarks = async () => {
    const res = await fetch("/api/bookmarks");
    const data = await res.json();
    setBookmarkedEvents(data);
  };

  const handleBookmark = useCallback(
    async (eventId: string) => {
      if (!session?.user?.id) return;
      const isBookmarked = bookmarkedEvents.includes(eventId);
      await fetch(
        isBookmarked ? `/api/bookmarks?eventId=${eventId}` : "/api/bookmarks",
        {
          method: isBookmarked ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: !isBookmarked ? JSON.stringify({ eventId }) : undefined,
        }
      );
      fetchBookmarks();
    },
    [bookmarkedEvents, session]
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col mx-auto max-w-5xl gap-y-6 py-2 px-4 lg:px-0">
      <div className="flex flex-col gap-y-1">
        <h1 className="text-2xl font-semibold">Hey {session?.user?.name}</h1>
        <p className="text-sm text-muted-foreground">
          View events happening near you
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCardUser
            key={event.id}
            event={event}
            bookmarked={bookmarkedEvents.includes(event.id)}
            onToggleBookmark={() => handleBookmark(event.id)}
          />
        ))}
      </div>
    </div>
  );
};
