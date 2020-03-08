/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';
import { withRouter } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {
  getPhoto,
  clearPhoto,
  likePhoto,
  unLikePhoto,
} from '../../redux/photos';
import { ButtonLike, ButtonCollect, ButtonDownload } from '../Buttons';
import { Loader } from '../Loader';
import { setRedirectUrl } from '../../redux/auth';
import styles from './Photo.module.scss';

const Photo = ({
  getPhoto,
  match,
  history,
  clearPhoto,
  likePhoto,
  photo,
  unLikePhoto,
  isAuth,
  setRedirectUrl,
  onClose
}) => {
  useEffect(() => {
    getPhoto(match.params.id);
    return () => clearPhoto();
  }, [match.params.id]);

  const modalCloseHandler = () => {
    history.push('/');
  };

  return createPortal(
    <>
      <div
        className={styles.modal}
        onClick={onClose || modalCloseHandler}
        onKeyUp={onClose}
      />
      <div className={styles.photoModal}>
        {photo ? (
          <>
            <div className={styles.photoModalHeader}>
              <div className={styles.photoModalProfile}>
                <img
                  className={styles.photoModalProfileImg}
                  src={photo.user.profile_image.small}
                  alt="pic"
                />
                <div className={styles.photoModalProfileText}>
                  <div className={styles.photoModalProfileName}>
                    {photo.user.name}
                  </div>
                  <div className={styles.photoModalProfileUsername}>
                    @
                    {photo.user.username}
                  </div>
                </div>
              </div>
              <div className={styles.photoModalActionsContainer}>
                <ButtonLike
                  id={photo.id}
                  likePhoto={likePhoto}
                  unLikePhoto={unLikePhoto}
                  isAuth={isAuth}
                  likedByUser={photo.liked_by_user}
                  setRedirectUrl={setRedirectUrl}
                />
                <ButtonCollect className={styles.photoModalButtonCollect} />
                <ButtonDownload link={photo.links.download} />
              </div>
            </div>
            <div className={styles.photoImgContainer}>
              <img className={styles.photoImg} src={photo.urls.regular} alt="pic" />
            </div>
            <div className={styles.locationContainer}>
              <LocationOnIcon />
              <div>{photo.location.title}</div>
            </div>
          </>
        ) : (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
      </div>
    </>,
    document.getElementById('modal_root'),
  );
};

const mapStateToProps = (state) => ({
  photo: state.photosReducer.photo,
  isAuth: state.authReducer.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  getPhoto: (id) => dispatch(getPhoto(id)),
  clearPhoto: () => dispatch(clearPhoto()),
  likePhoto: (id) => dispatch(likePhoto(id)),
  unLikePhoto: (id) => dispatch(unLikePhoto(id)),
  setRedirectUrl: (url) => dispatch(setRedirectUrl(url)),
});

const PhotoWithRedux = connect(mapStateToProps, mapDispatchToProps)(Photo);

const PhotoWithRouter = withRouter(PhotoWithRedux);

export { PhotoWithRouter as Photo };
