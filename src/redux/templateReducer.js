const types = {
    INIT_ACTION: 'INIT_ACTION'
}

const initialState = {
    status: false
}


export const templateReducer = (state = initialState, type) => {
    switch(type){
      case types.INIT_ACTION:
        return { 
          ...state,
          status: true
        }
  
      default: 
        return state
    }
  }
  
export const initAction = () => ({
    type: types.INIT_ACTION
})

export const initThunk = () => async (dispatch, getState) => {
  await setTimeout(() => {
    dispatch(initAction())
  }, 5000)
}

