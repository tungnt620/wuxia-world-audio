import ReducerBase from '../../../shared/ReducerBase'
import * as actionTypes from '../actionTypes'

const crawlNewBookTTV = new ReducerBase(actionTypes.CRAWl_NEW_BOOK_TTV)
const getStatusCrawlNewBookTTV = new ReducerBase(actionTypes.CRAWl_NEW_BOOK_TTV)

const initialState = {
  crawlNewBookTTV: crawlNewBookTTV.initialState,
  getStatusCrawlNewBookTTV: getStatusCrawlNewBookTTV.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    crawlNewBookTTV: crawlNewBookTTV.reducer(state.crawlNewBookTTV, action),
    getStatusCrawlNewBookTTV: getStatusCrawlNewBookTTV.reducer(state.getStatusCrawlNewBookTTV, action),
  }
}

export default reducer
