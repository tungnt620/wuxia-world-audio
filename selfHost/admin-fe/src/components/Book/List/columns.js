import MarkPublicBtn from './components/MarkPublicBtn'
import React from 'react'
import { Avatar, Button } from 'antd'
import CrawlBookBtn from './components/CrawlBookBtn'
import CrawlChaptersBtn from './components/CrawlChaptersBtn'
import ViewChaptersBtn from './components/ViewChaptersBtn'

export default [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '80px',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Links',
    dataIndex: '_1',
    key: '_1',
    render: (text, record) => {
      return (
        <a target={'_blank'} href={`https://www.wuxiaworld.com/novel/${record.source_id}/`}>
          Source link
        </a>
      )
    },
  },
  {
    title: 'Img',
    dataIndex: 'img',
    key: 'img',
    render: (text, record) => {
      return <Avatar shape="square" size={64} src={text} />
    },
  },
  {
    title: 'Public',
    dataIndex: 'is_public',
    key: 'is_public',
    sorter: true,
  },
  {
    title: 'Num chapter',
    dataIndex: 'total_chapter',
    key: 'total_chapter',
  },
  {
    title: 'Num audio',
    dataIndex: 'num_audio',
    key: 'num_audio',
  },
  {
    title: 'Source total chapter',
    dataIndex: 'source_total_chapter',
    key: 'source_total_chapter',
    sorter: true,
  },
  {
    title: 'Is full',
    dataIndex: 'is_full',
    key: 'is_full',
    sorter: true,
  },
  {
    title: 'Actions',
    dataIndex: '',
    key: 'actions',
    fixed: 'right',
    width: '150px',
    render: (text, record) => {
      return (
        <Button.Group>
          <CrawlBookBtn record={record} />
          <CrawlChaptersBtn record={record} />
          <ViewChaptersBtn record={record} />
          <MarkPublicBtn record={record} />
        </Button.Group>
      )
    },
  },
]
