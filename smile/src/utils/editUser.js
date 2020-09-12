const editUser = (user, context, history) => {
    fetch(`${process.env.API_URL}/api/edit`, {
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