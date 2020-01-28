import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './Photos.module.scss';
import { searchPhotos } from '../../redux/photos';

const Photos = (props) => {
    useEffect(() => {
        props.searchPhotos(props.match.params.text)
    }, [props.match.params.text])
    const title = props.match.params.text.charAt(0).toUpperCase() + props.match.params.text.substring(1)
    return (
        <div className={styles.photosContainer}>
            <h1>{title}</h1>   
            { props.photos ? props.photos.map(photo => <img src={photo.urls.small} />) : null}   
        </div>
    )
}

const mapStateToProps = (state) => ({
    photos: state.photosReducer.photos
})

const mapDispatchToProps = (dispatch) => ({
    searchPhotos: (text) => dispatch(searchPhotos(text)) 
})

const PhotosWithRedux = connect(mapStateToProps, mapDispatchToProps)(Photos)

export { PhotosWithRedux as Photos }
