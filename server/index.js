// ==================================
// Express server: serves API at /api and static React build from ../client/dist.
// Handles text/URL/file inputs and streams generated Markov text.
// ==================================

import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import generateRouter from './src/routes/generate.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

// Parse JSON bodies
app.use(express.json({ limit: process.env.MAX_UPLOAD_SIZE || '2mb' }));

// ✅ Parse URL-encoded form bodies (needed for FormData fields like "text" and "urls")
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', generateRouter);

// Serve static frontend
const clientDist = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
