const auth = (context, type, body, setError) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/${type}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                context.logIn(res.data);
            } else {
                setError(res.data);
            }
        })
        .catch(err => setError(err.message));
};

export default auth;