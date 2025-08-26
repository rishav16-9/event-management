"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EventModal } from "../components/event-modal";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { EventCard } from "../components/event-card";
interface EventType {
  id: string;
  title: string;
  description: string;
}
interface Users {
  id: string;
  name: string;
  authId: string;
  role: string;
}
export const EventView = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

  const fetchData = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  const fetchUser = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async () => {
    if (editingEvent) {
      await fetch("/api/events", {
        method: "PUT",
        body: JSON.stringify({ id: editingEvent.id, title, description }),
      });
    } else {
      await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          createdBy: session?.user?.id || "",
        }),
      });
    }
    setOpen(false);
    fetchData();
  };

  const handleEditClick = (event: EventType) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/events?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleCreate = () => {
    setEditingEvent(null);
    setOpen(true);
    setTitle("");
    setDescription("");
  };

  const makeAdmin = async (userId: string) => {
    await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ id: userId, role: "admin" }),
    });
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
    fetchData();
  }, [session]);

  if (!session) return;
  return (
    <>
      <EventModal
        open={open}
        onOpenChange={setOpen}
        initialTitle={editingEvent ? "Edit Event" : "Create Event"}
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            value={title}
          />
          <Input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            value={description}
          />
        </div>
      </EventModal>
      <div className="flex flex-col mx-auto max-w-5xl gap-y-6 py-2 px-4 lg:px-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl font-semibold">Hey Admin</h1>
            <p className="text-sm text-muted-foreground">
              Create events for user
            </p>
          </div>
          <Button onClick={handleCreate}>Create event</Button>
        </div>
        <div className="flex justify-between flex-col md:flex-row gap-4 w-full">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full">
            {events.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 border border-black lg:max-w-[200px] w-full rounded-lg  p-4">
            <h3 className="text-lg font-semibold">Users</h3>
            <div className="flex flex-col gap-1">
              {users.map((user) => (
                <div key={user.id} className="flex items-center">
                  <p className="line-clamp-1">{user.name}</p>
                  {session?.user.role === "admin" && user.role !== "admin" && (
                    <Button
                      onClick={() => makeAdmin(user.id)}
                      className="cursor-pointer"
                      variant="ghost"
                      size="sm"
                    >
                      Make Admin
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
