import * as actionTypes from '../actionTypes'
import ActionBase from '../../../shared/ActionBase'

const crawlNewBookTTVAction = new ActionBase(actionTypes.CRAWl_NEW_BOOK_TTV)

export const resetCrawlNewBookTTV = () => crawlNewBookTTVAction.reset()

export const crawlNewBookTTV = (params) => {
  return crawlNewBookTTVAction.makeAction({
    url: '/api/crawl/new_ttv_book',
    method: 'post',
    requestData: params,
  })
}

const getStatusCrawlNewBookTTVAction = new ActionBase(actionTypes.GET_STATUS_CRAWl_NEW_BOOK_TTV)

export const resetGetStatusCrawlNewBookTTV = () => getStatusCrawlNewBookTTVAction.reset()

export const getStatusCrawlNewBookTTVStatus = (params) => {
  return getStatusCrawlNewBookTTVAction.makeAction({
    url: '/api/crawl/new_ttv_book/get-status',
    method: 'get',
    requestData: params,
  })
}
