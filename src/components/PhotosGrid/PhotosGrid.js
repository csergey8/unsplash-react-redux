import React from 'react';
import { PhotoTab } from '../PhotoTab';
import styles from './PhotosGrid.module.scss';

const PhotosGrid = ({ photos }) => {
    return (
        <div className={styles.photosGridContainer}>
            {photos.map(photo => <PhotoTab photo={photo} />)}
        </div>
    )
}

export { PhotosGrid }