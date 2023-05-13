// eslint-disable-next-line import/no-unresolved
import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const cardsTable = pgTable("cards", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 32 }).notNull(),
  ownerID: integer("owner_id").notNull(),
  type: varchar("type", { length: 15 }).notNull(),
});

export type Card = InferModel<typeof cardsTable>;
