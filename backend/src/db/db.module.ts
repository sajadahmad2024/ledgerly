import { Module, Global, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DRIZZLE } from './db.constants';
import * as schema from './schema';

let poolInstance: Pool | null = null;

const drizzleProvider = {
  provide: DRIZZLE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const connectionString = configService.get<string>('DATABASE_URL');
    poolInstance = new Pool({
      connectionString,
    });

    return drizzle(poolInstance, { schema });
  },
};

@Global()
@Module({
  providers: [drizzleProvider],
  exports: [DRIZZLE],
})
export class DatabaseModule implements OnApplicationShutdown {
  async onApplicationShutdown() {
    if (poolInstance) {
      await poolInstance.end();
      console.log('🔌 PostgreSQL connection pool closed.');
    }
  }
}

export type Database = NodePgDatabase<typeof schema>;
