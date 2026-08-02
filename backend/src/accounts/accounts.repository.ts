import { Injectable, Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.constants';
import { type Database } from '../db/db.module';
import { accounts } from '../db/schema';

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

@Injectable()
export class AccountsRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async create(account: NewAccount): Promise<Account> {
    const [newAccount] = await this.db
      .insert(accounts)
      .values(account)
      .returning();
    return newAccount;
  }

  async findByUserId(userId: string): Promise<Account[]> {
    return await this.db.query.accounts.findMany({
      where: and(eq(accounts.userId, userId), eq(accounts.isArchived, false)),
    });
  }

  async findById(id: string, userId: string): Promise<Account | null> {
    const account = await this.db.query.accounts.findFirst({
      where: and(eq(accounts.id, id), eq(accounts.userId, userId)),
    });
    return account ?? null;
  }

  async update(
    id: string,
    userId: string,
    data: Partial<NewAccount>,
  ): Promise<Account | null> {
    const [updated] = await this.db
      .update(accounts)
      .set(data)
      .where(and(eq(accounts.id, id), eq(accounts.userId, userId)))
      .returning();
    return updated ?? null;
  }
}
