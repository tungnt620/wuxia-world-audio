import React, { useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import {
  crawlBookTTV,
  getStatusCrawlBookTTVStatus,
} from '../../../../../store/crawl/actions'

const CrawlTTVBookBtn = ({ record }) => {
  const dispatch = useDispatch()
  const [isGetStatus, setIsGetStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [crawling, setCrawling] = useState(false)

  const onClick = () => {
    if (isGetStatus) {
      setLoading(true)
      const bookID = record.id
      dispatch(crawlBookTTV(
        {
          id: bookID,
          book_url: `https://truyen.tangthuvien.vn/doc-truyen/${record.source_id}`
        },
        () => {
          setLoading(false)
          setCrawling(false)
        }
      ))
      setIsGetStatus(false)
    } else {
      getCrawlStatus()
    }
  }

  const getCrawlStatus = () => {
    setLoading(true)
    dispatch(getStatusCrawlBookTTVStatus({
      id: record.id,
    }, (isWaiting) => {
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
    }))
  }

  return (
    <>
      <Button
        onClick={onClick}
        loading={loading}
      >
        Book:
        {
          crawling ? ' Crawling' : (isGetStatus ? ' Crawl' : ' Get status')
        }
      </Button>
    </>
  )
}
export default CrawlTTVBookBtn
