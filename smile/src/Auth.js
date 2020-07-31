import React, { useState, useEffect } from 'react';
import AuthContext from './contexts/AuthContext';

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

    const updateContext = (user) => {
        setUser(user);
    };

    useEffect(() => {
        fetch("http://localhost:7777/api/verify", {
            method: "post",
            credentials: "include"
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    logOut();
                } else if (res) {
                    logIn(res);
                }
            })
            .catch(err => console.error(err));
    }, []);

    if (loggedIn === null) {
        return (
            <div>{/* To do spinner*/}</div>
        )
    }

    return (
        <AuthContext.Provider value={{
            loggedIn,
            user,
            logIn,
            logOut,
            updateContext
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default Auth;