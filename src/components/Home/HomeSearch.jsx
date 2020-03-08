import React from 'react';
import { SearchInput } from '../SearchInput';
import styles from './HomeSearch.module.scss';

const HomeSearch = ({ photo }) => {
  const style = {
    background: `linear-gradient(rgba(0,0,0,0.3), rgba(0, 0, 0, 0.3)), url("${photo.urls.regular}") no-repeat center`,
    backgroundSize: 'cover',
  };
  return (
    <div style={style} className={styles.HomeSearch_container}>
      <div className={styles.HomeSearch_content}>
        <h2>Search for photo:</h2>
        <SearchInput />
      </div>
      <div className={styles.HomeSearch_usernameText}>
        by
        {photo.user.username}
      </div>
    </div>
  );
};

export { HomeSearch };
