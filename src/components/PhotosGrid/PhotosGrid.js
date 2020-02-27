import React from 'react';
import { PhotoTab } from '../PhotoTab';
import styles from './PhotosGrid.module.scss';

const PhotosGrid = ({ photos }) => {
    const column1 = photos.filter((x, i) => i % 3 === 0);
    const column2 = photos.filter((x, i) => i % 3 === 1);
    const column3 = photos.filter((x, i) => i % 3 === 2);
    return (
        <div className={styles.PhotosGrid_container}>
            <div>
                {column1.map((photo, i) => <PhotoTab key={i} photo={photo} />)}
            </div>
            <div>
                {column2.map((photo, i) => <PhotoTab key={i} photo={photo} />)}
            </div>
            <div>
                 {column3.map((photo, i) => <PhotoTab key={i} photo={photo} />)}
            </div>
        </div>
    )
}

export { PhotosGrid }