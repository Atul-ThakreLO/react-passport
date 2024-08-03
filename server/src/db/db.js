import pg from "pg";
import env from "dotenv";

env.config({path: "./.env"});
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});
db.connect();
export default db;
