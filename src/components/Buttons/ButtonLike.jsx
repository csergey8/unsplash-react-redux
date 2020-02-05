import React from "react";
import { withRouter } from 'react-router';
import styles from "./Buttons.module.scss";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { requestURL } from "../Header";

const ButtonLike = ({ likePhoto, unLikePhoto, id, likedByUser, isAuth, setRedirectUrl, location }) => {
  const favoriteLikeHandler = e => {
    if (!isAuth) {
      setRedirectUrl(location.pathname)
      window.location = requestURL;
    } else {
      if (!likedByUser) {
        likePhoto(id);
      } else {
        unLikePhoto(id);
      }
    }
  };
  return (
    <div
      className={`${styles.button} ${likedByUser ? styles.liked : ""} ${
        styles.buttonLike
      }`}
      onClick={favoriteLikeHandler}
    >
      <FavoriteIcon className={styles.icon} />
    </div>
  );
};

const ButtonLikeWithRouter = withRouter(ButtonLike)

export { ButtonLikeWithRouter as ButtonLike };
