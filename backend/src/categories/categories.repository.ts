import { Injectable, Inject } from '@nestjs/common';
import { eq, and, or, isNull } from 'drizzle-orm';
import { DRIZZLE } from '../db/db.constants';
import { type Database } from '../db/db.module';
import { categories } from '../db/schema';

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

@Injectable()
export class CategoriesRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async create(category: NewCategory): Promise<Category> {
    const [newCategory] = await this.db
      .insert(categories)
      .values(category)
      .returning();
    return newCategory;
  }

  async findByUserId(userId: string): Promise<Category[]> {
    return await this.db.query.categories.findMany({
      where: or(isNull(categories.userId), eq(categories.userId, userId)),
    });
  }

  async findById(id: string, userId: string): Promise<Category | null> {
    const category = await this.db.query.categories.findFirst({
      where: and(
        eq(categories.id, id),
        or(isNull(categories.userId), eq(categories.userId, userId)),
      ),
    });
    return category ?? null;
  }

  async update(
    id: string,
    userId: string,
    data: Partial<NewCategory>,
  ): Promise<Category | null> {
    const [updated] = await this.db
      .update(categories)
      .set(data)
      .where(and(eq(categories.id, id), eq(categories.userId, userId)))
      .returning();
    return updated ?? null;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const deleted = await this.db
      .delete(categories)
      .where(and(eq(categories.id, id), eq(categories.userId, userId)))
      .returning();
    return deleted.length > 0;
  }
}
