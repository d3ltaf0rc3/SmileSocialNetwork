import React from 'react';
import styles from './index.module.css';
import Stats from '../stats';
import Avatar from '../../user-avatar';
import { Link } from 'react-router-dom';

const ProfileHeader = () => {
    return (
        <div className={styles.header}>
            <Avatar size="150" imageUrl="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/28071297_1190906327711565_6994321913720957204_o.jpg?_nc_cat=109&_nc_sid=0debeb&_nc_ohc=1bE1Jv1JChQAX9xgl8D&_nc_ht=scontent.fpdv1-1.fna&oh=ac4f57f5d742ed3b644fed6fc8f11c67&oe=5F3AD470" />

            <div className={styles["stats-container"]}>
                <div className={styles.title}>
                    <h3 className={styles.username}>lmm_47</h3>
                    <Link className={styles["edit-button"]} to="/settings">Edit profile</Link>
                </div>
                
                <Stats posts="150" followers="750" following="443" />
                
                <div className={styles.bio}>
                    <span className={styles["full-name"]}>
                        Lora Marinova
                    </span>
                    <p>Varna, BG</p>
                </div>
            </div>
        </div>
    )
};

export default ProfileHeader;