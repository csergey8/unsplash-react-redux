import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './Photos.module.scss';
import { PhotosGrid } from '../PhotosGrid';
import { searchPhotos, clearPhotos } from '../../redux/photos';
import { Modal } from '../Modal';
import { Route } from 'react-router-dom';

const Photos = (props) => {
    useEffect(() => {
        props.searchPhotos(props.match.params.text)
        // return () => {
        //     props.clearPhotos();
        // }
    }, [props.match.params.text])
    const title = props.match.params.text.charAt(0).toUpperCase() + props.match.params.text.substring(1)
    return (
        <div className={styles.photosContainer}>
            <h1>{title}</h1>   
            {
                props.photos ? <PhotosGrid photos={props.photos} /> : "Loading"
            }
            <Route path={`${props.match.url}/:id`} render={() => <Modal>Hi</Modal>} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    photos: state.photosReducer.photos
})

const mapDispatchToProps = (dispatch) => ({
    searchPhotos: (text) => dispatch(searchPhotos(text)),
    clearPhotos: () => dispatch(clearPhotos()) 
})

const PhotosWithRedux = connect(mapStateToProps, mapDispatchToProps)(Photos)

export { PhotosWithRedux as Photos }
