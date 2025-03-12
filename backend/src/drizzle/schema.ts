import {
  boolean,
  decimal,
  integer,
  numeric,
  pgTable,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar({ length: 64 }).notNull().unique(),
  password: varchar({ length: 64 }).notNull(),
  name: varchar({ length: 64 }).notNull(),
  age: integer(),
  gender: varchar({ enum: ['male', 'female'] }),
  weight: decimal({ precision: 3, scale: 2 }),
  height: numeric({ precision: 3 }),
  weight: decimal({ precision: 5, scale: 2 }),
  height: decimal({ precision: 5, scale: 2 }),
  verificationToken: varchar({ length: 64 }),
  verified: boolean().default(false).notNull(),
  token: varchar(),
  restorationToken: varchar({ length: 64 }),
});
