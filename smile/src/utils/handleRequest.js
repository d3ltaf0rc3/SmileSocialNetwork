const handleRequest = (action, id, context) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/handle-request`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                action,
                id
            })
        })
            .then(() => context.triggerUpdate())
            .catch(err => console.log(err));
};

export default handleRequest;