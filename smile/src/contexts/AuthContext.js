import React from 'react';

const AuthContext = React.createContext({
    loggedIn: null,
    user: null,
    logIn: () => {},
    logOut: () => {},
    updateContext: () => {} 
});

export default AuthContext;