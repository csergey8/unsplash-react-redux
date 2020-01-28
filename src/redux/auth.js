const types = {
    GET_TOKEN: 'GET_TOKEN',
    SET_TOKEN: 'SET_TOKEN',
    INIT_TOKEN: 'INIT_TOKEN',
    AUTH_START: 'AUTH_START',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    SET_AUTH_ERROR: 'SET_AUTH_ERROR',
    AUTH_END: 'AUTH_END'
}

const { REACT_APP_UNSPLASH_ACCESS_KEY, REACT_APP_REDIRECT_URI, REACT_APP_UNSPLASH_SECRET_KEY } = process.env;

const GET_TOKEN_URL = `https://unsplash.com/oauth/token?client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}&client_secret=${REACT_APP_UNSPLASH_SECRET_KEY}&redirect_uri=${REACT_APP_REDIRECT_URI}&grant_type=authorization_code&code=`

const initialState = {
    token: null,
    isAuth: false,
    authProccess: false,
    authError: null 
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
        case types.SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.payload,
                authProccess: false
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

export const getToken = (code) => async (dispatch) => {
    const response = await fetch(GET_TOKEN_URL + code, { method: 'POST' });
    
    if(!response.ok){
        dispatch(authEnd())
        dispatch(setAuthError('Auth Error'))
    } else {
        const { access_token } = await response.json();
        console.log(access_token)
        dispatch(setToken(access_token))
    }
    
} 