function deleteSensitiveData(user) {
    const copy = { ...user.toObject() };
    delete copy.password;
    return copy;
}

module.exports = deleteSensitiveData;