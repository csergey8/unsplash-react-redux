const types = {
    SET_PHOTOS: 'SET_PHOTOS',
    CLEAR_PHOTOS: 'CLEAR_PHOTOS',
    LIKE_PHOTO: 'LIKE_PHOTO'
}

const searchPhotosUri = `https://api.unsplash.com/search/photos?page=1&query=`;

const options = {
    headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    }
}

const initialState = {
    photos: null
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
                photos: null
            }
        case types.LIKE_PHOTO:
            return {
                ...state
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

export const likePhotoAction = (photo) => ({
    type: types.LIKE_PHOTO,
    payload: photo
})

export const searchPhotos = (text) => async (dispatch, getState) => {
    const result = await fetch(searchPhotosUri + text, options);
    const { results } = await result.json();
    dispatch(setPhotos(results));
}

export const likePhoto = (id) => async (dispatch, getState) => {
    const { authReducer: { token } } = getState();
    const { photosReducer: { photos } } = getState();
    const optionsWithToken = {
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}` 
        },
        method: 'POST'
    }
    const likePhotoUri = `https://api.unsplash.com/photos/${id}/like`
    const result = await fetch(likePhotoUri, optionsWithToken);
    const photo = await result.json();
    console.log(photo)
    const newPhotos = photos.map(photoItem => photoItem.id === photo.photo.id ? {...photoItem, ...photo.photo} : photoItem)
    console.log(newPhotos)
    dispatch(setPhotos(newPhotos))
}