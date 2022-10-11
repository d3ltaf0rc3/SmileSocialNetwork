import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Header from '../components/header';
import Input from '../components/input';
import Textarea from '../components/textarea';
import requirePageAuth from '../utils/requirePageAuth';
import AuthContext from '../contexts/authContext';
import styles from '../styles/add-post.module.css';

const AddPostPage = ({ user, notify }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [location, setLocation] = useState(null);
  const [caption, setCaption] = useState(null);
  const previewUrl = 'https://res.cloudinary.com/smile-social-network/image/upload/v1637842731/tencangfvd7hbdze0q4k.png';

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'smile-social-network',
        uploadPreset: 'user_posts',
      },
      (err, result) => {
        if (result.event === 'success') {
          setPost({
            url: result.info.secure_url,
            public_id: result.info.public_id,
            resource_type: result.info.resource_type,
          });
        } else if (err) {
          notify('An error occurred while uploading your asset!', { type: 'failure' });
          setPost(null);
        }
      },
    );
    widget.open();
  };

  const addPost = () => {
    fetch(`${window.location.origin}/api/post/create`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resource: post.url,
        location,
        description: caption,
        public_id: post.public_id,
        resource_type: post.resource_type,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push('/');
        } else {
          notify(res.data, { type: 'failure' });
        }
      })
      .catch(() => notify('Our servers are currently unreachable. Try again later!', { type: 'failure' }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...user,
      }}
    >
      <Head>
        <title>Add a post | Smile</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <header className={styles.header}>Add a post</header>
        <div className={styles.innerContainer}>
          <div className={styles.preview}>
            {post && post.resource_type === 'video' ? (
              <video src={post.url} className={styles.video} alt="preview" autoPlay loop playsInline />
            ) : (
              <Image
                objectFit="cover"
                src={post?.url || previewUrl}
                alt="preview"
                width="450"
                height="450"
                quality={100}
              />
            )}
            {post ? (
              <button
                type="button"
                onClick={() => notify('This feature is currently disabled!', { type: 'failure' })}
                className={`${styles.btn} ${styles.remove}`}
              >
                Remove image/video
              </button>
            ) : (
              <button type="button" onClick={openWidget} className={styles.btn}>
                Upload image/video
              </button>
            )}
          </div>
          <form className={styles.form}>
            <div className={styles.inputs}>
              <Input onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
              <Textarea
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
              />
            </div>
            <div className={styles.buttons}>
              <button type="button" onClick={addPost} disabled={!post} className={styles.btn}>
                Add post
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className={`${styles.btn} ${styles.remove}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Script id="cloudinary-widget" src="https://upload-widget.cloudinary.com/global/all.js" />
    </AuthContext.Provider>
  );
};

export default AddPostPage;

export const getServerSideProps = requirePageAuth;
