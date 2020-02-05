import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { getToken, authStart } from "../../redux/auth";
import { Loader } from '../Loader';
import styles from '../Photo/Photo.module.scss';

const OAuth = props => {
  useEffect(() => {
    props.authStart();
    const code = props.history.location.search.split("=")[1];
    if (code) {
    props.getToken(code);
  }
  }, []);
  const url = localStorage.getItem('REACT_APP_UNSPLASH_REDIRECT_URL')
  if (props.isAuth) {
    return <Redirect to={`${url ? url : "/"}`} />;
  }
  if (props.authError) {
    return <Redirect to="/" />;
  }
  

  return <div className={styles.loaderContainer}>{props.authProccess ? <Loader /> : <Loader /> }</div>;
};

const mapStateToProps = state => ({
  authProccess: state.authReducer.authProccess,
  authError: state.authReducer.authError,
  isAuth: state.authReducer.isAuth,
  redirectUrl: state.authReducer.redirectUrl
});

const mapDispatchToProps = dispatch => ({
  getToken: code => dispatch(getToken(code)),
  authStart: () => dispatch(authStart())
});

const OAuthWithRedux = connect(mapStateToProps, mapDispatchToProps)(OAuth);

export { OAuthWithRedux as OAuth };
