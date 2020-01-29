import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, withRouter } from "react-router-dom";
import logo from "./logo.png";

const Header = (props) => {
  const { REACT_APP_UNSPLASH_ACCESS_KEY, REACT_APP_REDIRECT_URI } = process.env;
  const requestURL = `https://unsplash.com/oauth/authorize?client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code&scope=public+read_user+write_user`;
  const [ searchValue, setSearchValue ] = useState('');
  const handleInputChange = ({ target }) => {
    setSearchValue(target.value);
  }
  console.log(props)
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(searchValue){
      props.history.push(`/s/photos/${searchValue}`)
    }
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
      <a href={requestURL}>Login</a>
    </div>
  );
};

const HeaderWithRouter = withRouter(Header)
export { HeaderWithRouter as Header };
