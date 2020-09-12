const profileActions = (type, username, rerender) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/${type}/${username}`, {
        method: "post",
        credentials: "include"
    })
        .then(() => rerender())
        .catch(err => console.log(err));
};

export default profileActions;