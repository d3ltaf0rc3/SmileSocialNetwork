import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../../components/header';
import Head from '../../components/head';
import PostCard from '../../components/feed-post-card';
import styles from './index.module.css';
import UserContext from '../../contexts/AuthContext';
import Spinner from '../../components/loading-spinner';
import sadFace from '../../images/sad.svg';

const HomePage = () => {
    const context = useContext(UserContext);
    const [feed, setFeed] = useState();
    const [hasLiked, setLiked] = useState();
    const [hasCommented, setCommented] = useState(false);

    useEffect(() => {
        if (context.user) {
            const controller = new AbortController();

            fetch("http://localhost:7777/api/posts/get/feed", {
                method: "post",
                credentials: "include",
                signal: controller.signal
            })
                .then(res => res.json())
                .then(posts => {
                    setFeed(posts);
                })
                .catch(err => {
                    if (err.name !== "AbortError")
                        console.error(err);
                });

            return () => {
                controller.abort();
            };
        }
    }, [context.user, hasLiked, hasCommented]);

    return (
        <Fragment>
            <Head title="Feed | Smile" />
            <Header />
            <div className={styles.feed}>
                {!context.user || !feed ?
                    <Spinner /> : feed.length > 0 ?
                        feed.map(post => <PostCard
                            id={post._id}
                            key={post._id}
                            username={post.postedBy.username}
                            location={post.location}
                            profilePicture={post.postedBy.profilePicture}
                            setCommented={setCommented}
                            setLiked={setLiked}
                            likes={post.likes}
                            comments={post.comments}
                            imageUrl={post.imageUrl} />) :
                        <div className={styles["empty-feed"]}>
                            <img src={sadFace} alt="sad face" />
                            <span>Your feed seems empty!
                        Go follow someone and their posts will appear here!</span>
                        </div>}
            </div>
        </Fragment>
    )
};

export default HomePage;