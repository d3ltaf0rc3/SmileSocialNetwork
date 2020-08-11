const handleRequest = (action, username, context) => {
    fetch("http://localhost:7777/api/handle-request", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                action,
                username
            })
        })
            .then(() => context.triggerUpdate())
            .catch(err => console.log(err));
};

export default handleRequest;