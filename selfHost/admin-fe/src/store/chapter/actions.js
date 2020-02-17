import * as actionTypes from './actionTypes'
import ActionBase from '../../shared/ActionBase'
import { API_SUCCESS } from '../../shared/constants'

const listAction = new ActionBase(actionTypes.LIST_CHAPTER)
const detailAction = new ActionBase(actionTypes.CHAPTER_DETAIL)

export const resetListChapter = () => listAction.reset()

export const getListChapter = (params) => {
  return listAction.makeAction({
    url: '/api/chapter',
    method: 'get',
    requestData: params,
  })
}

export const resetDetailChapter = () => detailAction.reset()

export const updateChapter = (id, params, callback) => {
  return detailAction.makeAction({
    url: `/api/chapter/${id}`,
    method: 'post',
    requestData: params,
    onRequestSuccessCallback: (dispatch, respData) => {
      const { code, data, msg } = respData

      if (code === API_SUCCESS) {
        dispatch(detailAction.success({ data }))
        dispatch({
          type: actionTypes.LIST_CHAPTER.custom('update_items'),
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

export const convertAudioChapter = (id, callback) => {
  return detailAction.makeAction({
    url: `/api/convert-audio`,
    method: 'post',
    requestData: { ids: [id] },
    onRequestSuccessCallback: (dispatch, respData) => {
      detailAction.defaultOnRequestSuccessCallback(dispatch, respData)

      const { code, data } = respData
      if (code === API_SUCCESS) {
        dispatch({
          type: actionTypes.LIST_CHAPTER.custom('update_items'),
          payload: {
            items: [{ id, ...data }]
          }
        })
      }
      if (callback) callback()
    }
  })
}

export const getChapter = (id, callback) => {
  return detailAction.makeAction({
    url: `/api/chapter/${id}`,
    method: 'get',
    onRequestSuccessCallback: (dispatch, respData) => {
      const { code, data, msg } = respData

      if (code === API_SUCCESS) {
        dispatch(detailAction.success({ data }))
        dispatch({
          type: actionTypes.LIST_CHAPTER.custom('update_items'),
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
