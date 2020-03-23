import React, { useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { crawlChapter, getStatusCrawlChapterStatus } from '../../../../../store/crawl/actions'

const CrawlChaptersBtn = ({ record }) => {
  const dispatch = useDispatch()
  const [isGetStatus, setIsGetStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [crawling, setCrawling] = useState(false)

  const onClick = () => {
    if (isGetStatus) {
      setLoading(true)
      const bookID = record.id

      const chapter_urls = JSON.parse(record.chapter_urls)
      chapter_urls.forEach((chapter_url, index) => {
        dispatch(
          crawlChapter(
            {
              book_id: bookID,
              order_no: index,
              chapter_url: `https://www.wuxiaworld.com${chapter_url}`,
            },
            () => {
              if (index === chapter_urls.length - 1) {
                setCrawling(false)
                setLoading(false)
              }
            },
          ),
        )
      })

      setIsGetStatus(false)
    } else {
      getCrawlStatus()
    }
  }

  const getCrawlStatus = () => {
    setLoading(true)
    dispatch(
      getStatusCrawlChapterStatus(
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
        Chapter:
        {crawling ? ' Crawling' : isGetStatus ? ' Crawl' : ' Get status'}
      </Button>
    </>
  )
}
export default CrawlChaptersBtn
