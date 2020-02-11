import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from 'store/user/actions/login'

export default function useAuthentication () {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.login.token)

  useEffect(() => {
    if (!token) {
      const path = encodeURIComponent(window.location.origin + window.location.pathname)
      dispatch(getToken(path))
    }
  }, [token])
}
