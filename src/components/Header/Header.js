import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, withRouter } from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import logo from "./logo.png";
import { connect } from 'react-redux';


const { REACT_APP_UNSPLASH_ACCESS_KEY, REACT_APP_REDIRECT_URI } = process.env;
const requestURL = `https://unsplash.com/oauth/authorize?client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code&scope=public+read_user+write_user+write_likes`;

const Header = (props) => {
  const [ searchValue, setSearchValue ] = useState('');
  const handleInputChange = ({ target }) => {
    setSearchValue(target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(searchValue){
      props.history.push(`/s/photos/${searchValue}`)
    }
  }

  const onClickHandler = () => {

  }
  return (
    <div className={styles.header}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <form onSubmit={onSubmitHandler} >
        <input
          onChange={handleInputChange}
          value={searchValue}
          className={styles.searchInput}
          placeholder="Search free high-resolution photo"
        />
      </form>
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

const HeaderWithRedux = connect(mapStateToProps)(Header)

const HeaderWithRouter = withRouter(HeaderWithRedux)
export { HeaderWithRouter as Header, requestURL };
