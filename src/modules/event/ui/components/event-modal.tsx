import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: () => void; // optional submit handler

  initialTitle?: string;
  children: React.ReactNode;
}

export const EventModal = ({
  open,
  onOpenChange,
  initialTitle,
  children,
  onSubmit,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialTitle ? "Edit Event" : "Create Event"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">{children}</div>
        {onSubmit && (
          <DialogFooter>
            <Button onClick={onSubmit}>Submit</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
