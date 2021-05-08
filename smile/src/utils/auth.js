const auth = (context, type, body, setError) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/${type}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        })
        .then(res => {
            if (typeof res === "object") {
                context.logIn(res);
            } else {
                setError(res);
            }
        })
        .catch(err => console.error(err));
};

export default auth;