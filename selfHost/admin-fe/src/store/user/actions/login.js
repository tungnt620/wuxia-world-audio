import * as actionTypes from '../actionTypes'
import axios from 'axios-settings'
import { setGetUserInfo } from './info'
import { LOCALSTORAGE_PREFIX } from '../../../shared/constants'

const LOGIN_URL = `${process.env.REACT_APP_API_BASE_URL}/auth/login/google-oauth2/?next=${process.env.REACT_APP_API_BASE_URL}/auth/redirect/?next=`

const loginSuccess = (token) => {
  return {
    type: actionTypes.AUTH.success(),
    payload: { token },
  }
}

export const loginFail = (resp, path = '') => {
  if (resp && resp.status === 403) {
    window.location.replace(`${LOGIN_URL}${path}`)
  }
  return {
    type: actionTypes.AUTH.fail(),
  }
}

export const logout = () => {
  const path = encodeURIComponent(window.location.origin + window.location.pathname)
  axios({
    method: 'post',
    url: '/auth/logout/',
  }).then(res => {
    if (res.status === 200) {
      window.location.replace(`${LOGIN_URL}${path}`)
    }
  }).catch(err => {
    if (err.response && err.response.status === 403) {
      window.location.replace(`${LOGIN_URL}${path}`)
    }
    console.log(err.toString())
  })

  return {
    type: actionTypes.AUTH.custom('logout'),
  }
}

export const getToken = (path) => {
  return dispatch => {
    axios({
      method: 'post',
      url: '/auth/token/',
    }).then(res => {
      const { token, user } = res.data['data']
      dispatch(loginSuccess(token))
      localStorage.setItem(`${LOCALSTORAGE_PREFIX}Token`, token)
      dispatch(setGetUserInfo({ data: user }))
    }).catch(err => {
      dispatch(loginFail(err.response, path))
    })
  }
}
