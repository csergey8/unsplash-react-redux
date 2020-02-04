import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Photo.module.scss";
import { createPortal } from "react-dom";
import { withRouter } from "react-router-dom";
import {
  getPhoto,
  clearPhoto,
  likePhoto,
  unLikePhoto
} from "../../redux/photos";
import { ButtonLike, ButtonCollect, ButtonDownload } from "../Buttons";
const modalStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,.2)",
  color: "##FFF",
  fontSize: "40px"
};

const Photo = props => {
  useEffect(() => {
    props.getPhoto(props.match.params.id);
    return () => props.clearPhoto();
  }, [props.match.params.id]);

  const modalHandler = (e) => {
    e.stopPropagation()
    e.preventDefault();
  }

  return createPortal(
    <div style={modalStyle} onClick={props.onClose}>
      <div className={styles.photoModal} onClick={modalHandler}>
        {props.photo ? (
          <React.Fragment>
          <div className={styles.photoModalHeader}>
            <div className={styles.photoModalProfile}>
              <img
                className={styles.photoModalProfileImg}
                src={props.photo.user.profile_image.small}
              />
              <div className={styles.photoModalProfileText}>
                <div className={styles.photoModalProfileName}>{props.photo.user.name}</div>
                <div className={styles.photoModalProfileUsername}>@{props.photo.user.username}</div>
              </div>
            </div>
            <div className={styles.photoModalActionsContainer}>
              <ButtonLike
                id={props.photo.id}
                likePhoto={props.likePhoto}
                unLikePhoto={props.unLikePhoto}
                isAuth={props.isAuth}
                likedByUser={props.photo.liked_by_user}
              />
              <ButtonCollect className={styles.photoModalButtonCollect}/>
              <ButtonDownload />
            </div>
            </div>
            <div className={styles.photoImgContainer}>
              <img className={styles.photoImg} src={props.photo.urls.regular} />
            </div>
          </React.Fragment>
        ) : (
          "Loading"
        )}
      </div>
    </div>,
    document.getElementById("modal_root")
  );
};

const mapStateToProps = state => ({
  photo: state.photosReducer.photo,
  isAuth: state.authReducer.isAuth
});

const mapDispatchToProps = dispatch => ({
  getPhoto: id => dispatch(getPhoto(id)),
  clearPhoto: () => dispatch(clearPhoto()),
  likePhoto: id => dispatch(likePhoto(id)),
  unLikePhoto: id => dispatch(unLikePhoto(id))
});

const PhotoWithRedux = connect(mapStateToProps, mapDispatchToProps)(Photo);

const PhotoWithRouter = withRouter(PhotoWithRedux);

export { PhotoWithRouter as Photo };
