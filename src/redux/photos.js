import { createOptions } from '../utils';

const types = {
    SET_PHOTOS: 'SET_PHOTOS',
    CLEAR_PHOTOS: 'CLEAR_PHOTOS',
    SET_PHOTO: 'SET_PHOTO',
    CLEAR_PHOTO: 'CLEAR_PHOTO',
    LIKE_PHOTO: 'LIKE_PHOTO',
    UN_LIKE_PHOTO: 'UN_LIKE_PHOTO',
    SET_RANDOM_PHOTO: 'SET_RANDOM_PHOTO',
    LOAD_MORE_PHOTOS: 'LOAD_MORE_PHOTOS',
    SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
    SET_IS_LOADING_MODE: 'SET_IS_LOADING_MORE'
}

const searchPhotosUri = `https://api.unsplash.com/search/photos`;
const searchRandomPhotoUri = `https://api.unsplash.com/photos?page=`;

const initialState = {
    photos: null,
    photo: null,
    randomPhoto: null,
    photosPage: 1,
    searchText: '',
    isLoadingMore: false
}

export const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PHOTOS:
            return {
                ...state,
                photos: action.payload
            }
        case types.CLEAR_PHOTOS:
            return {
                ...state,
                photos: null,
                photosPage: 1
            }
        case types.SET_PHOTO:
            return {
                ...state,
                photo: action.payload
            }
        case types.CLEAR_PHOTO:
            return {
                ...state,
                photo: null
            }
        case types.LIKE_PHOTO:
            let { photo } = action.payload
            return {
                ...state,
                photos: state.photos.map(photoItem => photoItem.id === photo.id ? {...photoItem, ...photo} : photoItem)
            }
        case types.UN_LIKE_PHOTO:
            let photoToUnlike = action.payload.photo
            return {
                ...state,
                photos: state.photos.map(photoItem => photoItem.id === photoToUnlike.id ? {...photoItem, ...photoToUnlike} : photoItem)
            }
        case types.SET_RANDOM_PHOTO:
            return {
                ...state,
                randomPhoto: action.payload
            }
        case types.LOAD_MORE_PHOTOS: 
            return {
                ...state,
                photos: [
                    ...state.photos, ...action.payload
                ],
                photosPage: state.photosPage + 1
            }
        case types.SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload
            }
        case types.SET_IS_LOADING_MODE:
            return {
                ...state,
                isLoadingMore: action.payload
            }
        default:
            return state
    }
}

const setPhotos = (photos) => ({
    type: types.SET_PHOTOS,
    payload: photos
});

export const clearPhotos = () => ({
    type: types.CLEAR_PHOTOS
})

const setPhoto = (photo) => ({
    type: types.SET_PHOTO,
    payload: photo
})

export const clearPhoto = () => ({
    type: types.CLEAR_PHOTO
})

export const likePhotoAction = (photo) => ({
    type: types.LIKE_PHOTO,
    payload: photo
})

export const unLikePhotoAction = (photo) => ({
    type: types.UN_LIKE_PHOTO,
    payload: photo
})

export const setRandomPhoto = (photo) => ({
    type: types.SET_RANDOM_PHOTO,
    payload: photo
})

export const loadMorePhotos = (photos) => ({
    type: types.LOAD_MORE_PHOTOS,
    payload: photos
})

export const setSearchText = (text) => ({
    type: types.SET_SEARCH_TEXT,
    payload: text
})

export const setIsLoadingMore = (bool) => ({
    type: types.SET_IS_LOADING_MODE,
    payload: bool
})

export const searchPhotos = (text) => async (dispatch, getState) => {
    const options = createOptions(getState);
    const data = await fetch(searchPhotosUri + `?page=1&query=${text}`, options);
    const { results } = await data.json();
    dispatch(setSearchText(text))
    dispatch(setPhotos(results));
}

export const likePhoto = (id) => async (dispatch, getState) => {
    const { photosReducer: { photo } } = getState();
    const options = createOptions(getState, 'POST');
    const likePhotoUri = `https://api.unsplash.com/photos/${id}/like`
    const data = await fetch(likePhotoUri, options);
    const photoData = await data.json();
    if(photo && photo.id == photoData.photo.id){
        dispatch(setPhoto({...photo, ...photoData.photo}))
    }
    dispatch(likePhotoAction(photoData))
}

export const unLikePhoto = (id) => async (dispatch, getState) => {
    const { photosReducer: { photo } } = getState();
    const options = createOptions(getState, 'DELETE');
    const likePhotoUri = `https://api.unsplash.com/photos/${id}/like`
    const data = await fetch(likePhotoUri, options);
    const photoData = await data.json();
    if(photo && photo.id == photoData.photo.id){
        dispatch(setPhoto({...photo, ...photoData.photo}))
    }
    dispatch(unLikePhotoAction(photoData))
}

export const getPhoto = (id) => async (dispatch, getState) => {
    const options = createOptions(getState);
    const getPhotoUri = `https://api.unsplash.com/photos/${id}`;
    const data = await fetch(getPhotoUri, options);
    const photo = await data.json();
    dispatch(setPhoto(photo))
}

export const getRandomPhotos = () => async (dispatch, getState) => {
    const { photosReducer: { photosPage } } = getState();
    const options = createOptions(getState);
    const data = await fetch(searchRandomPhotoUri + photosPage, options);
    const results  = await data.json();
    const photo = results.shift();
    dispatch(setRandomPhoto(photo))
    dispatch(setPhotos(results));
}

export const loadMoreRandomPhotos = () => async (dispatch, getState) => {
    const { photosReducer: { photosPage } } = getState();
    const options = createOptions(getState);
    const data = await fetch(searchRandomPhotoUri + photosPage, options);
    const results  = await data.json();
    dispatch(loadMorePhotos(results));
}

export const loadMoreSearchPhotos = () => async (dispatch, getState) => {
    const { photosReducer: { photosPage, searchText } } = getState();
    const options = createOptions(getState);
    const data = await fetch(searchPhotosUri + `?page=${photosPage}&query=${searchText}`, options);
    const { results } = await data.json();
    dispatch(loadMorePhotos(results));
}