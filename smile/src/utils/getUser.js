const getUser = (history, username, setProfile) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/get/${username}`, {
        method: "get",
        credentials: "include"
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        })
        .then(res => {
            if (typeof res === "object") {
                setProfile(res);
            } else {
                history.push("/error");
            }
        })
        .catch(err => {
            console.log(err);
            history.push("/error");
        });
};

export default getUser;