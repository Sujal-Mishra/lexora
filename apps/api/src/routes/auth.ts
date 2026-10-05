import { Hono } from 'hono';

export const authRoutes = new Hono();

authRoutes.post('/login', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  return c.json({
    user: {
      id: 'counsel-01',
      name: 'Adv. V. Nariman',
      designation: 'Senior Counsel',
      barRollNumber: 'SC/1994/DEL',
      chamber: 'Chambers of Supreme Court of India',
    },
    token: 'jwt-session-token-lexora-chambers',
  });
});

authRoutes.post('/register', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  return c.json({
    user: {
      id: `counsel-${Date.now()}`,
      name: body.fullName || 'Learned Advocate',
      designation: 'Counsel',
      barRollNumber: body.barRoll || 'BAR/2026',
      chamber: body.chamberName || 'Supreme Chambers',
    },
    token: 'jwt-session-new-lexora',
  });
});
