import { Hono } from 'hono';
import { MOCK_SUMMARIES } from '../data/mockData.js';

export const summaryRoutes = new Hono();

summaryRoutes.get('/', (c) => {
  return c.json(Object.values(MOCK_SUMMARIES));
});

summaryRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const summary = (MOCK_SUMMARIES as Record<string, any>)[id] || MOCK_SUMMARIES['doc-2'];
  return c.json(summary);
});
