import React from "react";
import styles from "./Header.module.scss";
import logo from "./logo.png";

const Header = () => {
  const { REACT_APP_UNSPLASH_ACCESS_KEY, REACT_APP_REDIRECT_URI } = process.env;
  console.log(process.env)
  const requestURL = `https://unsplash.com/oauth/authorize?client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code&scope=public+read_user+write_user`;
  return (
    <div className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <form /*onSubmit={onSubmitHamdler}*/>
        <input
          //onChange={handleInputChange}
          //value={searchInput}
          className={styles.searchInput}
          placeholder="Search free high-resolution photo"
        />
      </form>
      <a href={requestURL}>Login</a>
    </div>
  );
};

export { Header };
