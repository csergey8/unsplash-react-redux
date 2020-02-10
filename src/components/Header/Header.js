import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, withRouter } from "react-router-dom";
import { SearchInput } from '../SearchInput'; 
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { connect } from 'react-redux';
import { setRedirectUrl } from "../../redux/auth";
import MonochromePhotosIcon from '@material-ui/icons/MonochromePhotos';


const { REACT_APP_UNSPLASH_ACCESS_KEY, REACT_APP_REDIRECT_URI } = process.env;
const requestURL = `https://unsplash.com/oauth/authorize?client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code&scope=public+read_user+write_user+write_likes`;

const Header = (props) => {
  
  const onClickHandler = () => {
    props.setRedirectUrl(props.location.pathname)
  }
  return (
    <div className={styles.Header}>
      <Link to="/">
        <MonochromePhotosIcon className={styles.Logo} />
      </Link>
      <SearchInput />
      {
        props.isAuth ? 
        <Link to="/profile"><AccountCircleOutlinedIcon className={styles.profileIcon}/></Link>
        : <a onClick={onClickHandler} className={styles.login} href={requestURL}>Login</a>
      }
      
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth
})

const mapDispatchToProps = dispatch => ({
  setRedirectUrl: (url) => dispatch(setRedirectUrl(url))
})

const HeaderWithRedux = connect(mapStateToProps, mapDispatchToProps)(Header)

const HeaderWithRouter = withRouter(HeaderWithRedux)
export { HeaderWithRouter as Header, requestURL };
