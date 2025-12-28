import { neon } from "@neondatabase/serverless";

// Create a SQL query function using the connection string
export const sql = neon(process.env.DATABASE_URL!);

// Helper to convert snake_case DB results to camelCase
export function toCamelCase<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    result[camelKey] = obj[key];
  }
  return result as T;
}

// Helper to convert camelCase to snake_case for DB inserts
export function toSnakeCase(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    result[snakeKey] = obj[key];
  }
  return result;
}
