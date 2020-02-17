import React, { useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import {
  crawlChapterTTV,
  getStatusCrawlChapterTTVStatus
} from '../../../../../store/crawl/actions'

const CrawlTTVChaptersBtn = ({ record }) => {
  const dispatch = useDispatch()
  const [isGetStatus, setIsGetStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [crawling, setCrawling] = useState(false)

  const onClick = () => {
    if (isGetStatus) {
      setLoading(true)
      const bookID = record.id

      dispatch(crawlChapterTTV(
        {
          book_id: bookID,
          book_url: `https://truyen.tangthuvien.vn/doc-truyen/${record.source_id}`,
          chapter_num: 1,
        },
        () => {
          setCrawling(false)
          setLoading(false)
        }
      ))
      setIsGetStatus(false)
    } else {
      getCrawlStatus()
    }
  }

  const getCrawlStatus = () => {
    setLoading(true)
    dispatch(getStatusCrawlChapterTTVStatus({
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
        disabled={crawling}
      >
        Chapter:
        {
          crawling ? ' Crawling' : (isGetStatus ? ' Crawl' : ' Get status')
        }
      </Button>
    </>
  )
}
export default CrawlTTVChaptersBtn
