import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import { Link, withRouter } from 'react-router-dom';
import Input from '../input';
import Textarea from '../textarea';
import UserContext from '../../contexts/AuthContext';

const SettingsForm = (props) => {
    const context = useContext(UserContext);
    console.log(context.user);

    const [name, setName] = useState(context.user.name);
    const [bio, setBio] = useState(context.user.description);
    const [isPrivate, setIsPrivate] = useState(context.user.isPrivate);

    const updateUser = (e) => {
        e.preventDefault();

        const user = context.user;
        user.name = name;
        user.description = bio;
        user.isPrivate = isPrivate;
        console.log(user);

        fetch("http://localhost:7777/api/edit", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                user
            })
        })
            .then(res => res.json())
            .then(user => {
                context.updateContext(user);
                props.history.push(`/user/${user.username}`);
            })
            .catch(err => console.error(err));
    };

    return (
        <form className={styles.form}>
            <Input value={props.name} onChange={(e) => setName(e.target.value)} placeholder="Name" />

            <Textarea onChange={(e) => setBio(e.target.value)} value={props.bio} placeholder="Bio" />

            <div className={styles["checkbox-container"]}>
                <label htmlFor="private-profile-checkbox">Private profile</label>
                <input onChange={(e) => setIsPrivate(e.target.checked)} defaultChecked={props.isPrivate} id="private-profile-checkbox" type="checkbox"></input>
            </div>

            <div className={styles.actions}>
                <button onClick={updateUser}>Save changes</button>
                <Link to={`/user/${props.username}`}>Cancel</Link>
                <Link to="/change-password">Change password</Link>
            </div>
        </form>
    )
};

export default withRouter(SettingsForm);