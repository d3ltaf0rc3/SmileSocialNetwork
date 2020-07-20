import React from 'react'
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const PostHeader = (props) => {
    return (
        <div className={styles["post-header"]}>
            <Link to='/profile'><img src="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/27503775_1180394138762784_345829292824939629_o.jpg?_nc_cat=110&_nc_sid=0debeb&_nc_ohc=gIYKPmMFfEMAX-y__Gh&_nc_ht=scontent.fpdv1-1.fna&oh=bfe878ff5e818d3010003b82e0d00fa5&oe=5F3A0C5F" className={styles["post-avatar"]} alt="user" /></Link>
            <div>
                <span className={styles["post-author"]}><Link className={styles.link} to="/profile">lmm_47</Link></span>
                <span className={styles.location}>Varna, Bulgaria</span>
            </div>
        </div>
    )
}

export default PostHeader;