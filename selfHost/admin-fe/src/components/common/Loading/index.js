import React from 'react'
import { Spin } from 'antd'

const Loading = () => {
  return (
    <Spin tip="Loading...">
      <div style={{ width: '100%', height: 50 }}/>
    </Spin>
  )
}

export default Loading
