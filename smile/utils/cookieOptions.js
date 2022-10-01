const cookieOptions = {
  expires: new Date(Date.now() + 604800000),
  httpOnly: true,
  sameSite: 'strict',
  path: '/',
  secure: process.env.NODE_ENV === 'production',
};

export default cookieOptions;
