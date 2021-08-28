import React from 'react';

const AuthContext = React.createContext({
  user: undefined,
  logIn: () => {},
  logOut: () => {},
});

export default AuthContext;
