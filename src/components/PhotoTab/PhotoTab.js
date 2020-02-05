import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import styles from './PhotoTab.module.scss';
import { connect } from 'react-redux';
import { likePhoto, unLikePhoto } from '../../redux/photos';
import { setRedirectUrl } from '../../redux/auth';
import { ButtonLike, ButtonCollect, ButtonDownload } from '../Buttons';

const PhotoTab = ({ photo, match, likePhoto, unLikePhoto, isAuth, setRedirectUrl }) => {
    return (
            <div className={styles.photoTabContainer}>
                <Link to={`${match.url}/${photo.id}`} className={styles.photoTabLink}>
                    <img src={photo.urls.small} />
                </Link>
                <div className={styles.favoriteAction}>
                    <ButtonLike setRedirectUrl={setRedirectUrl} likePhoto={likePhoto} unLikePhoto={unLikePhoto} id={photo.id} likedByUser={photo.liked_by_user} isAuth={isAuth}/>
                    <ButtonCollect />
                </div>
                <div className={styles.downloadButton}>
                    <ButtonDownload link={photo.links.download} />
                </div>
                <div className={styles.profileAction}>
                    <img className={styles.profileImage} src={photo.user.profile_image.small} />
                    <div className={styles.profileName}>{photo.user.name}</div>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth
})

const mapDispatchToProps = (dispatch) => ({
    likePhoto: (id) => dispatch(likePhoto(id)),
    unLikePhoto: (id) => dispatch(unLikePhoto(id)),
    setRedirectUrl: (url) => dispatch(setRedirectUrl(url))
})

const PhotoTabWithRedux = connect(mapStateToProps, mapDispatchToProps)(PhotoTab)

const PhotoTabWithRouter = withRouter(PhotoTabWithRedux)

export { PhotoTabWithRouter as PhotoTab }
