let options = {
  headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
  }
}

const createOptions = (state, method = 'GET') => {
  const { authReducer: { token } } = state();
  const authorization = token ? `Bearer ${token}` : `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
  return {
    headers: {
      Authorization: authorization
    },
    method
  }
}

export { createOptions }
