import { useEffect, useState, useContext, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Head from '../../components/head';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProfileHeader from '../../components/profile-components/header';
import PhotosGrid from '../../components/profile-components/photos-grid';
import Private from '../../components/profile-components/private-profile';
import ProfileContext from '../../contexts/ProfileContext';
import UserContext from '../../contexts/AuthContext';
import Spinner from '../../components/loading-spinner';
import NoPosts from '../../components/profile-components/no-posts';
import styles from './index.module.css';

const ProfilePage = () => {
    const history = useHistory();
    const { username } = useParams();
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [didUpdate, setUpdate] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/user/get/${username}`, {
            method: "get",
            credentials: "include"
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return res.text();
            })
            .then(res => {
                if (typeof res === "object") {
                    setProfile(res);
                } else {
                    history.push("/error");
                }
            })
            .catch(err => {
                console.log(err);
                history.push("/error");
            });
    }, [history, username, didUpdate]);

    if (profile === null || user === null) {
        return (
            <Fragment>
                <Head title="Smile" />
                <div style={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center' }}>
                    <Spinner />
                </div>
                <Footer />
            </Fragment>
        )
    }

    const hasProfileAccess = user.username === profile.username || profile.followers.some(usr => usr.username === user.username) || !profile.isPrivate;
    const hasPosts = profile.posts.length === 0 ? <NoPosts /> : <PhotosGrid />;

    return (
        <ProfileContext.Provider value={{
            ...profile,
            doesUserFollow: profile.followers.some(usr => usr.username === user.username),
            triggerUpdate: () => setUpdate(!didUpdate)
        }}>
            <Head title={`${profile.name || profile.username} (@${profile.username}) | Smile`} />
            <Header />
            <div className={styles.container}>
                <ProfileHeader />
                {hasProfileAccess ? hasPosts : <Private />}
            </div>
            <Footer />
        </ProfileContext.Provider>
    )
};

export default ProfilePage;