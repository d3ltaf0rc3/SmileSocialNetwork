import React from 'react';

const PostContext = React.createContext({
  _id: null,
  location: null,
  description: null,
  likes: null,
  comments: null,
  resource: null,
  public_id: null,
  resource_type: null,
  postedBy: null,
  createdAt: null,
  updatePost: () => {},
});

export default PostContext;
