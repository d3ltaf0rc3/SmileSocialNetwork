const getUser = (history, username, setProfile) => {
    fetch(`http://localhost:7777/api/user/${username}`)
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