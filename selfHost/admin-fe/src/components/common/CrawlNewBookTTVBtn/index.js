import React, { useEffect } from 'react'
import './styles.scss'
import { Button, Icon, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { crawlNewBookTTV, getStatusCrawlNewBookTTVStatus } from '../../../store/crawl/actions/crawlTTV'
import { CRAWL_STATUS_CRAWLING } from '../../../shared/constants'

const CrawlNewBookTTVBtn = () => {
  const dispatch = useDispatch()
  const crawlNewBookTTVReducer = useSelector(state => state.crawl.crawlNewBookTTV)
  const getStatusCrawlNewBookTTVReducer = useSelector(state => state.crawl.getStatusCrawlNewBookTTV)

  useEffect(() => {
    dispatch(getStatusCrawlNewBookTTVStatus())
  }, [])

  function crawl () {
    dispatch(crawlNewBookTTV({
      book_url: 'https://truyen.tangthuvien.vn/doc-truyen/de-ba',
    }))
  }

  const isLoading = (
    crawlNewBookTTVReducer.loading
    || getStatusCrawlNewBookTTVReducer.loading
    || getStatusCrawlNewBookTTVReducer.data?.crawlStatus === CRAWL_STATUS_CRAWLING
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
