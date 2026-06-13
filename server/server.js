import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './database.js';
import { sanitizeInput } from './middleware/security.js';

import authRouter from './routes/auth.js';
import portfolioRouter from './routes/portfolio.js';
import messagesRouter from './routes/messages.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
// Relaxed CSP settings so images from unsplash or local loads work without issues in the portfolio
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://images.pexels.com"],
        connectSrc: ["'self'", "ws:", "http://localhost:*", "https://wa.me"]
      }
    }
  })
);

app.use(cors({
  origin: true, // Allow all origins for dev flexibility, can be locked down later
  credentials: true
}));

app.use(express.json());
app.use(sanitizeInput); // Prevent input injection / sanitizes body, query, parameters

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/messages', messagesRouter);

// Serve Static Files from React Frontend build (dist directory)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback all non-API GET routes to index.html for SPA router
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });
});

// Database and Server Start
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`[+] Security Portfolio Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('[-] Server failed to start due to database error:', error);
    process.exit(1);
  }
}

startServer();
