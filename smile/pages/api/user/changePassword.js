import { serialize } from 'cookie';
import * as Sentry from '@sentry/nextjs';

export default async function handler(req, res) {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/user/change-password`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${req.cookies['auth-token']}`,
      },
      body: JSON.stringify(req.body),
    });
    const data = await resp.json();
    if (resp.status === 200 && data.success) {
      res.setHeader('Set-Cookie', serialize('auth-token', '', { maxAge: -1, path: '/' }));
    }
    return res.status(resp.status).send(data);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send({
      success: false,
      data: error.message,
    });
  }
}
