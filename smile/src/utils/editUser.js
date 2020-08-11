const editUser = (user, context, history) => {
    fetch("http://localhost:7777/api/edit", {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            user
        })
    })
        .then(() => {
            context.triggerUpdate();
            history.push(`/user/${context.user.username}`);
        })
        .catch(err => console.error(err));
};

export default editUser;