const auth = (context, type, body, setError) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/${type}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(user => {
            if (!user.error) {
                context.logIn(user);
            } else {
                setError(user.error);
            }
        })
        .catch(err => console.log(err));
};

export default auth;