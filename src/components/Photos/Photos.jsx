/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { PhotosGrid } from '../PhotosGrid';
import {
  searchPhotos,
  clearPhotos,
  loadMoreSearchPhotos,
} from '../../redux/photos';
import { Photo } from '../Photo';
import { Loader } from '../Loader';
import styles from './Photos.module.scss';

const Photos = ({
  authProccess,
  searchPhotos,
  match,
  clearPhotos,
  history,
  loadMore,
  photos,
}) => {
  useEffect(() => {
    if (!authProccess) {
      searchPhotos(match.params.text);
    }
    return () => clearPhotos();
  }, [match.params.text, authProccess]);

  const title =
    match.params.text.charAt(0).toUpperCase() + match.params.text.substring(1);

  const modalCloseHandler = () => {
    history.push(match.url);
  };
  return (
    <div className={styles.Photos_container}>
      <h1 className={styles.Photos_title}>{title}</h1>
      {photos ? (
        <PhotosGrid photos={photos} />
      ) : (
        <div className={styles.Loader_container}>
          <Loader />
        </div>
      )}
      <button type="button" onClick={() => loadMore()}>Load more</button>
      <Route
        path={`${match.url}/:id`}
        render={() => <Photo onClose={modalCloseHandler} />}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photosReducer.photos,
  authProccess: state.authReducer.authProccess,
});

const mapDispatchToProps = (dispatch) => ({
  searchPhotos: (text) => dispatch(searchPhotos(text)),
  clearPhotos: () => dispatch(clearPhotos()),
  loadMore: () => dispatch(loadMoreSearchPhotos()),
});

const PhotosWithRedux = connect(mapStateToProps, mapDispatchToProps)(Photos);

export { PhotosWithRedux as Photos };
