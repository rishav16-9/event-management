"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";

interface EventType {
  id: string;
  title: string;
  description: string;
}

interface EventCardProps {
  event: EventType;
  onEdit: (event: EventType) => void;
  onDelete: (id: string) => void;
}

export const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  return (
    <div className="border p-2 rounded w-full bg-card">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg line-clamp-1">{event.title}</p>
        <div className="flex gap-x-1 items-center">
          <Button
            size="icon"
            variant="ghost"
            className="border-none bg-transparent"
            onClick={() => onEdit(event)}
          >
            <PencilIcon className="size-3" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="border-none bg-transparent"
            onClick={() => onDelete(event.id)}
          >
            <Trash2Icon className="size-3" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{event.description}</p>
    </div>
  );
};
