import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { Modal } from '../Modal';
import styles from './PhotoTab.module.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { connect } from 'react-redux';
import { likePhoto } from '../../redux/photos';

const PhotoTab = ({ photo, match, likePhoto }) => {
    const favoriteLikeHandler = (e) => {
        e.preventDefault();
        likePhoto(photo.id)
    }
    console.log(photo)
    return (
        <div>
        <Link to={`${match.url}/id`}>
        <div className={styles.photoTabContainer}>
            <img src={photo.urls.small} />
            <div className={styles.favoriteAction}>
                <div className={`${styles.favoriteActionLike} ${photo.liked_by_user ? styles.favoriteActionLiked : ""}`} onClick={favoriteLikeHandler}>
                    <FavoriteIcon className={styles.favoriteIcon} />
                </div>
                    <div className={styles.collectAction}>
                    <AddIcon className={styles.collectionIcon} />
                    <div className={styles.collectionText}>Collect</div>
                </div>
            </div>
            <div>
                <ArrowDownwardIcon />
            </div>
            <div>
                <img src={photo.user.profile_image.small} />
                {photo.user.name}
            </div>
        </div>
        </Link>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    likePhoto: (id) => dispatch(likePhoto(id))
})

const PhotoTabWithRedux = connect(mapStateToProps, mapDispatchToProps)(PhotoTab)

const PhotoTabWithRouter = withRouter(PhotoTabWithRedux)

export { PhotoTabWithRouter as PhotoTab }
