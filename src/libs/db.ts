import dotenv from "dotenv";
// eslint-disable-next-line import/no-unresolved
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_ENDPOINT_ID } = process.env;

const URL = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?options=project%3D${DB_ENDPOINT_ID}`;

const pool = new Pool({
  connectionString: URL,
  ssl: true,
});

const connector = drizzle(pool);

export default {
  database: connector,
};
