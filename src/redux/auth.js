const types = {
    GET_TOKEN: 'GET_TOKEN',
    SET_TOKEN: 'SET_TOKEN',
    INIT_TOKEN: 'INIT_TOKEN',
    AUTH_START: 'AUTH_START',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    SET_AUTH_ERROR: 'SET_AUTH_ERROR',
    AUTH_END: 'AUTH_END',
    LOGOUT: 'LOGOUT',
    SET_REDIRECT_URL: 'SET_REDIRECT_URL'
}

const { REACT_APP_UNSPLASH_ACCESS_KEY, REACT_APP_REDIRECT_URI, REACT_APP_UNSPLASH_SECRET_KEY } = process.env;

const GET_TOKEN_URL = `https://unsplash.com/oauth/token?client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}&client_secret=${REACT_APP_UNSPLASH_SECRET_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&grant_type=authorization_code&code=`

const initialState = {
    token: null,
    isAuth: false,
    authProccess: true,
    authError: null,
    redirectUrl: null 
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
                isAuth: true,
                authProccess: false
            }
        case types.AUTH_START:
            return {
                ...state,
                authError: null,
                authProccess: true
            }
        case types.AUTH_END:
            return {
                ...state,
                authProccess: false
            }
        case types.SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.payload,
                authProccess: false
            }
        case types.LOGOUT:
            return {
                ...state,
                authProccess: false,
                token: null,
                isAuth: false
            }
        case types.SET_REDIRECT_URL:
            console.log(action.payload)
            return {
                ...state,
                redirectUrl: action.payload
            }
        default:
            return state
    }
}

const setToken = (token) => ({
    type: types.SET_TOKEN,
    payload: token
})

export const authStart = () => ({
    type: types.AUTH_START
})

export const authEnd = () => ({
    type: types.AUTH_END
})

export const setAuthError = (error) => ({
    type: types.SET_AUTH_ERROR,
})

export const logOut = () => {
    localStorage.removeItem('REACT_APP_UNSPLASH');
    return {
        type: types.LOGOUT
    }
}

export const setRedirectUrl = (url) => {
    localStorage.setItem('REACT_APP_UNSPLASH_REDIRECT_URL', url)
    return {
        type: types.SET_REDIRECT_URL,
        payload: url
    }
}
    

export const getToken = (code) => async (dispatch) => {
    const response = await fetch(GET_TOKEN_URL + code, { method: 'POST' });
    if(!response.ok){
        dispatch(authEnd())
        dispatch(setAuthError('Auth Error'))
    } else {
        const { access_token } = await response.json();
        localStorage.setItem('REACT_APP_UNSPLASH', access_token)
        dispatch(setToken(access_token))
    }  
} 

export const initToken = () => async (dispatch) => {
    dispatch(authStart())
    const token = localStorage.getItem('REACT_APP_UNSPLASH');
    if(token){
        dispatch(setToken(token))
        dispatch(authEnd());
    }
 dispatch(authEnd())
}