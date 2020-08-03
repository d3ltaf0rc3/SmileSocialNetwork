import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './index.module.css';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProfileHeader from '../../components/profile-components/header';
import PhotosGrid from '../../components/profile-components/photos-grid';
import Private from '../../components/profile-components/private-profile';
import ProfileContext from '../../contexts/ProfileContext';
import UserContext from '../../contexts/AuthContext';

const ProfilePage = (props) => {
    const context = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [rerender, setRerender] = useState();

    useEffect(() => {
        fetch(`http://localhost:7777/api/user/${props.match.params.username}`)
            .then(res => res.json())
            .then(user => {
                if (user.error) {
                    console.log(user.error);
                    return props.history.push("/error");
                }
                setProfile({
                    username: user.username,
                    name: user.name,
                    description: user.description,
                    followers: user.followers,
                    following: user.following,
                    posts: user.posts,
                    profilePicture: user.profilePicture,
                    isPrivate: user.isPrivate,
                    requests: user.requests
                });
            })
            .catch(err => {
                console.log(err);
                props.history.push("/error");
            });
    }, [props.history, props.match.params.username, rerender]);

    if (profile === null || context.user === null) {
        return <div></div>
    }

    return (
        <ProfileContext.Provider value={{ ...profile, doesUserFollow: profile.followers.some(user => user.username === context.user.username) }}>
            <Head title={`${profile.name || profile.username} (@${profile.username}) | Smile`} />
            <Header />
            <div className={styles.container}>
                <ProfileHeader rerender={() => setRerender(!rerender)} />
                {context.user.username === profile.username ||
                    profile.followers.some(user => user.username === context.user.username) ||
                    profile.isPrivate === false ?
                    <PhotosGrid /> : <Private />}
            </div>
            <Footer />
        </ProfileContext.Provider>
    )
};

export default withRouter(ProfilePage);