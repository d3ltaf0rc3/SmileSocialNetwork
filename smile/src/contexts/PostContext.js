import React from 'react';

const PostContext = React.createContext({
    _id: null,
    location: null,
    description: null,
    likes: null,
    comments: null,
    imageUrl: null,
    postedBy: null,
    createdAt: null
});

export default PostContext;