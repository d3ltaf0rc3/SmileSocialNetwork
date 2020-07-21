import React, { Fragment } from 'react';
import Header from '../../components/header';
import Head from '../../components/head';
import Post from '../../components/post-card';
import styles from './index.module.css'

const HomePage = () => {
    return (
        <Fragment>
            <Head title="Feed | Smile" />
            <Header />
            <div className={styles.feed}>
                <Post imageUrl="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/28071297_1190906327711565_6994321913720957204_o.jpg?_nc_cat=109&_nc_sid=0debeb&_nc_ohc=1bE1Jv1JChQAX9xgl8D&_nc_ht=scontent.fpdv1-1.fna&oh=ac4f57f5d742ed3b644fed6fc8f11c67&oe=5F3AD470"/>
                <Post imageUrl="https://scontent.fpdv1-1.fna.fbcdn.net/v/t31.0-8/27503775_1180394138762784_345829292824939629_o.jpg?_nc_cat=110&_nc_sid=0debeb&_nc_ohc=gIYKPmMFfEMAX-y__Gh&_nc_ht=scontent.fpdv1-1.fna&oh=bfe878ff5e818d3010003b82e0d00fa5&oe=5F3A0C5F"/>
            </div>
        </Fragment>
    )
};

export default HomePage;