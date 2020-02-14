import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { crawlNewBooksTTV, getStatusCrawlNewBooksTTVStatus } from '../../../store/crawl/actions'
import { CRAWL_STATUS_COMPLETED, CRAWL_STATUS_CRAWLING } from '../../../shared/constants'

const CrawlNewBookTTVBtn = () => {
  const dispatch = useDispatch()
  const crawlNewBooksTTVReducer = useSelector(state => state.crawl.crawlNewBooksTTV)
  const getStatusCrawlNewBooksTTVReducer = useSelector(state => state.crawl.getStatusCrawlNewBooksTTV)
  const [intervalID, setIntervalID] = useState(0)

  useEffect(() => {
    dispatch(getStatusCrawlNewBooksTTVStatus())
  }, [])

  useEffect(() => {
    const { loading, data } = getStatusCrawlNewBooksTTVReducer
    if (!loading && data?.crawlStatus === CRAWL_STATUS_COMPLETED) {
      clearInterval(intervalID)
    }
    if (data?.crawlStatus === CRAWL_STATUS_CRAWLING) {
      clearInterval(intervalID)
      const newIntervalID = setInterval(() => {
        dispatch(getStatusCrawlNewBooksTTVStatus())
      }, 3000)
      setIntervalID(newIntervalID)
    }
  }, [getStatusCrawlNewBooksTTVReducer])

  function crawl () {
    dispatch(crawlNewBooksTTV())
  }

  const isLoading = (
    crawlNewBooksTTVReducer.loading
    || getStatusCrawlNewBooksTTVReducer.loading
    || getStatusCrawlNewBooksTTVReducer.data?.crawlStatus === CRAWL_STATUS_CRAWLING
  )

  return (
    <Button
      className="crawl-new-book-ttv"
      loading={isLoading}
      onClick={crawl}
    >
      Crawl new book TTV
    </Button>
  )
}

export default CrawlNewBookTTVBtn
