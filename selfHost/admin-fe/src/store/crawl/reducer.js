import ReducerBase from '../../shared/ReducerBase'
import * as actionTypes from './actionTypes'

const crawlNewBooksTTV = new ReducerBase(actionTypes.CRAWl_NEW_BOOKS_TTV)
const getStatusCrawlNewBooksTTV = new ReducerBase(actionTypes.GET_STATUS_CRAWl_NEW_BOOK_TTV)
const crawlBookTTV = new ReducerBase(actionTypes.CRAWl_BOOK_TTV)
const crawlChapterTTV = new ReducerBase(actionTypes.CRAWl_CHAPTER_TTV)
const crawlAllBookDetailTTV = new ReducerBase(actionTypes.CRAWl_ALL_BOOK_DETAIL_TTV)

const initialState = {
  crawlNewBooksTTV: crawlNewBooksTTV.initialState,
  getStatusCrawlNewBooksTTV: getStatusCrawlNewBooksTTV.initialState,
  crawlBookTTV: crawlBookTTV.initialState,
  crawlChapterTTV: crawlChapterTTV.initialState,
  crawlAllBookDetailTTV: crawlAllBookDetailTTV.initialState,
}

const reducer = (state = initialState, action) => {
  return {
    ...state,
    crawlNewBooksTTV: crawlNewBooksTTV.reducer(state.crawlNewBooksTTV, action),
    getStatusCrawlNewBooksTTV: getStatusCrawlNewBooksTTV.reducer(state.getStatusCrawlNewBooksTTV, action),
    crawlBookTTV: crawlBookTTV.reducer(state.crawlBookTTV, action),
    crawlChapterTTV: crawlChapterTTV.reducer(state.crawlChapterTTV, action),
    crawlAllBookDetailTTV: crawlAllBookDetailTTV.reducer(state.crawlAllBookDetailTTV, action),
  }
}

export default reducer
