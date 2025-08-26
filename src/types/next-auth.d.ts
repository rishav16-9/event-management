
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: "admin" | "user";
    };
  }

  interface User {
    id: string;
    role: "admin" | "user";
  }
}
