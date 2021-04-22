import React, { useState, useEffect } from 'react';
import AuthContext from './contexts/AuthContext';
import Spinner from './components/loading-spinner';

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
        fetch(`${process.env.REACT_APP_API_URL}/api/user/verify/cookie`, {
            method: "get",
            credentials: "include"
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    logOut();
                }
            })
            .then(user => {
                if (user) {
                    logIn(user);
                }
            })
            .catch(err => console.error(err));
    }, [update]);

    if (loggedIn === null) {
        return <div style={{ width: "100%", display: "grid", placeItems: "center" }}><Spinner /></div>
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