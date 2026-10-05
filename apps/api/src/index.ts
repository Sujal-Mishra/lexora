import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { authRoutes } from './routes/auth.js';
import { documentRoutes } from './routes/documents.js';
import { summaryRoutes } from './routes/summaries.js';
import { searchRoutes } from './routes/search.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Health check
app.get('/health', (c) => c.json({ status: 'ok', service: 'Lexora Hono API', version: '1.0.0' }));

// Route groups
app.route('/api/auth', authRoutes);
app.route('/api/documents', documentRoutes);
app.route('/api/summaries', summaryRoutes);
app.route('/api/search', searchRoutes);

// Fallback for direct endpoints
app.route('/auth', authRoutes);
app.route('/documents', documentRoutes);
app.route('/summaries', summaryRoutes);
app.route('/search', searchRoutes);

const port = Number(process.env.PORT) || 8787;
console.log(`⚖️ Lexora Hono API running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
