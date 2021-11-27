import * as Sentry from '@sentry/nextjs';

export default async function handler(req, res) {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/post/user/${req.query.username}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${req.cookies['auth-token']}`,
      },
    });
    const data = await resp.json();
    return res.status(resp.status).send(data);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send({
      success: false,
      data: error.message,
    });
  }
}
