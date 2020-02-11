import * as actionTypes from '../actionTypes'
import { loginFail } from './login'
import ActionBase from '../../../shared/ActionBase'

const infoAction = new ActionBase(actionTypes.GET_USER_INFO)

export const resetGetUserInfo = () => infoAction.reset()
export const setGetUserInfo = (payload) => infoAction.success(payload)

export const getUserInfo = (params) => {
  return infoAction.makeAction({
    url: '/api/user/',
    method: 'get',
    requestData: params,
    onRequestFailCallback: (dispatch, err) => {
      const path = encodeURIComponent(window.location.origin + window.location.pathname)
      dispatch(loginFail(err.response, path))
    },
  })
}
