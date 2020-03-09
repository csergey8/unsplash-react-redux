import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { PhotoTab } from '../PhotoTab';
import styles from './PhotosGrid.module.scss';





const PhotosGrid = ({ photos }) => {
  const column1 = photos.filter((x, i) => i % 3 === 0);
  const column2 = photos.filter((x, i) => i % 3 === 1);
  const column3 = photos.filter((x, i) => i % 3 === 2);

  const Row = (props) => {
    console.log(props)
  
    return (
      <div style={props.style}>
      <PhotoTab photo={column1[props.index]} /> 
    </div>
    )
  }
  return (
    // <div className={styles.PhotosGrid_container}>
      // <div>
      <div>
          {/* <List
            height={150}
            itemCount={column1.length}
            itemSize={35}
            width={500}
          >
            {Row}
          </List> */}
          {photos.map(photo => (<PhotoTab photo={photo} />))}
        </div>
        // column1.map((photo) => (
          //<PhotoTab key={photo.id} photo={photo} />
        //))}
      //</div>
      // <div>
      //   {column2.map((photo) => (
      //     <PhotoTab key={photo.id} photo={photo} />
      //   ))}
      // </div>
      // <div>
      //   {column3.map((photo) => (
      //     <PhotoTab key={photo.id} photo={photo} />
      //   ))}
      // </div>
    // </div>
  )}

export { PhotosGrid };
