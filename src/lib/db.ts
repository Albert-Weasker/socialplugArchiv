import { Pool, type QueryResultRow } from "pg";

const requiredKeys = ["DATABASE_URL", "POSTGRES_URL"] as const;

let pool: Pool | null = null;

export function getDatabaseStatus() {
  const configured = requiredKeys.some((key) => Boolean(process.env[key]));

  return {
    configured,
    driver: configured ? "PostgreSQL / Neon" : "not-configured",
  };
}

export function getPool() {
  const connectionString =
    process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? null;

  if (!connectionString) {
    return null;
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }

  return pool;
}

export async function query<T extends QueryResultRow>(
  sql: string,
  params: unknown[] = [],
) {
  const db = getPool();

  if (!db) {
    throw new Error("Database is not configured");
  }

  return db.query<T>(sql, params);
}
