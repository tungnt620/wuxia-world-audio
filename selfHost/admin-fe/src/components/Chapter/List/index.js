import React, { useEffect, useState } from 'react'
import { Typography, Table, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import columns from './columns'
import { ITEM_PER_PAGE } from '../../../shared/constants'
import { convertAudioChapter, getListChapter } from '../../../store/chapter/actions'
import { useQuery } from '../../../shared/hooks'
import './style.scss'

const { Title } = Typography

const List = () => {
  const urlQuery = useQuery()
  const dispatch = useDispatch()
  const chapterListReducer = useSelector(state => state.chapter.list)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const bookID = urlQuery.get('bookID')

  useEffect(() => {
    dispatch(getListChapter({ page, bookID }))
  }, [page])

  function onTableChange(paginationChanged) {
    setPage(paginationChanged.current)
  }

  function convertAudioForAllBook() {
    setLoading(true)
    dispatch(
      convertAudioChapter({
        bookID,
        callback: () => setLoading(false),
      }),
    )
  }

  return (
    <div className={'chapters-of-book '}>
      <Title level={4}>Books</Title>
      <div className={'mass-action-on-all-data'}>
        <Button loading={loading} onClick={convertAudioForAllBook}>
          Convert audio of all chapter
        </Button>
      </div>
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
    </div>
  )
}
export default List
