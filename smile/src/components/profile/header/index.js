import React from 'react';
import styles from './index.module.css';
import Stat from '../stat';
import Avatar from '../../user-avatar';
import EditButton from '../edit-button';

const ProfileHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles["image-container"]}>
                <Avatar size="150" imageUrl="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/28071297_1190906327711565_6994321913720957204_o.jpg?_nc_cat=109&_nc_sid=0debeb&_nc_ohc=1bE1Jv1JChQAX9xgl8D&_nc_ht=scontent.fpdv1-1.fna&oh=ac4f57f5d742ed3b644fed6fc8f11c67&oe=5F3AD470"/>
            </div>
            <div className={styles["stats-container"]}>
                <div className={styles.title}>
                    <h3 className={styles.username}>lmm_47</h3>
                    <EditButton />
                </div>
                <ul className={styles.stats}>
                    <Stat number="150" title="posts"/>
                    <Stat number="750" title="followers"/>
                    <Stat number="443" title="following"/>
                </ul>
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