import React, { useEffect, useState } from 'react'
import { Typography, Table } from 'antd'
import { getListBook } from '../../../store/book/actions'
import { useDispatch, useSelector } from 'react-redux'
import columns from './columns'
import { ITEM_PER_PAGE } from '../../../shared/constants'

const { Title } = Typography

const List = () => {
  const dispatch = useDispatch()
  const bookListReducer = useSelector(state => state.book.list)

  const [page, setPage] = useState(0)

  useEffect(() => {
    dispatch(getListBook({ page }))
  }, [page])

  function onTableChange (paginationChanged) {
    setPage(paginationChanged.current)
  }

  return (
    <>
      <Title level={4}>Books</Title>
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
      />
    </>
  )
}
export default List
