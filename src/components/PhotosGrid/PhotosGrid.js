import React from 'react';
import { PhotoTab } from '../PhotoTab';
import styles from './PhotosGrid.module.scss';

const PhotosGrid = ({ photos }) => {
    return (
        <div className={styles.PhotosGrid_container}>
            {photos.map((photo, i) => <PhotoTab key={i} photo={photo} />)}
        </div>
    )
}

export { PhotosGrid }