import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: null,
    user: null,
    logIn: () => {},
    logOut: () => {}
});

export default AuthContext;