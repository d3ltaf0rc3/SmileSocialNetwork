import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/header';
import ProfileHeader from '../../components/profile-components/header';
import PostsSection from '../../components/profile-components/posts';
import Spinner from '../../components/loading/spinner';
import Footer from '../../components/footer';
import AuthContext from '../../contexts/authContext';
import ProfileContext from '../../contexts/profileContext';
import requirePageAuth from '../../utils/requirePageAuth';
import styles from '../../styles/profile.module.css';

const ProfilePage = ({ user, notify }) => {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState(null);

  const getProfile = () => {
    fetch(`/api/user/get?username=${username}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setProfile(res.data);
        } else {
          router.push('/not-found');
        }
      })
      .catch(() => router.push('/not-found'));
  };

  useEffect(() => {
    if (profile !== null) {
      setProfile(null);
    }

    getProfile();
  }, [username]);

  if (profile === null) {
    return <Spinner withWrapper />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...user,
      }}
    >
      <ProfileContext.Provider
        value={{
          ...profile,
          updateProfile: getProfile,
        }}
      >
        <Head>
          <title>@{username} | Smile</title>
        </Head>
        <Header />
        <div className={styles.container}>
          <ProfileHeader notify={notify} />
          <PostsSection notify={notify} />
        </div>
        <Footer />
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
};

export default ProfilePage;

export const getServerSideProps = requirePageAuth;
