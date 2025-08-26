import { Button } from "@/components/ui/button";

export const EventView = () => {
  return (
    <div className="flex flex-col mx-auto max-w-5xl gap-y-6 py-2 px-4 lg:px-0">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-2xl font-semibold">Hey Admin</h1>
          <p className="text-sm text-muted-foreground">
            Create events for user
          </p>
        </div>
        <Button onClick={() => {}}>Create event</Button>
      </div>
    </div>
  );
};
