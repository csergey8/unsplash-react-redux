import { createOptions } from '../utils';

const types = {
  GET_CURRENT_USER_INFO: "GET_CURRENT_USER_INFO"
}

const initialState = {
  currentUser: null
}

const getCurrentUserUri = `https://api.unsplash.com/me`

let options = {
  headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_USER_INFO:
      return {
        ...state,
        currentUser: action.payload
      }
    default: 
      return state
  }
}

export const setCurrentUser = (user) => ({
  type: types.GET_CURRENT_USER_INFO,
  payload: user
})

export const getCurrentUser = () => async (dispatch, getState) => {
  const options = createOptions(getState);
  const results = await fetch(getCurrentUserUri, options);
  const user = await results.json();
  dispatch(setCurrentUser(user))
  console.log(user)
}