import React, { useEffect, useState } from 'react'
import { Typography, Table, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import columns from './columns'
import { ITEM_PER_PAGE } from '../../../shared/constants'
import { getListChapter } from '../../../store/chapter/actions'
import { useQuery } from '../../../shared/hooks'

const { Title } = Typography

const List = () => {
  const urlQuery = useQuery()
  const dispatch = useDispatch()
  const chapterListReducer = useSelector(state => state.chapter.list)

  const [page, setPage] = useState(0)

  useEffect(() => {
    dispatch(getListChapter({ page, bookID: urlQuery.get('bookID') }))
  }, [page])

  function onTableChange (paginationChanged) {
    setPage(paginationChanged.current)
  }

  return (
    <>
      <Title level={4}>Books</Title>
      <Table
        bordered
        loading={chapterListReducer.loading}
        onChange={onTableChange}
        size="small"
        columns={columns}
        dataSource={chapterListReducer.data?.items}
        rowKey={'id'}
        pagination={{
          current: page,
          pageSize: ITEM_PER_PAGE,
          total: chapterListReducer.data?.total,
          size: 'normal',
        }}
      />
    </>
  )
}
export default List
