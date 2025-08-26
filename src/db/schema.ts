import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

export const role_type = pgEnum("role_type", ["user", "admin"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  authId: text("auth_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: role_type("role").notNull().default("user"),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: uuid("created_by")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const bookmarks = pgTable(
  "bookmarks",
  {
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    eventId: uuid("event_id")
      .references(() => events.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (t) => [
    primaryKey({
      name: "bookmarks_pk",
      columns: [t.userId, t.eventId],
    }),
  ]
);

