import { useContext } from 'react';
import Image from 'next/image';
import InfoSection from './info-section';
import ProfileContext from '../../../contexts/profileContext';
import styles from './index.module.css';

const ProfileHeader = ({ notify }) => {
  const profile = useContext(ProfileContext);

  return (
    <div className={styles.header}>
      <Image
        className={styles.profilePicture}
        src={profile.profilePicture}
        alt="user profile picture"
        width="150"
        height="150"
        quality={100}
        priority
      />
      <InfoSection notify={notify} />
    </div>
  );
};

export default ProfileHeader;
