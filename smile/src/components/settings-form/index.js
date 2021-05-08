import { useContext, useState } from 'react';
import styles from './index.module.css';
import { Link, useHistory } from 'react-router-dom';
import Input from '../input';
import Textarea from '../textarea';
import editUser from '../../utils/editUser';
import UserContext from '../../contexts/AuthContext';

const SettingsForm = () => {
    const context = useContext(UserContext);
    const history = useHistory();
    const [name, setName] = useState(context.user.name);
    const [bio, setBio] = useState(context.user.description);
    const [isPrivate, setIsPrivate] = useState(context.user.isPrivate);

    const updateUser = () => {
        if (name !== context.user.name ||
            bio !== context.user.description ||
            isPrivate !== context.user.isPrivate) {
            editUser({ name, description: bio, isPrivate }, context, history);
        }
    };

    return (
        <form className={styles.form}>
            <div className={styles["input-container"]}>
                <label>Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" />
            </div>
            <div className={styles["input-container"]}>
                <label>Bio</label>
                <Textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder="Bio" />
            </div>

            <div className={styles["switch-box"]}>
                <label htmlFor="private-profile-checkbox">Private profile</label>
                <input
                    className={styles.switch}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    defaultChecked={isPrivate}
                    id="private-profile-checkbox"
                    type="checkbox"
                />
            </div>

            <div className={styles.actions}>
                <button type="button" onClick={updateUser}>Save changes</button>
                <Link to={`/user/${context.user.username}`}>Cancel</Link>
                <Link to="/change-password">Change password</Link>
            </div>
        </form>
    )
};

export default SettingsForm;