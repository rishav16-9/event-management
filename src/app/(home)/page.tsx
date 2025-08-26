import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EventView } from "@/modules/event/ui/views/event-view-admin";
import { EventViewUser } from "@/modules/event/ui/views/event-view-user";
const Home = async () => {
  const session = await auth();
  const role = session?.user?.role;
  if (!session) redirect("/sign-in");
  if (role === "admin") return <EventView />;
  return <EventViewUser />;
};

export default Home;
