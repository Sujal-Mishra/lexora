import { Hono } from 'hono';
import { MOCK_DOCUMENTS } from '../data/mockData.js';

export const searchRoutes = new Hono();

searchRoutes.get('/', (c) => {
  const q = (c.req.query('q') || '').trim().toLowerCase();
  if (!q) {
    return c.json(MOCK_DOCUMENTS);
  }
  const results = MOCK_DOCUMENTS.filter(
    (doc) =>
      doc.filename.toLowerCase().includes(q) ||
      doc.courtName.toLowerCase().includes(q) ||
      doc.type.toLowerCase().includes(q) ||
      (doc.snippet && doc.snippet.toLowerCase().includes(q))
  );
  return c.json(results);
});
