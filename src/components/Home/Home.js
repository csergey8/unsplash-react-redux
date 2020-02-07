import React, { useEffect } from 'react';
import { HomeSearch } from './HomeSearch';
import { connect } from 'react-redux';
import { getRandomPhotos, clearPhotos } from '../../redux/photos';
import { PhotosGrid } from '../PhotosGrid';
import { Loader } from '../Loader';
import { Route, withRouter } from "react-router-dom";
import { Photo } from '../Photo';



const Home = (props) => {
    useEffect(() => {
        props.getRandomPhotos();
        return () => props.clearPhotos()
    }, [null])
    console.log(props)
    const modalCloseHandler = () => {
        props.history.push(props.match.url);
    }
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
            <Route path={`f/:id`} render={() => <Photo onClose={modalCloseHandler} />} />
        </div>
    )
}

const mapStateToProps = state => ({
    photos: state.photosReducer.photos,
})

const mapDispatchToProps = dispatch => ({
    getRandomPhotos: () => dispatch(getRandomPhotos()),
    clearPhotos: () => dispatch(clearPhotos())
})

const HomeWithRouter = withRouter(Home)

const HomeWithRedux = connect(mapStateToProps, mapDispatchToProps)(HomeWithRouter)


export { HomeWithRedux as Home }
