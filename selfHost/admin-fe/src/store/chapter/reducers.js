import ReducerBase from '../../shared/ReducerBase'
import * as actionTypes from './actionTypes'
import ListReducer from './customReducers/ListReducer'

const list = new ListReducer(actionTypes.LIST_CHAPTER)
const detail = new ReducerBase(actionTypes.CHAPTER_DETAIL)

const initialState = {
  list: list.initialState,
  detail: detail.initialState,
}

const reducers = (state = initialState, action) => {
  return {
    ...state,
    list: list.reducer(state.list, action),
    detail: detail.reducer(state.detail, action),
  }
}

export default reducers

