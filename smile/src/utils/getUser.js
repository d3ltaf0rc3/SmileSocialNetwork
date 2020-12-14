const getUser = (history, username, setProfile) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/${username}`, {
        method: "get",
        credentials: "include"
    })
        .then(res => res.json())
        .then(user => {
            if (user.error) {
                return history.push("/error");
            }
            setProfile({
                username: user.username,
                name: user.name,
                description: user.description,
                followers: user.followers,
                following: user.following,
                posts: user.posts,
                profilePicture: user.profilePicture,
                isPrivate: user.isPrivate,
                requests: user.requests
            });
        })
        .catch(err => {
            console.log(err);
            history.push("/error");
        });
};

export default getUser;