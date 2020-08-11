const profileActions = (type, username, rerender) => {
    fetch(`http://localhost:7777/api/${type}/${username}`, {
        method: "post",
        credentials: "include"
    })
        .then(() => rerender())
        .catch(err => console.log(err));
};

export default profileActions;