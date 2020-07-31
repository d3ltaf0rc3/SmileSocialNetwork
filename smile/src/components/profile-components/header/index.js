import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import Stats from '../stats';
import Avatar from '../../user-avatar';
import { Link, withRouter } from 'react-router-dom';
import UserContext from '../../../contexts/AuthContext';
import PostContext from '../../../contexts/PostContext';
import greySquare from '../../../images/greySquare.jpg';

const ProfileHeader = (props) => {
    const context = useContext(UserContext);
    const postContext = useContext(PostContext);

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
        } else if (props.match.url.includes("/post/")) {
            if (postContext.post !== null) {
                setUsername(postContext.post.postedBy.username);
                setName(postContext.post.postedBy.name);
                setDescription(postContext.post.postedBy.description);
                setFollowers(postContext.post.postedBy.followers);
                setFollowing(postContext.post.postedBy.following);
                setPosts(postContext.post.postedBy.posts);
                setPicture(postContext.post.postedBy.profilePicture);
            }
        }
    }, [props.match.params.username, props.history, props.match.url, postContext.post]);

    if (context.user === null) {
        return (
            <div>
                <Avatar size="150" imageUrl={greySquare} />

                <div className={styles["stats-container"]}>
                    <div className={styles.title}>
                        <h3 className={styles.username}>Loading...</h3>
                        <Link className={styles.button} to={`/follow/${username}`}>Loading</Link>
                    </div>

                    <Stats
                        posts="Loading"
                        followers="Loading"
                        following="Loading" />

                    <div className={styles.bio}>
                        <span className={styles["full-name"]}>
                            Loading...
                        </span>
                        <pre>Loading...</pre>
                    </div>
                </div>
            </div>
        )
    }

    return username && (
        <div className={styles.header}>
            <Avatar size="150" imageUrl={profilePicture} />

            <div className={styles["stats-container"]}>
                <div className={styles.title}>
                    <h3 className={styles.username}>{username}</h3>
                    {context.user.username === username ?
                        <Link className={styles.button} to="/settings">Edit profile</Link> :
                        <Link className={styles.button} to={`/follow/${username}`}>Follow</Link>}
                </div>

                <Stats
                    posts={posts.length}
                    followers={followers.length}
                    following={following.length} />

                <div className={styles.bio}>
                    <span className={styles["full-name"]}>
                        {name}
                    </span>
                    <pre>{description}</pre>
                </div>
            </div>
        </div>
    )
};

export default withRouter(ProfileHeader);