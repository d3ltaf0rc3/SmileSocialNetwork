import React, { useState } from 'react'
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import PostHeader from '../feed-post-card/header';
import SideContent from './side-content';
import PostMenu from './post-menu';

const Post = (props) => {
    const [display, setDisplay] = useState(false);
    
    const displayMenu = () => {
        setDisplay(!display)
    }
    
    return (
        <div className={styles.background}>
            <Link to="/user/lmm_47"><svg className={styles["close-icon"]} aria-label="Close" fill="#ffffff" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg></Link>

            <div className={styles["post-container"]}>
                <img className={styles["post-image"]} src="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/28071297_1190906327711565_6994321913720957204_o.jpg?_nc_cat=109&_nc_sid=0debeb&_nc_ohc=1bE1Jv1JChQAX9xgl8D&_nc_ht=scontent.fpdv1-1.fna&oh=ac4f57f5d742ed3b644fed6fc8f11c67&oe=5F3AD470" alt="post" />
                <aside className={styles.aside}>
                    <PostHeader>
                        <div className={styles["menu-icon"]}>
                            <svg onClick={displayMenu} aria-label="More options" className="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16"><circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle></svg>
                            {display ? <PostMenu /> : null}
                        </div>
                    </PostHeader>
                    
                    <SideContent />
                </aside>
            </div>
        </div>
    )
}

export default Post;