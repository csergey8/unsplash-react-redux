import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeSearch } from './HomeSearch';
import {
  getRandomPhotos,
  clearPhotos,
  loadMoreRandomPhotos,
  setIsLoadingMore,
} from '../../redux/photos';
import { PhotosGrid } from '../PhotosGrid';
import { Loader } from '../Loader';
import { Photo } from '../Photo';
import { ButtonLoadMore } from '../Buttons';
import styles from './Home.module.scss';

const Home = ({
  photos,
  getRandomPhotos,
  clearPhotos,
  history,
  match,
  loadMore,
  randomPhoto,
}) => {
  useEffect(() => {
    getRandomPhotos();
    return () => clearPhotos();
  }, []);
  const modalCloseHandler = () => {
    history.push(match.url);
  };
  return (
    <div>
      {photos ? (
        <>
          <HomeSearch photo={randomPhoto} />
          <PhotosGrid photos={photos} />
          <div className={styles.Home_buttonContainer}>
            <ButtonLoadMore loadMore={loadMore} />
          </div>
        </>
      ) : (
        <Loader />
      )}
      <Route
        path={`${match.url}/:id`}
        render={() => <Photo onClose={modalCloseHandler} />}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photosReducer.photos,
  randomPhoto: state.photosReducer.randomPhoto,
  isLoading: state.photosReducer.isLoadingMore,
});

const mapDispatchToProps = (dispatch) => ({
  getRandomPhotos: () => dispatch(getRandomPhotos()),
  clearPhotos: () => dispatch(clearPhotos()),
  loadMore: () => dispatch(loadMoreRandomPhotos()),
  setIsLoading: (bool) => dispatch(setIsLoadingMore(bool)),
});

const HomeWithRouter = withRouter(Home);

const HomeWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeWithRouter);

export { HomeWithRedux as Home };
