import { Injectable, Inject } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.constants';
import { type Database } from '../db/db.module';
import { transactions } from '../db/schema';

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

@Injectable()
export class TransactionsRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async create(transaction: NewTransaction): Promise<Transaction> {
    const [newTransaction] = await this.db
      .insert(transactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return await this.db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
    });
  }

  async findById(id: string, userId: string): Promise<Transaction | null> {
    const transaction = await this.db.query.transactions.findFirst({
      where: and(eq(transactions.id, id), eq(transactions.userId, userId)),
    });
    return transaction ?? null;
  }

  async update(
    id: string,
    userId: string,
    data: Partial<NewTransaction>,
  ): Promise<Transaction | null> {
    const [updated] = await this.db
      .update(transactions)
      .set(data)
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
      .returning();
    return updated ?? null;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const deleted = await this.db
      .delete(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
      .returning();
    return deleted.length > 0;
  }

  // Virtual Balance Aggregation Query: Income minus Expenses for an Account
  async calculateAccountBalance(
    accountId: string,
    userId: string,
  ): Promise<number> {
    const result = await this.db
      .select({
        income: sql<string>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'INCOME' THEN ${transactions.amount} ELSE 0 END), 0)`,
        expense: sql<string>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'EXPENSE' THEN ${transactions.amount} ELSE 0 END), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.accountId, accountId),
          eq(transactions.userId, userId),
        ),
      );

    const income = parseFloat(result[0]?.income || '0');
    const expense = parseFloat(result[0]?.expense || '0');
    return income - expense;
  }
}
