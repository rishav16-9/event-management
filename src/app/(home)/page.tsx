import { auth } from "@/lib/auth";
import { EventView } from "@/modules/event/ui/views/event-view";
import { redirect } from "next/navigation";
const Home = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return <EventView />;
};

export default Home;
