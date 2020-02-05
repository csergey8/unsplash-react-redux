import React, { useEffect } from 'react';
import { HomeSearch } from './HomeSearch';
import { connect } from 'react-redux';
import { getRandomPhotos } from '../../redux/photos';
import { PhotosGrid } from '../PhotosGrid';
import { Loader } from '../Loader';



const Home = (props) => {
    useEffect(() => {
        props.getRandomPhotos()
    }, [null])
    return (
        <div>
            {
                props.photos ? 
                (
                <React.Fragment>
                <HomeSearch photo={props.randomPhoto} />
                <PhotosGrid photos={props.photos} />
                </React.Fragment>
                ) 
                : <Loader />
            }
            Home
            
        </div>
    )
}

const mapStateToProps = state => ({
    photos: state.photosReducer.photos,
    randomPhoto: state.photosReducer.randomPhoto
})

const mapDispatchToProps = dispatch => ({
    getRandomPhotos: () => dispatch(getRandomPhotos())
})

const HomeWithRedux = connect(mapStateToProps, mapDispatchToProps)(Home)


export { HomeWithRedux as Home }
