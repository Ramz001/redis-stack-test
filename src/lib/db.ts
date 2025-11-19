import { createClient } from "redis";

const db = createClient({
  password: process.env.DB_PASSWORD!,
  socket: {
    host: process.env.DB_HOST!,
    port: +process.env.DB_PORT!,
  },
});

db.on("error", (err) => console.error(err));

if (!db.isOpen) {
  db.connect();
}

export default db;
