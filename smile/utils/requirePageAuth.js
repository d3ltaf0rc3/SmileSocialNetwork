export default async function requirePageAuth({ req }) {
  const user = await fetch(`${process.env.API_URL}/api/session/verify`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${req.cookies['auth-token']}`,
    },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.success) {
        return resp.data;
      }
      return null;
    })
    .catch(() => null);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
}
