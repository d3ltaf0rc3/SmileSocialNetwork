import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from '../input';
import Textarea from '../textarea';
import ToggleButton from '../toggle-button';
import UserContext from '../../contexts/authContext';
import styles from './index.module.css';

const SettingsForm = ({ notify }) => {
  const user = useContext(UserContext);
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.description);
  const [isPrivate, setIsPrivate] = useState(user.isPrivate);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (name !== user.name || bio !== user.description || isPrivate !== user.isPrivate) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, bio, isPrivate]);

  const updateUser = () => {
    fetch(`${window.location.origin}/api/user/edit`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description: bio,
        isPrivate,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          router.push(`/user/${res.data.username}`);
        } else {
          notify(res.data, { type: 'failure' });
        }
      })
      .catch(() => {
        notify('Our servers are currently unreachable. Try again later!', {
          type: 'failure',
        });
      });
  };

  return (
    <form className={styles.form}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        label="Name"
      />
      <Textarea
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        placeholder="Bio"
        label="Bio"
      />
      <ToggleButton
        label="Private profile"
        defaultValue={isPrivate}
        onChange={(e) => setIsPrivate(e.target.checked)}
      />
      <div className={styles.actions}>
        <button disabled={disabled} type="button" onClick={updateUser}>
          Save changes
        </button>
        <Link href={`/user/${user.username}`}>
          <a>Cancel</a>
        </Link>
        <Link href="/change-password">
          <a>Change password</a>
        </Link>
      </div>
    </form>
  );
};

export default SettingsForm;
