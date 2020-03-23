import React, { useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { crawlBook, getStatusCrawlBookStatus } from '../../../../../store/crawl/actions'

const CrawlBookBtn = ({ record }) => {
  const dispatch = useDispatch()
  const [isGetStatus, setIsGetStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [crawling, setCrawling] = useState(false)

  const onClick = () => {
    if (isGetStatus) {
      setLoading(true)
      const bookID = record.id
      dispatch(
        crawlBook(
          {
            id: bookID,
            book_url: `https://www.wuxiaworld.com/novel/${record.source_id}`,
          },
          () => {
            setLoading(false)
            setCrawling(false)
          },
        ),
      )
      setIsGetStatus(false)
    } else {
      getCrawlStatus()
    }
  }

  const getCrawlStatus = () => {
    setLoading(true)
    dispatch(
      getStatusCrawlBookStatus(
        {
          id: record.id,
        },
        isWaiting => {
          setIsGetStatus(true)
          if (isWaiting) {
            setCrawling(true)
            setTimeout(() => {
              getCrawlStatus()
            }, 3000)
          } else {
            setCrawling(false)
          }
          setLoading(false)
        },
      ),
    )
  }

  return (
    <>
      <Button onClick={onClick} loading={loading} disabled={loading || crawling}>
        Book:
        {crawling ? ' Crawling' : isGetStatus ? ' Crawl' : ' Get status'}
      </Button>
    </>
  )
}
export default CrawlBookBtn
