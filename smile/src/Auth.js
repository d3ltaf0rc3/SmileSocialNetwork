import React, { useState } from 'react';
import AuthContext from './Context';

const Auth = (props) => {
    const [loggedIn, setLogged] = useState(null);
    const [user, setUser] = useState(null);

    const logIn = (user) => {
        setLogged(true);
        setUser(user);
    };

    const logOut = () => {
        setLogged(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            loggedIn,
            user,
            logIn,
            logOut
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default Auth;