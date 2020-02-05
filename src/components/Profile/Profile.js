import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../redux/auth';
import { Redirect } from 'react-router';

const Profile = (props) => {
    const logoutHanlder = () => {
        props.logOut();
        return <Redirect to="/" />
    }
    return (
        <div>
            <button onClick={logoutHanlder}>logout</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut())
})

const ProfileWithRedux = connect(null, mapDispatchToProps)(Profile)

export { ProfileWithRedux as Profile }
