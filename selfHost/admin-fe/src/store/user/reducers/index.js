import ReducerBase from '../../../shared/ReducerBase'
import * as actionTypes from '../actionTypes'

const login = new ReducerBase(actionTypes.AUTH)
const info = new ReducerBase(actionTypes.GET_USER_INFO)

const initialState = {
  login: login.initialState,
  info: info.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    login: login.reducer(state.login, action),
    info: info.reducer(state.info, action),
  }
}

export default reducer
