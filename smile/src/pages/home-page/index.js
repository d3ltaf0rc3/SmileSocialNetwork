import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../../components/header';
import Head from '../../components/head';
import PostCard from '../../components/feed-post-card';
import styles from './index.module.css';
import UserContext from '../../contexts/AuthContext';
import Spinner from '../../components/loading-spinner';
import home from '../../images/home-run.svg';

const HomePage = () => {
    const context = useContext(UserContext);
    const [feed, setFeed] = useState();
    const [didUpdate, setUpdate] = useState(false);

    useEffect(() => {
        if (context.user) {
            fetch(`${process.env.REACT_APP_API_URL}/api/posts/get/feed`, {
                method: "get",
                credentials: "include"
            })
                .then(res => res.json())
                .then(posts => {
                    setFeed(posts);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [context.user, didUpdate]);

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
                            description={post.description}
                            username={post.postedBy.username}
                            location={post.location}
                            profilePicture={post.postedBy.profilePicture}
                            setUpdate={() => setUpdate(!didUpdate)}
                            likes={post.likes}
                            comments={post.comments}
                            imageUrl={post.imageUrl} />) :
                        <div className={styles["empty-feed"]}>
                            <div className={styles["img-container"]}>
                                <img src={home} alt="home icon" />
                            </div>
                            <h1>Welcome to Smile</h1>
                            <span>When you follow people, you'll see the photos and videos they post here.</span>
                        </div>}
            </div>
        </Fragment>
    )
};

export default HomePage;