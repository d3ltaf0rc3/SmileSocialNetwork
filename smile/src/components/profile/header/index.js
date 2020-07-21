import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import Stat from '../stat';
import Avatar from '../../user-avatar';
import EditButton from '../edit-button';

const ProfileHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles["image-container"]}>
                <Avatar size="150" imageUrl="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/27503775_1180394138762784_345829292824939629_o.jpg?_nc_cat=110&_nc_sid=0debeb&_nc_ohc=gIYKPmMFfEMAX-y__Gh&_nc_ht=scontent.fpdv1-1.fna&oh=bfe878ff5e818d3010003b82e0d00fa5&oe=5F3A0C5F"/>
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