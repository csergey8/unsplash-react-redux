import React, { useEffect, useState } from 'react';
import { HomeSearch } from './HomeSearch';
import { connect } from 'react-redux';
import { getRandomPhotos, clearPhotos, loadMoreRandomPhotos, setIsLoadingMore } from '../../redux/photos';
import { PhotosGrid } from '../PhotosGrid';
import { Loader } from '../Loader';
import { Route, withRouter } from "react-router-dom";
import { Photo } from '../Photo';
import { ButtonLoadMore } from '../Buttons';
import styles from './Home.module.scss';




const Home = (props) => {
    
    useEffect(() => {
        props.getRandomPhotos();
        return () => props.clearPhotos()
    }, [])
    const modalCloseHandler = () => {
        props.history.push(props.match.url);
    }

    // window.addEventListener('scroll', (e) => {
    //     console.log(props.isLoading)
    //     if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight){
    //         if(!props.isLoading){
    //             console.log(props.isLoading)
    //             props.setIsLoading(true)
    //             console.log(props.isLoading)
    //             props.loadMore();
    //             // setTimeout(() => {
    //             //     props.setIsLoading(false)
    //             //     console.log(props.isLoading)
    //             // }, 100000)  
    //         }  
    //     }
    // })
    return (
        <div>
            {
                props.photos ? 
                (
                <React.Fragment>
                <HomeSearch photo={props.randomPhoto} />
                <PhotosGrid photos={props.photos} />
                <div className={styles.Home_buttonContainer}>
                <ButtonLoadMore loadMore={props.loadMore} />
                </div>
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
    randomPhoto: state.photosReducer.randomPhoto,
    isLoading: state.photosReducer.isLoadingMore
})

const mapDispatchToProps = dispatch => ({
    getRandomPhotos: () => dispatch(getRandomPhotos()),
    clearPhotos: () => dispatch(clearPhotos()),
    loadMore: () => dispatch(loadMoreRandomPhotos()),
    setIsLoading: (bool) => dispatch(setIsLoadingMore(bool))
})

const HomeWithRouter = withRouter(Home)

const HomeWithRedux = connect(mapStateToProps, mapDispatchToProps)(HomeWithRouter)


export { HomeWithRedux as Home }
