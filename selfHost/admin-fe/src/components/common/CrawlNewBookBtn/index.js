import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { crawlNewBooks, getStatusCrawlNewBooksStatus } from '../../../store/crawl/actions'
import { CRAWL_STATUS_COMPLETED, CRAWL_STATUS_CRAWLING } from '../../../shared/constants'

const CrawlNewBookBtn = () => {
  const dispatch = useDispatch()
  const crawlNewBooksReducer = useSelector(state => state.crawl.crawlNewBooks)
  const getStatusCrawlNewBooksReducer = useSelector(state => state.crawl.getStatusCrawlNewBooks)
  const [intervalID, setIntervalID] = useState(0)

  useEffect(() => {
    dispatch(getStatusCrawlNewBooksStatus())
  }, [])

  useEffect(() => {
    const { loading, data } = getStatusCrawlNewBooksReducer
    if (!loading && data?.crawlStatus === CRAWL_STATUS_COMPLETED) {
      clearInterval(intervalID)
    }
    if (data?.crawlStatus === CRAWL_STATUS_CRAWLING) {
      clearInterval(intervalID)
      const newIntervalID = setInterval(() => {
        dispatch(getStatusCrawlNewBooksStatus())
      }, 3000)
      setIntervalID(newIntervalID)
    }
  }, [getStatusCrawlNewBooksReducer])

  function crawl() {
    dispatch(crawlNewBooks())
  }

  const isLoading =
    crawlNewBooksReducer.loading ||
    getStatusCrawlNewBooksReducer.loading ||
    getStatusCrawlNewBooksReducer.data?.crawlStatus === CRAWL_STATUS_CRAWLING

  return (
    <Button className="crawl-new-book-ttv" loading={isLoading} onClick={crawl}>
      Crawl new books
    </Button>
  )
}

export default CrawlNewBookBtn
