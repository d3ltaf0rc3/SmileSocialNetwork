const deleteSensitiveData = (user) => {
  const copy = { ...user.toObject() };

  delete copy.requests;
  delete copy.password;
  delete copy.followers;
  delete copy.following;
  delete copy.posts;
  delete copy.sessions;

  return copy;
};

module.exports = deleteSensitiveData;
