import MarkPublicBtn from './components/MarkPublicBtn'
import React from 'react'
import { Avatar, Button, Tooltip } from 'antd'
import CrawlTTVBookBtn from './components/CrawlTTVBookBtn'
import moment from 'moment'
import { ISO_DATE_TIME_FORMAT } from '../../../shared/constants'
import CrawlTTVChaptersBtn from './components/CrawlTTVChaptersBtn'

export default [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
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
    title: 'Img',
    dataIndex: 'img',
    key: 'img',
    render: (text, record) => {
      return (
        <Avatar shape="square" size={64} src={text} />
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
    sorter: true,
  },
  {
    title: 'Total chapter',
    dataIndex: 'total_chapter',
    key: 'total_chapter',
  },
  {
    title: 'Num audio',
    dataIndex: 'num_audio',
    key: 'num_audio',
  },
  {
    title: 'Updated at',
    dataIndex: 'updated_at',
    key: 'updated_at',
    sorter: true,
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
          <CrawlTTVChaptersBtn record={record}/>
          <Button><a href={`/#/chapter/list/?bookID=${record.id}`}>View chapters</a></Button>
        </Button.Group>
      )
    }
  }
]
