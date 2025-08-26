"use client";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, BookmarkCheckIcon } from "lucide-react";

interface EventType {
  id: string;
  title: string;
  description: string;
}

interface EventCardProps {
  event: EventType;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const EventCardUser = ({
  event,
  bookmarked,
  onToggleBookmark,
}: EventCardProps) => {
  return (
    <div className="border p-2 rounded w-full bg-card">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg line-clamp-1">{event.title}</p>
        <div className="flex gap-x-1 items-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onToggleBookmark(event.id)}
          >
            {bookmarked ? (
              <BookmarkCheckIcon className="size-3 cursor-pointer" />
            ) : (
              <BookmarkIcon className="size-3 cursor-pointer" />
            )}
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{event.description}</p>
    </div>
  );
};
