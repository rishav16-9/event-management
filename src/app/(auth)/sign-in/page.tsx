"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="flex flex-col gap-y-36 border p-4 border-black rounded-xl">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">
          Hi, Welcome to Event management 👋
        </h3>
        <p className="text-sm text-muted-foreground">Sign in to continue</p>
      </div>

      <Button
        variant="secondary"
        size="lg"
        className="cursor-pointer"
        onClick={() => signIn("google")}
      >
        Signin to google
      </Button>
    </div>
  );
};

export default SignIn;
