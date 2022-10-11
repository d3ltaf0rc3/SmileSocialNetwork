import React from 'react';

const AuthContext = React.createContext({
  _id: undefined,
  username: undefined,
  name: undefined,
  profilePicture: undefined,
  public_id: undefined,
  description: undefined,
  isPrivate: undefined,
});

export default AuthContext;
