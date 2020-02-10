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
                <div>
                    {user.name}
                </div>
            
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
