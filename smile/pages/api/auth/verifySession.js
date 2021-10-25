import * as Sentry from '@sentry/nextjs';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/session/verify`, {
      method: 'get',
      headers: {
        Authorization: req.cookies['auth-token'] || null,
      },
    });
    const data = await resp.json();
    if (resp.status !== 200) {
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
