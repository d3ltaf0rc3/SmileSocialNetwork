import React, { useState, useEffect } from 'react';
import AuthContext from './contexts/AuthContext';

const Auth = (props) => {
    const [loggedIn, setLogged] = useState(null);
    const [user, setUser] = useState(null);
    const [update, setUpdate] = useState(false);

    const logIn = (user) => {
        setLogged(true);
        setUser(user);
    };

    const logOut = () => {
        setLogged(false);
        setUser(null);
    };

    const triggerUpdate = () => {
        setUpdate(!update);
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
    }, [update]);

    if (loggedIn === null) {
        return <div></div>
    }

    return (
        <AuthContext.Provider value={{
            loggedIn,
            user,
            logIn,
            logOut,
            triggerUpdate
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default Auth;