import React, { useEffect, useState } from 'react'
import { Typography, Table, Input, Button } from 'antd'
import { getListBook } from '../../../store/book/actions'
import { useDispatch, useSelector } from 'react-redux'
import columns from './columns'
import { ITEM_PER_PAGE } from '../../../shared/constants'
import './style.scss'
import { useDebounce } from '../../../shared/hooks'
import { crawlAllBookDetail } from '../../../store/crawl/actions'
import CrawlNewBookBtn from '../../common/CrawlNewBookBtn'

const { Title } = Typography
const { Search } = Input

const List = () => {
  const dispatch = useDispatch()
  const bookListReducer = useSelector(state => state.book.list)
  const crawlAllBookDetailReducer = useSelector(state => state.crawl.crawlAllBookDetail)

  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 400)

  const [page, setPage] = useState(0)
  const [sorter, setSorter] = useState({})

  useEffect(() => {
    dispatch(getListBook({ page, sorter, filter: { name: debouncedSearchText } }))
  }, [page, sorter, debouncedSearchText])

  function onTableChange(pagination, filters, sorter) {
    setPage(pagination.current)
    setSorter({
      order: sorter.order,
      field: sorter.field,
    })
  }

  return (
    <div className={'book-list'}>
      <Title level={4}>Books</Title>
      <div className={'mass-action-on-all-data'}>
        <CrawlNewBookBtn />

        <Button loading={crawlAllBookDetailReducer.loading} onClick={() => dispatch(crawlAllBookDetail())}>
          Crawl all book info
        </Button>
      </div>
      <Search
        className={'search-box'}
        placeholder="Search by book name"
        onSearch={value => setSearchText(value)}
        onChange={e => setSearchText(e.target.value)}
      />
      <Table
        bordered
        loading={bookListReducer.loading}
        onChange={onTableChange}
        size="small"
        columns={columns}
        dataSource={bookListReducer.data?.items}
        rowKey={'id'}
        pagination={{
          current: page,
          pageSize: ITEM_PER_PAGE,
          total: bookListReducer.data?.total,
          size: 'normal',
        }}
        scroll={{
          y: window.innerHeight - 100,
          x: 1500,
          scrollToFirstRowOnChange: true,
        }}
      />
    </div>
  )
}
export default List
