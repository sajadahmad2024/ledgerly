import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq, isNull, and } from 'drizzle-orm';
import { categories } from './schema';
import * as schema from './schema';

const defaultCategories = [
  // Income Categories
  {
    name: 'Salary',
    type: 'INCOME' as const,
    icon: 'briefcase',
    color: '#2ECC71',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Freelance',
    type: 'INCOME' as const,
    icon: 'laptop',
    color: '#3498DB',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Investments',
    type: 'INCOME' as const,
    icon: 'trending-up',
    color: '#9B59B6',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Gifts & Allowance',
    type: 'INCOME' as const,
    icon: 'gift',
    color: '#E67E22',
    isDefault: true,
    userId: null,
  },

  // Expense Categories
  {
    name: 'Groceries & Food',
    type: 'EXPENSE' as const,
    icon: 'shopping-cart',
    color: '#E74C3C',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Housing & Rent',
    type: 'EXPENSE' as const,
    icon: 'home',
    color: '#1ABC9C',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Utilities & Bills',
    type: 'EXPENSE' as const,
    icon: 'zap',
    color: '#F1C40F',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Transportation & Fuel',
    type: 'EXPENSE' as const,
    icon: 'car',
    color: '#34495E',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Dining & Entertainment',
    type: 'EXPENSE' as const,
    icon: 'utensils',
    color: '#E67E22',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Healthcare & Medical',
    type: 'EXPENSE' as const,
    icon: 'activity',
    color: '#C0392B',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Education & Courses',
    type: 'EXPENSE' as const,
    icon: 'book',
    color: '#2980B9',
    isDefault: true,
    userId: null,
  },
  {
    name: 'Shopping & Apparel',
    type: 'EXPENSE' as const,
    icon: 'shopping-bag',
    color: '#D35400',
    isDefault: true,
    userId: null,
  },
];

async function seed() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ DATABASE_URL is required in .env');
    process.exit(1);
  }

  console.log('🌱 Connecting to database for seeding...');
  const pool = new Pool({ connectionString: dbUrl });
  const db = drizzle(pool, { schema });

  try {
    let insertedCount = 0;

    for (const category of defaultCategories) {
      const existing = await db.query.categories.findFirst({
        where: and(
          isNull(categories.userId),
          eq(categories.name, category.name),
        ),
      });

      if (!existing) {
        await db.insert(categories).values(category);
        insertedCount++;
        console.log(`  + Seeded category: ${category.name} (${category.type})`);
      }
    }

    console.log(
      `✅ Seeding completed successfully! (${insertedCount} new categories added)`,
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Seeding failed:', message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}
seed();
