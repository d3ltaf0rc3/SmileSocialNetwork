import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.css';
import PostHeader from '../feed-post-card/header';
import SideContent from './side-content';
import PostMenu from './post-menu';
import PostContext from '../../contexts/PostContext';
import UserContext from '../../contexts/AuthContext';
import Spinner from '../loading-spinner';
import Video from '../video';

const Post = (props) => {
    const user = useContext(UserContext);
    const [display, setDisplay] = useState(false);
    const [post, setPost] = useState(null);
    const [didUpdate, setUpdate] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/get-post/${props.id}`, {
            method: "get",
            credentials: "include"
        })
            .then(res => res.json())
            .then(post => setPost(post))
            .catch(err => console.error(err));
    }, [props.id, didUpdate]);

    return (
        <PostContext.Provider value={{ post }}>
            <div className={styles.background}>
                <svg onClick={props.closeImage} className={styles["close-icon"]} aria-label="Close" fill="#ffffff" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg>
                {!post ?
                    <div className={styles["spinner-container"]}><Spinner /></div> :
                    <div className={styles["post-container"]}>
                        {post.imageUrl.includes("video") ?
                            <Video videoUrl={post.imageUrl} /> :
                            <img className={styles["post-image"]} src={post.imageUrl} alt="post" />
                        }
                        <aside className={styles.aside}>
                            <PostHeader imageUrl={post.postedBy.profilePicture} location={post.location} username={post.postedBy.username}>
                                {post.postedBy.username === user.user.username ?
                                    <div className={styles["menu-icon"]}>
                                        <svg onClick={() => setDisplay(!display)} aria-label="More options" className="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16"><circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle></svg>
                                        {display ? <PostMenu
                                            setUpdate={() => setUpdate(!didUpdate)}
                                            closeMenu={() => setDisplay(false)} /> : null}
                                    </div> : null
                                }
                            </PostHeader>

                            <SideContent setUpdate={() => setUpdate(!didUpdate)} />
                        </aside>
                    </div>}
            </div>
        </PostContext.Provider>
    )
}

export default Post;