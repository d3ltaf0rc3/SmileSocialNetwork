const profileActions = (type, id, rerender) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/action/${type}/${id}`, {
        method: "post",
        credentials: "include"
    })
        .then(() => rerender())
        .catch(err => console.log(err));
};

export default profileActions;