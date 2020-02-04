import React from "react";
import styles from "./Buttons.module.scss";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Redirect } from 'react-router';
import { requestURL } from '../Header';

const ButtonLike = ({ likePhoto, unLikePhoto, id, likedByUser, isAuth }) => {
    const favoriteLikeHandler = (e) => {
      e.preventDefault();
      if(!isAuth){
        window.location = requestURL
      }
        if(!likedByUser){
            likePhoto(id)
        } else {
            unLikePhoto(id)
        }
    }
  return (
    <button
      className={`${styles.button} ${
        likedByUser ? styles.liked : ""
      } ${styles.buttonLike}`}
      onClick={favoriteLikeHandler}
    >
      <FavoriteIcon className={styles.icon} />
    </button>
  );
};

export { ButtonLike };
