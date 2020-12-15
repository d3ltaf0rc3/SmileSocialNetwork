import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import PostContext from '../../../contexts/PostContext';
import { withRouter } from 'react-router-dom';
import Edit from '../edit';

const PostMenu = (props) => {
    const post = useContext(PostContext);
    const [displayEdit, setDisplay] = useState(false);

    const deletePost = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/posts/delete/${post._id}`, {
            method: "delete",
            credentials: "include"
        })
            .then(() => props.history.push("/"))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <div className={styles.arrow}></div>
            <div className={styles["menu-box"]}>
                <div onClick={() => setDisplay(true)} className={styles.option}>
                    <span>Edit</span>
                </div>
                <div onClick={deletePost} className={styles.option}>
                    <span>Delete</span>
                </div>
            </div>
            {displayEdit ? <Edit setUpdate={props.setUpdate} closeMenu={props.closeMenu} /> : null}
        </div>
    )
};

export default withRouter(PostMenu);