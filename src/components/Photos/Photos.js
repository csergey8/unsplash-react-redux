import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Photos.module.scss";
import { PhotosGrid } from "../PhotosGrid";
import { searchPhotos, clearPhotos } from "../../redux/photos";
import { Photo } from '../Photo';
import { Route } from "react-router-dom";
import { Loader } from "../Loader";

const Photos = props => {
  useEffect(() => {
    if (!props.authProccess) {
      props.searchPhotos(props.match.params.text);
    }
    return () => props.clearPhotos()
  }, [props.match.params.text, props.authProccess]);
  const title =
    props.match.params.text.charAt(0).toUpperCase() +
    props.match.params.text.substring(1);

  const modalCloseHandler = () => {
      props.history.push(props.match.url);
  }
  return (
    <div className={styles.photosContainer}>
      <h1>{title}</h1>
      {props.photos ? <PhotosGrid photos={props.photos} /> : (<div className={styles.loaderContainer}><Loader /></div>)}
      <Route path={`${props.match.url}/:id`} render={() => <Photo onClose={modalCloseHandler} />} />
    </div>
  );
};

const mapStateToProps = state => ({
  photos: state.photosReducer.photos,
  authProccess: state.authReducer.authProccess
});

const mapDispatchToProps = dispatch => ({
  searchPhotos: text => dispatch(searchPhotos(text)),
  clearPhotos: () => dispatch(clearPhotos())
});

const PhotosWithRedux = connect(mapStateToProps, mapDispatchToProps)(Photos);

export { PhotosWithRedux as Photos };
