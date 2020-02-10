import React, { useEffect } from 'react';
import { HomeSearch } from './HomeSearch';
import { connect } from 'react-redux';
import { getRandomPhotos, clearPhotos, loadMoreRandomPhotos } from '../../redux/photos';
import { PhotosGrid } from '../PhotosGrid';
import { Loader } from '../Loader';
import { Route, withRouter } from "react-router-dom";
import { Photo } from '../Photo';



const Home = (props) => {
    useEffect(() => {
        props.getRandomPhotos();
        return () => props.clearPhotos()
    }, [])
    const modalCloseHandler = () => {
        props.history.push(props.match.url);
    }

    window.addEventListener('scroll', (e) => {
        if(window.innerHeight + document.documentElement.scrollTop
            >= document.documentElement.scrollHeight){
                props.loadMore();
            }
    })
    return (
        <div>
            {
                props.photos ? 
                (
                <React.Fragment>
                <HomeSearch photo={props.randomPhoto} />
                <PhotosGrid photos={props.photos} />
                <button onClick={() => props.loadMore()}>load more</button>
                </React.Fragment>
                ) 
                : <Loader />
            }
        <Route path={`${props.match.url}/:id`} render={() => <Photo onClose={modalCloseHandler} />} />
        </div>
    )
}

const mapStateToProps = state => ({
    photos: state.photosReducer.photos,
    randomPhoto: state.photosReducer.randomPhoto
})

const mapDispatchToProps = dispatch => ({
    getRandomPhotos: () => dispatch(getRandomPhotos()),
    clearPhotos: () => dispatch(clearPhotos()),
    loadMore: () => dispatch(loadMoreRandomPhotos())
})

const HomeWithRouter = withRouter(Home)

const HomeWithRedux = connect(mapStateToProps, mapDispatchToProps)(HomeWithRouter)


export { HomeWithRedux as Home }
