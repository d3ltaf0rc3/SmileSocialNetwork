import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import PostContext from '../../../contexts/PostContext';
import { withRouter } from 'react-router-dom';
import Edit from '../edit';

const PostMenu = (props) => {
    const context = useContext(PostContext);
    const [displayEdit, setDisplay] = useState(false);

    const deletePost = () => {
        fetch(`http://localhost:7777/api/posts/delete/${context.post._id}`, {
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