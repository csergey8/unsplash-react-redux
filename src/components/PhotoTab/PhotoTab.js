import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { Modal } from '../Modal';
import styles from './PhotoTab.module.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const PhotoTab = ({ photo, match }) => {
    return (
        <div>
        <Link to={`${match.url}/id`}>
        <div className={styles.photoTabContainer}>
            <img src={photo.urls.small} />
            <div className={styles.favoriteAction}>
                <div className={styles.favoriteActionLike}>
                    <FavoriteIcon className={styles.favoriteIcon} />
                </div>
                <div><AddIcon /> Collect</div>
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

const PhotoTabWithRouter = withRouter(PhotoTab)

export { PhotoTabWithRouter as PhotoTab }
