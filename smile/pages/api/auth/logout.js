import { serialize } from 'cookie';
import * as Sentry from '@sentry/nextjs';

export default async function handler(req, res) {
  try {
    // The logout on the REST API needs more implementations in order to work
    //
    // const resp = await fetch(`${process.env.API_URL}/api/user/logout`, {
    //   method: 'get',
    //   headers: {
    //     Authorization: req.headers['auth-token'],
    //   },
    // });
    // const data = await resp.json();
    // return res.status(resp.status).send(data);
    //
    // Temporary logout logic
    res.setHeader('Set-Cookie', serialize('auth-token', '', { maxAge: -1, path: '/' }));
    return res.send({
      success: true,
      data: 'Logout successful!',
    });
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send({
      success: false,
      data: error.message,
    });
  }
}
