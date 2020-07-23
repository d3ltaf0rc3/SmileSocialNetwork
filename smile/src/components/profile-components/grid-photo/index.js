import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const GridPhoto = () => {
    return (
        <div className={styles["photo"]}>
            <Link to="/post/1"><img src="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/28071297_1190906327711565_6994321913720957204_o.jpg?_nc_cat=109&_nc_sid=0debeb&_nc_ohc=1bE1Jv1JChQAX9xgl8D&_nc_ht=scontent.fpdv1-1.fna&oh=ac4f57f5d742ed3b644fed6fc8f11c67&oe=5F3AD470" alt="grid part" /></Link>
        </div>
    )
};

export default GridPhoto;
