import React, { useState, useEffect } from 'react'
import styles from './index.module.css';
import { Link, withRouter } from 'react-router-dom';
import PostHeader from '../feed-post-card/header';
import SideContent from './side-content';
import PostMenu from './post-menu';

const Post = (props) => {
    const [display, setDisplay] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:7777/api/posts/get-post/${props.match.params.id}`)
            .then(res => res.json())
            .then(post => setPost(post))
            .catch(err => console.error(err));
    }, [props.match.params.id]);

    if (post === null) {
        return <div></div>
    }

    const displayMenu = () => {
        setDisplay(!display);
    };

    console.log(post)

    return (
        <div className={styles.background}>
            <Link to="/user/lmm_47"><svg className={styles["close-icon"]} aria-label="Close" fill="#ffffff" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg></Link>

            <div className={styles["post-container"]}>
                <img className={styles["post-image"]} src={post.imageUrl} alt="post" />
                <aside className={styles.aside}>
                    <PostHeader imageUrl={post.postedBy.profilePicture} location={post.location} username={post.postedBy.username}>
                        <div className={styles["menu-icon"]}>
                            <svg onClick={displayMenu} aria-label="More options" className="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16"><circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle></svg>
                            {display ? <PostMenu /> : null}
                        </div>
                    </PostHeader>

                    <SideContent likes={post.likes.length} />
                </aside>
            </div>
        </div>
    )
}

export default withRouter(Post);