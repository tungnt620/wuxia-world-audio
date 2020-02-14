import MarkPublicBtn from './components/MarkPublicBtn'
import React from 'react'
import { Button, Tooltip } from 'antd'
import CrawlTTVBookBtn from './components/CrawlTTVBookBtn'
import moment from 'moment'
import { ISO_DATE_TIME_FORMAT } from '../../../shared/constants'

export default [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      return (
        <Tooltip title={record.desc}>
          {text}
        </Tooltip>
      )
    }
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: 'Is public',
    dataIndex: 'is_public',
    key: 'is_public',
  },
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: 'Source ID',
    dataIndex: 'source_id',
    key: 'source_id',
  },
  {
    title: 'Updated at',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (text) => moment(text).format(ISO_DATE_TIME_FORMAT)
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text) => moment(text).format(ISO_DATE_TIME_FORMAT)
  },
  {
    title: 'Actions',
    dataIndex: '',
    key: 'actions',
    render: (text, record) => {
      return (
        <Button.Group>
          <MarkPublicBtn record={record}/>
          <CrawlTTVBookBtn record={record}/>
        </Button.Group>
      )
    }
  }
]
