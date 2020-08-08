const auth = (context, type, body, setError) => {
    fetch(`http://localhost:7777/api/${type}`, {
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