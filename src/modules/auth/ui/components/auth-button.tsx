"use client";

import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AuthButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (!session) {
    return (
      <Button
        onClick={() => router.push("/sign-in")}
        variant="secondary"
        className="cursor-pointer"
      >
        {status === "loading" ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          "Sign in Google"
        )}
      </Button>
    );
  }
  return (
    <Button
      onClick={() => signOut()}
      variant="secondary"
      className="cursor-pointer"
    >
      Signout
    </Button>
  );
};
