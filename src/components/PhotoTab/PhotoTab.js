import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import styles from './PhotoTab.module.scss';
import { connect } from 'react-redux';
import { likePhoto, unLikePhoto } from '../../redux/photos';
import { ButtonLike, ButtonCollect, ButtonDownload } from '../Buttons';

const PhotoTab = ({ photo, match, likePhoto, unLikePhoto, isAuth }) => {
    return (
        // <Link to={`${match.url}/${photo.id}`}>
            <div className={styles.photoTabContainer}>
                <img src={photo.urls.small} />
                <div className={styles.favoriteAction}>
                    <ButtonLike likePhoto={likePhoto} unLikePhoto={unLikePhoto} id={photo.id} likedByUser={photo.liked_by_user} isAuth={isAuth}/>
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
        // </Link>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth
})

const mapDispatchToProps = (dispatch) => ({
    likePhoto: (id) => dispatch(likePhoto(id)),
    unLikePhoto: (id) => dispatch(unLikePhoto(id))
})

const PhotoTabWithRedux = connect(mapStateToProps, mapDispatchToProps)(PhotoTab)

const PhotoTabWithRouter = withRouter(PhotoTabWithRedux)

export { PhotoTabWithRouter as PhotoTab }
