const deleteUserSensitiveData = (user) => {
  const copy = { ...user.toObject() };

  delete copy.requests;
  delete copy.password;
  delete copy.posts;

  return copy;
};

const deletePostSensitiveData = (post) => {
  const copy = { ...post.toObject() };

  delete copy.public_id;

  return copy;
};

module.exports = {
  deletePostSensitiveData,
  deleteUserSensitiveData,
};
