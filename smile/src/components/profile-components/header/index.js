import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import Stats from '../stats';
import Avatar from '../../user-avatar';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../../../Context';

const ProfileHeader = (props) => {
    const context = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [followers, setFollowers] = useState("");
    const [following, setFollowing] = useState("");
    const [posts, setPosts] = useState("");
    const [profilePicture, setPicture] = useState("");

    useEffect(() => {
        if (props.match.url.includes("/user/")) {
            fetch(`http://localhost:7777/api/user/${props.match.params.username}`)
            .then(res => res.json())
            .then(user => {
                if (user.error) {
                    return props.history.push("/error");
                }
                setUsername(user.username);
                setName(user.name);
                setDescription(user.description);
                setFollowers(user.followers);
                setFollowing(user.following);
                setPosts(user.posts);
                setPicture(user.profilePicture);
            })
            .catch(err => {
                props.history.push("/error");
            });
        }
    }, [props.match.params.username, props.history, props.match.url]);

    if (context.user === null) {
        return <div></div>
    }

    return (
        <div className={styles.header}>
            <Avatar size="150" imageUrl={profilePicture} />

            <div className={styles["stats-container"]}>
                <div className={styles.title}>
                    <h3 className={styles.username}>{username}</h3>
                    {context.user.username === username ?
                        <Link className={styles["edit-button"]} to="/settings">Edit profile</Link> :
                        <Link className={styles["edit-button"]} to={`/follow/${username}`}>Follow</Link>}
                </div>

                <Stats
                    posts={posts.length}
                    followers={followers.length}
                    following={following.length} />

                <div className={styles.bio}>
                    <span className={styles["full-name"]}>
                        {name}
                    </span>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
};

export default withRouter(ProfileHeader);