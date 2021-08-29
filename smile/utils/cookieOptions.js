const prodOptions = {
  expires: new Date(Date.now() + 604800000),
  sameSite: 'None',
  secure: true,
  path: '/',
};

const devOptions = {
  expires: new Date(Date.now() + 604800000),
  httpOnly: true,
  path: '/',
};

export default process.env.NODE_ENV === 'production' ? prodOptions : devOptions;
