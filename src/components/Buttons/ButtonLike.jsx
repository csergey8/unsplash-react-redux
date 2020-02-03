import React from "react";
import styles from "./Buttons.module.scss";
import FavoriteIcon from '@material-ui/icons/Favorite';

const ButtonLike = ({ likePhoto, unLikePhoto, id, liked_by_user }) => {
    const favoriteLikeHandler = (e) => {
        e.preventDefault();
        if(!liked_by_user){
            likePhoto(id)
        } else {
            unLikePhoto(id)
        }
    }
  return (
    <button
      className={`${styles.button} ${
        liked_by_user ? styles.liked : ""
      } ${styles.buttonLike}`}
      onClick={favoriteLikeHandler}
    >
      <FavoriteIcon className={styles.icon} />
    </button>
  );
};

export { ButtonLike };
