import React from 'react';

const ProfileContext = React.createContext({
  _id: undefined,
  username: undefined,
  name: undefined,
  profilePicture: undefined,
  public_id: undefined,
  description: undefined,
  isPrivate: undefined,
  hasRequested: undefined,
  doesFollow: undefined,
  followers: undefined,
  following: undefined,
  posts: undefined,
  updateProfile: () => {},
});

export default ProfileContext;
