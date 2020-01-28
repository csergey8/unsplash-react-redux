const types = {
    SET_PHOTOS: 'SET_PHOTOS'
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
        default:
            return state
    }
}

const setPhotos = (photos) => ({
    type: types.SET_PHOTOS,
    payload: photos
});

export const searchPhotos = (text) => async (dispatch) => {
    const result = await fetch(searchPhotosUri + text, options);
    const { results } = await result.json();
    console.log(results)
    dispatch(setPhotos(results));
}