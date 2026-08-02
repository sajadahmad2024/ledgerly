import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.constants';
import { type Database } from '../db/db.module';
import { users } from '../db/schema';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

@Injectable()
export class UsersRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async create(user: NewUser): Promise<User> {
    const [newUser] = await this.db.insert(users).values(user).returning();
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user ?? null;
  }
}
