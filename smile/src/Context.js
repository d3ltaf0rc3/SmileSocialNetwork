import React from 'react';

const AuthContext = React.createContext({
    loggedIn: null,
    user: null,
    logIn: () => {},
    logOut: () => {}
});

export default AuthContext;