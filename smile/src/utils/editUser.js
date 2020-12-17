const editUser = (image, context, history) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/edit`, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            ...context.user,
            ...image
        })
    })
        .then(() => {
            context.triggerUpdate();
            history.push(`/user/${context.user.username}`);
        })
        .catch(err => console.error(err));
};

export default editUser;