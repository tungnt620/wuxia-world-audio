import * as actionTypes from './actionTypes'
import ActionBase from '../../shared/ActionBase'
import { API_SUCCESS } from '../../shared/constants'

const listAction = new ActionBase(actionTypes.LIST_BOOK)
const detailAction = new ActionBase(actionTypes.BOOK_DETAIL)

export const resetListBook = () => listAction.reset()

export const getListBook = (params) => {
  return listAction.makeAction({
    url: '/api/book',
    method: 'get',
    requestData: params,
  })
}

export const resetDetailBook = () => detailAction.reset()

export const updateBook = (id, params, callback) => {
  return detailAction.makeAction({
    url: `/api/book/${id}`,
    method: 'post',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      const { code, data, msg } = respData

      if (code === API_SUCCESS) {
        dispatch(detailAction.success({ data }))
        dispatch({
          type: actionTypes.LIST_BOOK.custom('update_items'),
          payload: {
            items: [{ id, ...params }]
          }
        })
      } else {
        dispatch(detailAction.fail({ error: msg }))
      }
      if (callback) callback()
    }
  })
}

export const getBook = (id, callback) => {
  return detailAction.makeAction({
    url: `/api/book/${id}`,
    method: 'get',
    onRequestSuccessCallback: (dispatch, respData) => {
      const { code, data, msg } = respData

      if (code === API_SUCCESS) {
        dispatch(detailAction.success({ data }))
        dispatch({
          type: actionTypes.LIST_BOOK.custom('update_items'),
          payload: {
            items: [data]
          }
        })
      } else {
        dispatch(detailAction.fail({ error: msg }))
      }
      if (callback) callback()
    }
  })
}
