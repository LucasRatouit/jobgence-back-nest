import { Client, QueryResult } from 'pg';

function transformToString(arg: string | string[]): string {
  return Array.isArray(arg) ? arg.join(', ') : arg;
}

/**
 * insert - Insert a new row in a table
 *
 * @param db - Database connection
 * @param tableName - Table name
 * @param objValues - Object with values to insert
 * @param returning - Columns to return by default all columns => *
 */
export async function insert<T>(
  db: Client,
  tableName: string,
  objValues: Record<string, any>,
  returning: string | string[] = '*',
): Promise<QueryResult<T>> {
  const keys = Object.keys(objValues);
  const values = Object.values(objValues);
  const valuesAsDollar = values.map((value, id) => `$${id + 1}`).join(', ');

  return await db.query<T>(
    `INSERT INTO ${tableName} (${keys.join(
      ', ',
    )}) VALUES (${valuesAsDollar}) RETURNING ${transformToString(returning)}`,
    [...values],
  );
}

/**
 * update - Update a row in a table
 * @param db - Database connection
 * @param tableName - Table name
 * @param objValues - Object with values to update
 * @param where - Where clause
 * @param returning - Columns to return by default all columns => *
 */
export function select<T>(
  db: Client,
  columns: string | string[] = '*',
  tableName: string,
  where: Record<string, any>,
): Promise<QueryResult<T>> {
  const whereOptions = Object.entries(where)
    .map(
      ([key, value], id) =>
        `${key} ${value === null ? 'IS NULL' : `= $${id + 1}`}`,
    )
    .join(' AND ');
  const whereValues = Object.values(where);

  return db.query<T>(
    `SELECT ${transformToString(columns)} FROM ${tableName}${
      whereOptions.length > 0 ? ` WHERE ${whereOptions}` : ''
    }`,
    [...whereValues.filter((value) => value !== null)],
  );
}

/**
 * update - Update a row in a table
 * @param db - Database connection
 * @param tableName - Table name
 * @param objValues - Object with values to update
 * @param where - Where clause
 * @param returning - Columns to return by default all columns => *
 */
export async function update<T>(
  db: Client,
  tableName: string,
  objValues: Record<string, any>,
  where: Record<string, any>,
  returning: string | string[] = '*',
): Promise<QueryResult<T>> {
  const values = Object.values(objValues);
  const whereValues = Object.values(where);

  const columns = Object.keys(objValues).map((key, id) => ` ${key}=$${id + 1}`);
  const whereOptions = Object.entries(where)
    .map(
      ([key, value], id) =>
        `${key} ${
          value === null ? 'IS NULL' : `= $${id + columns.length + 1}`
        }`,
    )
    .join(' AND ');

  return await db.query<T>(
    `UPDATE ${tableName} SET ${columns}, updated_at=CURRENT_TIMESTAMP WHERE ${whereOptions} RETURNING ${transformToString(
      returning,
    )}`,
    [...values, ...whereValues.filter((value) => value !== null)],
  );
}
