/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { likePhoto, unLikePhoto } from '../../redux/photos';
import { setRedirectUrl } from '../../redux/auth';
import { ButtonLike, ButtonCollect, ButtonDownload } from '../Buttons';
import styles from './PhotoTab.module.scss';

const PhotoTab = ({
  photo,
  match,
  likePhoto,
  unLikePhoto,
  isAuth,
  setRedirectUrl,
}) => {
  const link =
    match.url === '/' ? `${match.url}${photo.id}` : `${match.url}/${photo.id}`;
  return (
    <div className={styles.photoTabContainer}>
      <Link to={link} className={styles.photoTabLink}>
        <img src={photo.urls.small} alt="pic" />
      </Link>
      <div className={styles.favoriteAction}>
        <ButtonLike
          setRedirectUrl={setRedirectUrl}
          likePhoto={likePhoto}
          unLikePhoto={unLikePhoto}
          id={photo.id}
          likedByUser={photo.liked_by_user}
          isAuth={isAuth}
        />
        <ButtonCollect />
      </div>
      <div className={styles.downloadButton}>
        <ButtonDownload link={photo.links.download} />
      </div>
      <div className={styles.profileAction}>
        <img
          className={styles.profileImage}
          src={photo.user.profile_image.small}
          alt="pic profile"
        />
        <div className={styles.profileName}>{photo.user.name}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  likePhoto: (id) => dispatch(likePhoto(id)),
  unLikePhoto: (id) => dispatch(unLikePhoto(id)),
  setRedirectUrl: (url) => dispatch(setRedirectUrl(url)),
});

const PhotoTabWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoTab);

const PhotoTabWithRouter = withRouter(PhotoTabWithRedux);

export { PhotoTabWithRouter as PhotoTab };
