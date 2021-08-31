import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import PostCard from '../components/feed-post-card';
import UserContext from '../contexts/authContext';
import PostLoading from '../components/loading/post-card';
import styles from '../styles/home.module.css';

const HomePage = () => {
  const context = useContext(UserContext);
  const [feed, setFeed] = useState();

  useEffect(() => {
    fetch(`${window.location.origin}/api/posts/getFeed`, {
      method: 'get',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setFeed(res.data);
        } else {
          console.error(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.feed}>
        {!feed ? <PostLoading /> : null}
        {feed && feed.length > 0 ? (
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
              imageUrl={post.imageUrl}
            />
          ))
        ) : (
          <div className={styles['empty-feed']}>
            <div className={styles['img-container']}>
              <Image src="/home.svg" alt="home" height="80" width="80" />
            </div>
            <h1>Welcome to Smile</h1>
            <span>
              When you follow people, you&apos;ll see the photos and videos they post here.
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
