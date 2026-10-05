import { Hono } from 'hono';
import { MOCK_DOCUMENTS } from '../data/mockData.js';
import { LegalDocument } from '../types.js';

let documentsStore: LegalDocument[] = [...MOCK_DOCUMENTS];

export const documentRoutes = new Hono();

documentRoutes.get('/', (c) => {
  return c.json(documentsStore);
});

documentRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const doc = documentsStore.find((d) => d.id === id || d.filename === id);
  if (!doc) {
    return c.json({ error: 'Document docket not found' }, 404);
  }
  return c.json(doc);
});

documentRoutes.post('/upload', async (c) => {
  const body = await c.req.parseBody().catch(() => ({}));
  const uploadedFile = body['document'] as File | undefined;
  const filename = uploadedFile?.name || 'Ingested_Pleading_Folio.pdf';

  const newDoc: LegalDocument = {
    id: `doc-${Date.now()}`,
    filename,
    title: filename,
    courtName: 'Supreme Court of India',
    benchDesignation: 'Registry Docket Ingestion',
    type: filename.toLowerCase().includes('slp')
      ? 'Special Leave Petition'
      : filename.toLowerCase().includes('award')
      ? 'Commercial Award'
      : 'Judgment',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    pages: Math.floor(Math.random() * 80) + 20,
    status: 'Processed',
    fileSize: uploadedFile ? `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB` : '4.2 MB',
    verified: true,
    concordance: '98.5%',
    snippet: 'Newly ingested docket through Hono API sandbox. Ready for intelligence synthesis.',
  };

  documentsStore.unshift(newDoc);
  return c.json(newDoc, 201);
});
