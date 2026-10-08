import { Pool } from '@neondatabase/serverless';

const databaseUrl =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_LmcbnjUF1kZ5@ep-lingering-credit-b7lzuuvs-pooler.c-13.us-east-1.aws.neon.tech/neondb?sslmode=require';

// Neon Serverless Pool instance
const pool = new Pool({
  connectionString: databaseUrl,
});

/**
 * Execute parameterized SQL query against Neon PostgreSQL
 */
export async function sql(
  text: string,
  params: (string | number | boolean | null | undefined | unknown)[] = []
): Promise<Record<string, unknown>[]> {
  try {
    const result = await pool.query(text, params);
    return (result.rows as Record<string, unknown>[]) || [];
  } catch (error) {
    console.error('Neon DB Query Error:', error, 'Query:', text, 'Params:', params);
    throw error;
  }
}

export function parseJsonField<T>(field: unknown, fallback: T): T {
  if (!field) return fallback;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field) as T;
    } catch {
      return fallback;
    }
  }
  return field as T;
}
