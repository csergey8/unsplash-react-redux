/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styles from './Buttons.module.scss';
import { requestURL } from '../Header';

const ButtonLike = ({
  likePhoto,
  unLikePhoto,
  id,
  likedByUser,
  isAuth,
  setRedirectUrl,
  location,
}) => {
  const favoriteLikeHandler = () => {
    if (!isAuth) {
      setRedirectUrl(location.pathname);
      window.location = requestURL;
    } else if (!likedByUser) {
      likePhoto(id);
    } else {
      unLikePhoto(id);
    }
  };
  return (
    <button
      className={`${styles.button} ${likedByUser ? styles.liked : ''} ${
        styles.buttonLike
      }`}
      type="button"
      onClick={favoriteLikeHandler}
      onKeyPress={favoriteLikeHandler}
    >
      <FavoriteIcon className={styles.icon} />
    </button>
  );
};

const ButtonLikeWithRouter = withRouter(ButtonLike);

export { ButtonLikeWithRouter as ButtonLike };
