import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../../components/header';
import Head from '../../components/head';
import PostCard from '../../components/feed-post-card';
import styles from './index.module.css';
import UserContext from '../../contexts/AuthContext';
import greySquare from '../../images/greySquare.jpg';

const HomePage = () => {
    const context = useContext(UserContext);
    const [feed, setFeed] = useState();

    useEffect(() => {
        if (context.user) {
            const controller = new AbortController();

            fetch("http://localhost:7777/api/posts/get/feed", {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    following: context.user.following
                }),
                signal: controller.signal
            })
                .then(res => res.json())
                .then(posts => {
                    setFeed(posts.posts);
                })
                .catch(err => {
                    if (err.name !== "AbortError")
                        console.error(err);
                });

            return () => {
                controller.abort();
            };
        }
    }, [context.user, feed]);

    if (!context.user || !feed) {
        return (
            <Fragment>
                <Head title="Feed | Smile" />
                <Header />
                <div className={styles.feed}>
                    <PostCard likes={[]} imageUrl={greySquare} profilePicture={greySquare} />)
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Head title="Feed | Smile" />
            <Header />
            <div className={styles.feed}>
                {feed.map(post => <PostCard
                    id={post._id}
                    key={post._id}
                    username={post.postedBy.username}
                    location={post.location}
                    profilePicture={post.postedBy.profilePicture}
                    likes={post.likes}
                    comments={post.comments}
                    imageUrl={post.imageUrl} />)}
            </div>
        </Fragment>
    )
};

export default HomePage;