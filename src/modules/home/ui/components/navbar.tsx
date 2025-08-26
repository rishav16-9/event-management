import { AuthButton } from "@/modules/auth/ui/components/auth-button";

export const Navbar = () => {
  return (
    <nav className=" h-16 flex items-center border-b bg-white p-4">
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event management</h1>
        <AuthButton />
      </div>
    </nav>
  );
};
