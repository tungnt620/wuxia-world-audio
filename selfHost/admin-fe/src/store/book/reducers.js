import ReducerBase from '../../shared/ReducerBase'
import * as actionTypes from './actionTypes'
import ListReducer from './customReducers/ListReducer'

const list = new ListReducer(actionTypes.LIST_BOOK)
const detail = new ReducerBase(actionTypes.BOOK_DETAIL)

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

