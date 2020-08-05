import React, { useState, useContext } from 'react';
import styles from './index.module.css';
import { withRouter } from 'react-router-dom';
import PostHeader from '../feed-post-card/header';
import SideContent from './side-content';
import PostMenu from './post-menu';
import PostContext from '../../contexts/PostContext';
import UserContext from '../../contexts/AuthContext';

const Post = (props) => {
    const context = useContext(PostContext);
    const user = useContext(UserContext);

    const [display, setDisplay] = useState(false);

    if (context.post === null) {
        return <div></div>
    }

    const displayMenu = () => {
        setDisplay(!display);
    };

    return (
        <div className={styles.background}>
            <svg onClick={props.closeImage} className={styles["close-icon"]} aria-label="Close" fill="#ffffff" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg>

            <div className={styles["post-container"]}>
                <img className={styles["post-image"]} src={context.post.imageUrl} alt="post" />
                <aside className={styles.aside}>
                    <PostHeader imageUrl={context.post.postedBy.profilePicture} location={context.post.location} username={context.post.postedBy.username}>
                        {context.post.postedBy.username === user.user.username ?
                            <div className={styles["menu-icon"]}>
                                <svg onClick={displayMenu} aria-label="More options" className="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16"><circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle></svg>
                                {display ? <PostMenu /> : null}
                            </div> : null}
                    </PostHeader>

                    <SideContent likes={context.post.likes.length} />
                </aside>
            </div>
        </div>
    )
}

export default withRouter(Post);