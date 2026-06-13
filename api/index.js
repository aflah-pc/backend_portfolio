import app from '../server/server.js';
import { initializeDatabase } from '../server/database.js';

let dbInitialized = false;

export default async (req, res) => {
  if (!dbInitialized) {
    try {
      await initializeDatabase();
      dbInitialized = true;
    } catch (error) {
      console.error('[-] Database initialization failed in serverless context:', error);
    }
  }
  return app(req, res);
};
