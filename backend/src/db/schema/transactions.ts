import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  text,
  numeric,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { accounts } from './accounts';
import { categories } from './categories';

export const transactionTypeEnum = pgEnum('transaction_type', [
  'INCOME',
  'EXPENSE',
]);

export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountId: uuid('account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  type: transactionTypeEnum('type').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  description: varchar('description', { length: 255 }),
  notes: text('notes'),
  transactionDate: timestamp('transaction_date', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
