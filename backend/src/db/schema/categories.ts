import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const categoryTypeEnum = pgEnum('category_type', ['INCOME', 'EXPENSE']);

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }), // Nullable: NULL means system default category!
  name: varchar('name', { length: 100 }).notNull(),
  type: categoryTypeEnum('type').notNull(),
  icon: varchar('icon', { length: 100 }),
  color: varchar('color', { length: 20 }),
  isDefault: boolean('is_default').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
