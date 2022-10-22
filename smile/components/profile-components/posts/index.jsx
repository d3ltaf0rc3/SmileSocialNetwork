import { useContext } from 'react';
import NoPosts from '../no-posts';
import PhotosGrid from '../photos-grid';
import Private from '../private-profile';
import UserContext from '../../../contexts/authContext';
import ProfileContext from '../../../contexts/profileContext';

const Posts = ({ notify }) => {
  const user = useContext(UserContext);
  const profile = useContext(ProfileContext);

  const hasProfileAccess =
    user.username === profile.username || profile.doesFollow || !profile.isPrivate;
  const hasPosts = profile.posts === 0 ? <NoPosts /> : <PhotosGrid notify={notify} />;

  return hasProfileAccess ? hasPosts : <Private />;
};

export default Posts;
