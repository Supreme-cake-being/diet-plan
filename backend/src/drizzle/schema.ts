import {
  boolean,
  decimal,
  integer,
  numeric,
  pgTable,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar({ length: 64 }).notNull().unique(),
  password: varchar({ length: 64 }),
  name: varchar({ length: 64 }).notNull(),
  age: integer().notNull(),
  gender: varchar({ enum: ['male', 'female'] }),
  weight: decimal({ precision: 3, scale: 2 }),
  height: numeric({ precision: 3 }),
  verificationToken: varchar({ length: 64 }),
  verified: boolean().default(false).notNull(),
});
