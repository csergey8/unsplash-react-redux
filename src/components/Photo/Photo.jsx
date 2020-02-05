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
import { Loader } from '../Loader';
import { setRedirectUrl } from '../../redux/auth';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const Photo = props => {
  useEffect(() => {
    props.getPhoto(props.match.params.id);
    return () => props.clearPhoto();
  }, [props.match.params.id]);

  return createPortal(
    <React.Fragment>
    <div className={styles.modal} onClick={props.onClose}>
    </div>
      <div className={styles.photoModal} >
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
                setRedirectUrl={props.setRedirectUrl}
              />
              <ButtonCollect className={styles.photoModalButtonCollect}/>
              <ButtonDownload link={props.photo.links.download} />
            </div>
            </div>
            <div className={styles.photoImgContainer}>
              <img className={styles.photoImg} src={props.photo.urls.regular} />
            </div>
            <div className={styles.locationContainer}>
              <LocationOnIcon />
              <div>{props.photo.location.title}</div>
            </div>
          </React.Fragment>
        ) : (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
      </div>
    </React.Fragment>,
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
  unLikePhoto: id => dispatch(unLikePhoto(id)),
  setRedirectUrl: (url) => dispatch(setRedirectUrl(url))
});

const PhotoWithRedux = connect(mapStateToProps, mapDispatchToProps)(Photo);

const PhotoWithRouter = withRouter(PhotoWithRedux);

export { PhotoWithRouter as Photo };
