import React from 'react';

const ProfileContext = React.createContext({
  _id: null,
  name: null,
  profilePicture: null,
  public_id: null,
  description: null,
  isPrivate: null,
  username: null,
  hasRequested: null,
  doesFollow: null,
});

export default ProfileContext;
