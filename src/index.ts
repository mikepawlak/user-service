import { MongoClient } from 'mongodb';
import { createApp } from './app.js';

const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

async function start() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();

  const app = createApp(db);
  app.listen(PORT, () => {
    console.info(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
