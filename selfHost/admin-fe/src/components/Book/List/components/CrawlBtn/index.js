import React, { useState } from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { updateBook } from '../../../../../store/book/actions'

const CrawlBtn = ({ record }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    setLoading(true)
    dispatch(updateBook(
      record.id,
      {
        is_public: record.is_public ? 0 : 1
      },
      () => setLoading(false)
      )
    )
  }

  return (
    <>
      <Button
        onClick={onClick}
        loading={loading}
      >
       Crawl
      </Button>
    </>
  )
}
export default CrawlBtn
