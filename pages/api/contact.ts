import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  error?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body ?? {};

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof email !== 'string' ||
    !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
    typeof message !== 'string' ||
    message.trim().length < 10
  ) {
    return res.status(400).json({ ok: false, error: 'Invalid payload' });
  }

  // No outbound email logic is used here; wire provider secrets via environment variables if extended.
  return res.status(200).json({ ok: true });
}
