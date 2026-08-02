import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const accountTypeEnum = pgEnum('account_type', [
  'CASH',
  'BANK',
  'CREDIT_CARD',
  'WALLET',
]);

export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  type: accountTypeEnum('type').notNull(),
  currency: varchar('currency', { length: 3 }).default('INR').notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
