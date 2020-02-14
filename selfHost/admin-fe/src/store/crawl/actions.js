import * as actionTypes from './actionTypes'
import ActionBase from '../../shared/ActionBase'
import { API_SUCCESS } from '../../shared/constants'

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

export const crawlBookTTV = (params) => {
  return crawBookTTVAction.makeAction({
    url: '/api/crawl/ttv_book',
    method: 'post',
    requestData: params,
  })
}

const crawChapterTTVAction = new ActionBase(actionTypes.CRAWl_CHAPTER_TTV)

export const resetCrawlChapterTTV = () => crawChapterTTVAction.reset()

export const crawlChapterTTV = (params) => {
  return crawChapterTTVAction.makeAction({
    url: '/api/crawl/ttv_chapter',
    method: 'post',
    requestData: params,
  })
}
