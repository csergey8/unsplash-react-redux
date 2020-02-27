import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../redux/auth';
import styles from './Profile.module.scss';
import { Loader } from '../Loader';
import { getCurrentUser } from '../../redux/user.js'
import { Redirect } from 'react-router';

const Profile = ({ user, getCurrentUser, logOut }) => {
    useEffect(() => {
        getCurrentUser();
    }, [])
    const logoutHanlder = () => {
        logOut();
        return <Redirect to="/" />
    }
    return (
        <div className={styles.Profile_container}>
            { user ?
                <>
                <div>
                <img src={user.profile_image['medium']} alt="profile"/>
                </div>
                <div>
                    <h1>{user.name}</h1>
                    <div>Likes: {user.total_likes}</div>
                    <div>Photos: {user.total_photos}</div>
                </div>
                </>
                : <Loader />
            }
            <button onClick={logoutHanlder}>logout</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    getCurrentUser: () => dispatch(getCurrentUser()) 
})

const mapStateToProps = (state) => ({
    user: state.userReducer.currentUser
})

const ProfileWithRedux = connect(mapStateToProps, mapDispatchToProps)(Profile)

export { ProfileWithRedux as Profile }
