import * as actionTypes from './actionTypes'
import ActionBase from '../../shared/ActionBase'
import {
  API_SUCCESS,
  CRAWL_STATUS_CRAWLING,
  CRAWL_TYPE_BOOK,
  CRAWL_TYPE_CHAPTER,
  CRAWL_TYPE_NEW_BOOK,
} from '../../shared/constants'

const crawlNewBookAction = new ActionBase(actionTypes.CRAWl_NEW_BOOKS)

export const resetCrawlNewBooks = () => crawlNewBookAction.reset()

export const crawlNewBooks = params => {
  return crawlNewBookAction.makeAction({
    url: `/api/crawl/${CRAWL_TYPE_NEW_BOOK}`,
    method: 'post',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      const { code, data, msg } = respData

      if (code === API_SUCCESS) {
        dispatch(crawlNewBookAction.success({ data }))
        dispatch(getStatusCrawlNewBooksStatus())
      } else {
        dispatch(crawlNewBookAction.fail({ error: msg }))
      }
    },
  })
}

const getStatusCrawlNewBooksAction = new ActionBase(actionTypes.GET_STATUS_CRAWl_NEW_BOOK)

export const resetGetStatusCrawlNewBooks = () => getStatusCrawlNewBooksAction.reset()

export const getStatusCrawlNewBooksStatus = params => {
  return getStatusCrawlNewBooksAction.makeAction({
    url: `/api/crawl/${CRAWL_TYPE_NEW_BOOK}/get-status`,
    method: 'get',
    requestData: params,
  })
}

const crawBookAction = new ActionBase(actionTypes.CRAWl_BOOK)

export const resetCrawlBook = () => crawBookAction.reset()

export const crawlBook = (params, successCallback) => {
  return crawBookAction.makeAction({
    url: `/api/crawl/${CRAWL_TYPE_BOOK}`,
    method: 'post',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      getStatusCrawlBookAction.defaultOnRequestSuccessCallback(dispatch, respData)
      if (successCallback) successCallback()
    },
  })
}

const getStatusCrawlBookAction = new ActionBase(actionTypes.GET_STATUS_CRAWl_BOOK)

export const resetGetStatusCrawlBook = () => getStatusCrawlBookAction.reset()

export const getStatusCrawlBookStatus = (params, successCallback) => {
  return getStatusCrawlBookAction.makeAction({
    url: `/api/crawl/${CRAWL_TYPE_BOOK}/get-status`,
    method: 'get',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      getStatusCrawlBookAction.defaultOnRequestSuccessCallback(dispatch, respData)
      const { code, data } = respData
      if (code === API_SUCCESS) {
        if (successCallback) successCallback(data?.crawlStatus === CRAWL_STATUS_CRAWLING)
      }
    },
  })
}

const crawChapterAction = new ActionBase(actionTypes.CRAWl_CHAPTER)

export const resetCrawlChapter = () => crawChapterAction.reset()

export const crawlChapter = (params, successCallback) => {
  return crawChapterAction.makeAction({
    url: `/api/crawl/${CRAWL_TYPE_CHAPTER}`,
    method: 'post',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      crawChapterAction.defaultOnRequestSuccessCallback(dispatch, respData)
      if (successCallback) successCallback()
    },
  })
}

const getStatusCrawlChapterAction = new ActionBase(actionTypes.GET_STATUS_CRAWl_CHAPTER)

export const resetGetStatusCrawlChapter = () => getStatusCrawlChapterAction.reset()

export const getStatusCrawlChapterStatus = (params, successCallback) => {
  return getStatusCrawlChapterAction.makeAction({
    url: `/api/crawl/${CRAWL_TYPE_CHAPTER}/get-status`,
    method: 'get',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      getStatusCrawlChapterAction.defaultOnRequestSuccessCallback(dispatch, respData)
      const { code, data } = respData
      if (code === API_SUCCESS) {
        if (successCallback) successCallback(data?.crawlStatus === CRAWL_STATUS_CRAWLING)
      }
    },
  })
}

const crawlAllBookDetailAction = new ActionBase(actionTypes.CRAWl_ALL_BOOK_DETAIL)

export const resetCrawlAllBookDetail = () => crawlAllBookDetailAction.reset()

export const crawlAllBookDetail = params => {
  return crawlAllBookDetailAction.makeAction({
    url: '/api/crawl_all_book',
    method: 'post',
    requestData: params,
  })
}
