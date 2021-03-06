import React from 'react';

const ProfileContext = React.createContext({
    name: null,
    profilePicture: null,
    description: null,
    isPrivate: null,
    followers: null,
    following: null,
    posts: null,
    username: null,
    doesUserFollow: null,
    requests: null,
    triggerUpdate: () => {}
});

export default ProfileContext;