import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProfileHeader from '../../components/profile-components/header';
import PhotosGrid from '../../components/profile-components/photos-grid';
import Private from '../../components/profile-components/private-profile';
import ProfileContext from '../../contexts/profileContext';
import UserContext from '../../contexts/authContext';
import Spinner from '../../components/loading/spinner';
import NoPosts from '../../components/profile-components/no-posts';
import styles from '../../styles/profile.module.css';

const ProfilePage = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [didUpdate, setUpdate] = useState();

  useEffect(() => {
    fetch(`${window.location.origin}/api/user/getProfile?username=${username}`, {
      method: 'get',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          setProfile(res);
        } else {
          router.push('/error');
        }
      })
      .catch(() => router.push('/error'));
  }, [router, username, didUpdate]);

  if (profile === null || user === null) {
    return <Spinner withWrapper />;
  }

  const hasProfileAccess =
    user.username === profile.username ||
    profile.followers.some((usr) => usr.username === user.username) ||
    !profile.isPrivate;
  const hasPosts = profile.posts.length === 0 ? <NoPosts /> : <PhotosGrid />;

  return (
    <ProfileContext.Provider
      value={{
        ...profile,
        doesUserFollow: profile.followers.some((usr) => usr.username === user.username),
        triggerUpdate: () => setUpdate(!didUpdate),
      }}
    >
      <Header />
      <div className={styles.container}>
        <ProfileHeader />
        {hasProfileAccess ? hasPosts : <Private />}
      </div>
      <Footer />
    </ProfileContext.Provider>
  );
};

export default ProfilePage;
