import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import PostCard from '../components/feed-post-card';
import PostLoading from '../components/loading/post-card';
import requirePageAuth from '../utils/requirePageAuth';
import styles from '../styles/home.module.css';

const HomePage = () => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    fetch(`${window.location.origin}/api/posts/getFeed`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setFeed(res.data);
        } else {
          console.error(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (feed === null) {
    return (
      <>
        <Head>
          <title>Feed | Smile</title>
        </Head>
        <Header />
        <div className={styles.feed}>
          <PostLoading />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Feed | Smile</title>
      </Head>
      <Header />
      <div className={styles.feed}>
        {feed.length > 0 ? (
          feed.map((post) => (
            <PostCard
              id={post._id}
              key={post._id}
              description={post.description}
              username={post.postedBy.username}
              location={post.location}
              profilePicture={post.postedBy.profilePicture}
              likes={post.likes}
              comments={post.comments}
              imageUrl={post.resource}
            />
          ))
        ) : (
          <div className={styles.emptyFeed}>
            <div className={styles.imgContainer}>
              <Image src="/home.svg" alt="home" height="80" width="80" />
            </div>
            <h1>Welcome to Smile</h1>
            <p>
              When you follow people, you&apos;ll see the photos and videos they post here.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;

export const getServerSideProps = requirePageAuth;
