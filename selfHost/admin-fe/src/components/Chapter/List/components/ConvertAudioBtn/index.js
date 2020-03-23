import React, { useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { convertAudioChapter } from '../../../../../store/chapter/actions'

const ConvertAudioBtn = ({ record }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    setLoading(true)
    dispatch(
      convertAudioChapter({
        id: record.id,
        callback: () => setLoading(false),
      }),
    )
  }

  return (
    <>
      <Button onClick={onClick} loading={loading}>
        Convert audio
      </Button>
    </>
  )
}
export default ConvertAudioBtn
