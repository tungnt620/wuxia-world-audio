import * as actionTypes from './actionTypes'
import ActionBase from '../../shared/ActionBase'
import { API_SUCCESS, CRAWL_STATUS_COMPLETED, CRAWL_STATUS_CRAWLING } from '../../shared/constants'

const crawlNewBookTTVAction = new ActionBase(actionTypes.CRAWl_NEW_BOOKS_TTV)

export const resetCrawlNewBooksTTV = () => crawlNewBookTTVAction.reset()

export const crawlNewBooksTTV = (params) => {
  return crawlNewBookTTVAction.makeAction({
    url: '/api/crawl/new_ttv_book',
    method: 'post',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      const { code, data, msg } = respData

      if (code === API_SUCCESS) {
        dispatch(crawlNewBookTTVAction.success({ data }))
        dispatch(getStatusCrawlNewBooksTTVStatus())
      } else {
        dispatch(crawlNewBookTTVAction.fail({ error: msg }))
      }
    }
  })
}

const getStatusCrawlNewBooksTTVAction = new ActionBase(actionTypes.GET_STATUS_CRAWl_NEW_BOOK_TTV)

export const resetGetStatusCrawlNewBooksTTV = () => getStatusCrawlNewBooksTTVAction.reset()

export const getStatusCrawlNewBooksTTVStatus = (params) => {
  return getStatusCrawlNewBooksTTVAction.makeAction({
    url: '/api/crawl/new_ttv_book/get-status',
    method: 'get',
    requestData: params,
  })
}

const crawBookTTVAction = new ActionBase(actionTypes.CRAWl_BOOK_TTV)

export const resetCrawlBookTTV = () => crawBookTTVAction.reset()

export const crawlBookTTV = (params, successCallback) => {
  return crawBookTTVAction.makeAction({
    url: '/api/crawl/ttv_book',
    method: 'post',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      getStatusCrawlBookTTVAction.defaultOnRequestSuccessCallback(dispatch, respData)
      if (successCallback) successCallback()
    }
  })
}

const getStatusCrawlBookTTVAction = new ActionBase(actionTypes.GET_STATUS_CRAWl_BOOK_TTV)

export const resetGetStatusCrawlBookTTV = () => getStatusCrawlBookTTVAction.reset()

export const getStatusCrawlBookTTVStatus = (params, successCallback) => {
  return getStatusCrawlBookTTVAction.makeAction({
    url: '/api/crawl/ttv_book/get-status',
    method: 'get',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      getStatusCrawlBookTTVAction.defaultOnRequestSuccessCallback(dispatch, respData)
      const { code, data } = respData
      if (code === API_SUCCESS) {
        if (successCallback) successCallback(data?.crawlStatus === CRAWL_STATUS_CRAWLING)
      }
    }
  })
}

const crawChapterTTVAction = new ActionBase(actionTypes.CRAWl_CHAPTER_TTV)

export const resetCrawlChapterTTV = () => crawChapterTTVAction.reset()

export const crawlChapterTTV = (params, successCallback) => {
  return crawChapterTTVAction.makeAction({
    url: '/api/crawl/ttv_chapter',
    method: 'post',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      crawChapterTTVAction.defaultOnRequestSuccessCallback(dispatch, respData)
      if (successCallback) successCallback()
    }
  })
}

const getStatusCrawlChapterTTVAction = new ActionBase(actionTypes.GET_STATUS_CRAWl_CHAPTER_TTV)

export const resetGetStatusCrawlChapterTTV = () => getStatusCrawlChapterTTVAction.reset()

export const getStatusCrawlChapterTTVStatus = (params, successCallback) => {
  return getStatusCrawlChapterTTVAction.makeAction({
    url: '/api/crawl/ttv_chapter/get-status',
    method: 'get',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      getStatusCrawlChapterTTVAction.defaultOnRequestSuccessCallback(dispatch, respData)
      const { code, data } = respData
      if (code === API_SUCCESS) {
        if (successCallback) successCallback(data?.crawlStatus === CRAWL_STATUS_CRAWLING)
      }
    }
  })
}

const crawlAllBookDetailTTVAction = new ActionBase(actionTypes.CRAWl_ALL_BOOK_DETAIL_TTV)

export const resetCrawlAllBookDetailTTV = () => crawlAllBookDetailTTVAction.reset()

export const crawlAllBookDetailTTV = (params) => {
  return crawlAllBookDetailTTVAction.makeAction({
    url: '/api/crawl_all_book',
    method: 'post',
    requestData: params,
  })
}
