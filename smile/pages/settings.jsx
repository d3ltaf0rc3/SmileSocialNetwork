import Script from 'next/script';
import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import SettingsForm from '../components/settings-form';
import UserData from '../components/user-data';
import requirePageAuth from '../utils/requirePageAuth';
import AuthContext from '../contexts/authContext';
import styles from '../styles/settings.module.css';

const SettingsPage = ({ user, notify }) => {
  const [currUser, setUser] = useState(user);
  const defaultUrl = 'https://res.cloudinary.com/smile-social-network/image/upload/v1635235466/rvk7tbbczfwhhqrfpaty.png';
  const defaultId = 'rvk7tbbczfwhhqrfpaty';

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'smile-social-network',
        uploadPreset: 'profile_pics',
      },
      (err, result) => {
        if (result.event === 'success') {
          fetch(`${window.location.origin}/api/user/profilePicture`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              resource: result.info.secure_url,
              public_id: result.info.public_id,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.success) {
                setUser(res.data);
                notify('You have successfully updated your profile picture!', {
                  type: 'success',
                });
              } else {
                notify(res.data, { type: 'failure' });
              }
            })
            .catch(() => notify('Our servers are currently unreachable. Try again later!', { type: 'failure' }));
        } else if (err) {
          notify('An error occurred while uploading your asset!', { type: 'failure' });
        }
      },
    );
    widget.open();
  };

  const removeProfilePic = () => {
    fetch(`${window.location.origin}/api/user/profilePicture`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resource: defaultUrl,
        public_id: defaultId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setUser(res.data);
          notify('You have successfully removed your profile picture!', { type: 'success' });
        } else {
          notify(res.data, { type: 'failure' });
        }
      })
      .catch(() => notify('Our servers are currently unreachable. Try again later!', { type: 'failure' }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...currUser,
      }}
    >
      <Head>
        <title>Settings | Smile</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <div className={styles.actions}>
          <UserData imageUrl={currUser.profilePicture} username={currUser.username} />
          <div className={styles.buttons}>
            <button type="button" className={`${styles.btn} ${styles.blue}`} onClick={openWidget}>
              Change photo
            </button>
            {currUser.profilePicture !== defaultUrl ? (
              <button type="button" className={`${styles.btn} ${styles.red}`} onClick={removeProfilePic}>
                Remove photo
              </button>
            ) : null}
          </div>
        </div>
        <SettingsForm />
      </div>
      <Footer />
      <Script id="cloudinary-widget-2" src="https://upload-widget.cloudinary.com/global/all.js" />
    </AuthContext.Provider>
  );
};

export default SettingsPage;

export const getServerSideProps = requirePageAuth;
