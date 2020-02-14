import React, { useState } from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { crawlBookTTV, crawlChapterTTV } from '../../../../../store/crawl/actions'
import { getBook } from '../../../../../store/book/actions'

const CrawlTTVBookBtn = ({ record }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onClick = () => {
    const bookID = record.id
    setLoading(true)
    dispatch(crawlChapterTTV(
      {
        book_id: bookID,
        book_url: `https://truyen.tangthuvien.vn/doc-truyen/${record.source_id}`,
        chapter_num: 1,
      }
    ))
    setTimeout(() => {
      setLoading(false)
      dispatch(getBook(bookID))
    }, 5000)
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
export default CrawlTTVBookBtn
