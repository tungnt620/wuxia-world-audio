import ReducerBase from '../../shared/ReducerBase'
import * as actionTypes from './actionTypes'

const crawlNewBooks = new ReducerBase(actionTypes.CRAWl_NEW_BOOKS)
const getStatusCrawlNewBooks = new ReducerBase(actionTypes.GET_STATUS_CRAWl_NEW_BOOK)
const crawlBook = new ReducerBase(actionTypes.CRAWl_BOOK)
const crawlChapter = new ReducerBase(actionTypes.CRAWl_CHAPTER)
const crawlAllBookDetail = new ReducerBase(actionTypes.CRAWl_ALL_BOOK_DETAIL)

const initialState = {
  crawlNewBooks: crawlNewBooks.initialState,
  getStatusCrawlNewBooks: getStatusCrawlNewBooks.initialState,
  crawlBook: crawlBook.initialState,
  crawlChapter: crawlChapter.initialState,
  crawlAllBookDetail: crawlAllBookDetail.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    crawlNewBooks: crawlNewBooks.reducer(state.crawlNewBooks, action),
    getStatusCrawlNewBooks: getStatusCrawlNewBooks.reducer(state.getStatusCrawlNewBooks, action),
    crawlBook: crawlBook.reducer(state.crawlBook, action),
    crawlChapter: crawlChapter.reducer(state.crawlChapter, action),
    crawlAllBookDetail: crawlAllBookDetail.reducer(state.crawlAllBookDetail, action),
  }
}

export default reducer
