import pg from "pg";
const { Pool } = pg;

let currentPool = new Pool();

async function createPool() {
  const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "crawler",
  });

  pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(1);
  });

  console.log((await pool.query("SELECT NOW()")).rows[0].now, "Connected to the database");

  currentPool = pool;
}

async function genericQuery(query, params = []) {
  try {
    const result = await currentPool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

export default { createPool, currentPool, genericQuery };
