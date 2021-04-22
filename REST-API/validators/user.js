function isUsernameValid(username) {
    if (username.length < 2 || username.length > 18) {
        throw new Error("Username must be between 2 and 18 characters long!");
    } else if (!/^[\w.]+$/.test(username)) {
        throw new Error("Username can only contain english letters, numbers, underscores and dots!");
    }
    return true;
}

function arePasswordsValid(password, rePassword) {
    if (password.length < 8 || password.length > 18) {
        throw new Error("Password must be between 8 and 18 characters long!");
    } else if (!/^[\w!@#$%&?]+$/.test(password)) {
        throw new Error("Password can only contain english letters, numbers, underscores, !, @, #, $, %, &, ? and *!");
    } else if (password !== rePassword) {
        throw new Error("Both passwords must match!");
    }
    return true;
}

module.exports = {
    isUsernameValid,
    arePasswordsValid
};