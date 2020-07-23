import React from 'react';
import styles from './index.module.css';
import Avatar from '../../components/user-avatar';

const UserData = (props) => {
    return (
        <div className={styles["user-data"]}>
            <Avatar imageUrl="https://res.cloudinary.com/smile-social-network/image/upload/v1595427921/27355582_1179049615563903_3557061432587273374_o_drqknp.jpg" size="32" />
            <div className={styles.info}>
                <span className={styles.username}>lmm_47</span>
                {props.location ? <span>{props.location}</span> : null}
            </div>
        </div>
    )
};

export default UserData;