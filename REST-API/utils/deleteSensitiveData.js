function deleteUserSensitiveData(user) {
    const copy = { ...user.toObject() };
    delete copy.password;
    return copy;
}

function deletePostSensitiveData(post) {
    const copy = { ...post.toObject() };
    delete copy.public_id;
    return copy;
}


module.exports = {
    deletePostSensitiveData,
    deleteUserSensitiveData
};