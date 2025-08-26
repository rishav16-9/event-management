import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user || !user.email) return false;

      const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email));

      if (!existing) {
        await db
          .insert(users)
          .values({
            authId: user.id!,
            name: user.name || "",
            email: user.email || "",
            role: "user",
          })
          .returning();
      }
      return true;
    },

    async session({ session }) {
      if (!session.user.email) throw new Error("User not exists. Please login");

      const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email));

      if (!existing) throw new Error("User not exists.");
      return {
        ...session,
        user: {
          ...session.user,
          role: existing.role,
        },
      };
    },
    async redirect() {
      // Always redirect to "/"
      return "/";
    },
  },
});
