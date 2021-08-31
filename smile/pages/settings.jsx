import { useContext } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';
import SettingsForm from '../components/settings-form';
import UserData from '../components/user-data';
import UserContext from '../contexts/authContext';
import Loading from '../components/loading-spinner';
import styles from '../styles/settings.module.css';

const SettingsPage = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const defaultUrl =
    'https://res.cloudinary.com/smile-social-network/image/upload/v1600976280/download_udtdbe.png';

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'smile-social-network',
        uploadPreset: 'profile_pics',
      },
      (error, result) => {
        if (result.event === 'success') {
          if (context.user.profilePicture !== defaultUrl) {
            fetch(`${process.env.REACT_APP_API_URL}/api/posts/delete/cloudinary`, {
              method: 'delete',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                public_id: context.user.public_id,
                url: context.user.profilePicture,
              }),
            });
          }
          editUser(
            { profilePicture: result.info.secure_url, public_id: result.info.public_id },
            context,
            router
          );
        } else if (error) {
          console.error(error);
        }
      }
    );
    widget.open();
  };

  const removeProfilePic = () => {
    if (context.user.profilePicture !== defaultUrl) {
      fetch(`${process.env.REACT_APP_API_URL}/api/posts/delete/cloudinary`, {
        method: 'delete',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: context.user.public_id,
          url: context.user.profilePicture,
        }),
      });
      editUser({ profilePicture: defaultUrl, public_id: null }, context, router);
    }
  };

  if (!context.user) {
    return (
      <div
        style={{
          width: '100vw',
          height: 'calc(100vh - 300px)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className={styles['form-container']}>
        <div className={styles['avatar-actions']}>
          <UserData imageUrl={context.user.profilePicture} username={context.user.username} />
          <div className={styles.buttons}>
            <button type="button" className={styles.btn} onClick={openWidget}>
              Change photo
            </button>
            {context.user.profilePicture !== defaultUrl ? (
              <button type="button" className={styles.btn} onClick={removeProfilePic}>
                Remove photo
              </button>
            ) : null}
          </div>
        </div>
        <SettingsForm />
      </div>
      <Footer />
    </>
  );
};

export default SettingsPage;
