const types = {
    SET_PHOTOS: 'SET_PHOTOS',
    CLEAR_PHOTOS: 'CLEAR_PHOTOS',
    SET_PHOTO: 'SET_PHOTO',
    CLEAR_PHOTO: 'CLEAR_PHOTO',
    LIKE_PHOTO: 'LIKE_PHOTO',
    SET_RANDOM_PHOTO: 'SET_RANDOM_PHOTO',
    LOAD_MORE_PHOTOS: 'LOAD_MORE_PHOTOS',
    SET_SEARCH_TEXT: 'SET_SEARCH_TEXT'
}

const searchPhotosUri = `https://api.unsplash.com/search/photos`;
const searchRandomPhotoUri = `https://api.unsplash.com/photos?page=`;

let options = {
    headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    }
}

const initialState = {
    photos: null,
    photo: null,
    randomPhoto: null,
    photosPage: 1,
    searchText: ''
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
            return {
                ...state
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

export const searchPhotos = (text) => async (dispatch, getState) => {
    const { authReducer: { token } } = getState();
    const { photosReducer: { photosPage } } = getState();
    if(token){
        options = {
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}` 
            }
        }
    }
    const data = await fetch(searchPhotosUri + `?page=1&query=${text}`, options);
    const { results } = await data.json();
    dispatch(setSearchText(text))
    dispatch(setPhotos(results));
}

export const likePhoto = (id) => async (dispatch, getState) => {
    const { authReducer: { token } } = getState();
    const { photosReducer: { photos, photo } } = getState();
    const optionsWithToken = {
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}` 
        },
        method: 'POST'
    }
    const likePhotoUri = `https://api.unsplash.com/photos/${id}/like`
    const data = await fetch(likePhotoUri, optionsWithToken);
    const photoData = await data.json();
    if(photo){
        if(photo.id == photoData.photo.id){
            dispatch(setPhoto({...photo, ...photoData.photo}))
        }
    }
    const newPhotos = photos.map(photoItem => photoItem.id === photoData.photo.id ? {...photoItem, ...photoData.photo} : photoItem)
    dispatch(setPhotos(newPhotos))
}

export const unLikePhoto = (id) => async (dispatch, getState) => {
    const { authReducer: { token } } = getState();
    const { photosReducer: { photos, photo } } = getState();
    const optionsWithToken = {
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}` 
        },
        method: 'DELETE'
    }
    const likePhotoUri = `https://api.unsplash.com/photos/${id}/like`
    const data = await fetch(likePhotoUri, optionsWithToken);
    const photoData = await data.json();
    const newPhotos = photos.map(photoItem => photoItem.id === photoData.photo.id ? {...photoItem, ...photoData.photo} : photoItem);
    if(photo){
        if(photo.id == photoData.photo.id){
            dispatch(setPhoto({...photo, ...photoData.photo}))
        }
    }
    
    dispatch(setPhotos(newPhotos))
}

export const getPhoto = (id) => async (dispatch, getState) => {
    const { authReducer: { token } } = getState();
    
    if(token){
        options = {
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}` 
            }
        }
    }
    const getPhotoUri = `https://api.unsplash.com/photos/${id}`;
    const data = await fetch(getPhotoUri, options);
    const photo = await data.json();
    dispatch(setPhoto(photo))
}

export const getRandomPhotos = () => async (dispatch, getState) => {
    const { authReducer: { token } } = getState();
    const { photosReducer: { photosPage } } = getState();
    if(token){
        options = {
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}` 
            }
        }
    }
    const data = await fetch(searchRandomPhotoUri + photosPage, options);
    const results  = await data.json();
    const photo = results.shift();
    dispatch(setRandomPhoto(photo))
    dispatch(setPhotos(results));
}

export const loadMoreRandomPhotos = () => async (dispatch, getState) => {
    const { authReducer: { token } } = getState();
    const { photosReducer: { photosPage } } = getState();
    if(token){
        options = {
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}` 
            }
        }
    }
    const data = await fetch(searchRandomPhotoUri + photosPage, options);
    const results  = await data.json();
    dispatch(loadMorePhotos(results));
}

export const loadMoreSearchPhotos = () => async (dispatch, getState) => {
    const { authReducer: { token } } = getState();
    const { photosReducer: { photosPage, searchText } } = getState();
    if(token){
        options = {
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}` 
            }
        }
    }

    const data = await fetch(searchPhotosUri + `?page=${photosPage}&query=${searchText}`, options);
    const { results } = await data.json();
    dispatch(loadMorePhotos(results));
}