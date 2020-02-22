import React, { useState } from 'react'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const ViewChaptersBtn = ({ record }) => {
  const history = useHistory()

  return (
    <>
      <Button onClick={() => history.push(`/chapter/list/?bookID=${record.id}`)}>View chapters</Button>
    </>
  )
}
export default ViewChaptersBtn
