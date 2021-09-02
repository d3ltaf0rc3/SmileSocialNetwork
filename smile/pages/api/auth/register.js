import { serialize } from 'cookie';
import options from '../../../utils/cookieOptions';

export default async function handler(req, res) {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/user/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await resp.json();
    if (resp.status === 201) {
      res.setHeader('Set-Cookie', serialize('auth-token', data.data.token, options));
    }
    return res.status(resp.status).send(data);
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error.message,
    });
  }
}