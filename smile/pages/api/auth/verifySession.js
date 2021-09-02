export default async function handler(req, res) {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/user/verify/session`, {
      method: 'get',
      headers: {
        Authorization: req.cookies['auth-token'] || null,
      },
    });
    const data = await resp.json();
    return res.status(resp.status).send(data);
  } catch (error) {
    return res.status(500).send({
      success: false,
      data: error.message,
    });
  }
}
