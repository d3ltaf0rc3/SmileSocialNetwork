const editUser = (body, context, history) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/edit`, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body)
    })
        .then(() => {
            context.triggerUpdate();
            history.push(`/user/${context.user.username}`);
        })
        .catch(err => console.error(err));
};

export default editUser;