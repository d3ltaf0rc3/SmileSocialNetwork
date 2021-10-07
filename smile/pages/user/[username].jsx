import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/header';
import ProfileHeader from '../../components/profile-components/header';
import PostsSection from '../../components/profile-components/posts';
import Footer from '../../components/footer';
import AuthContext from '../../contexts/authContext';
import requirePageAuth from '../../utils/requirePageAuth';
import styles from '../../styles/profile.module.css';

const ProfilePage = ({ user }) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      <Head>
        <title>@{username} | Smile</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <ProfileHeader username={username} />
        <PostsSection username={username} />
      </div>
      <Footer />
    </AuthContext.Provider>
  );
};

export default ProfilePage;

export const getServerSideProps = requirePageAuth;
