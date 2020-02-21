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
        <>
          <a target={'_blank'} href={`https://truyen.tangthuvien.vn/doc-truyen/${record.source_id}/`}>Source link</a>
          <br/>
          <a target={'_blank'} href={`http://confession.vn:3004/sach/${record.id}-${record.slug}`}>link</a>
        </>
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
    title: 'Source view',
    dataIndex: 'source_view',
    key: 'source_view',
    sorter: true,
  },
  {
    title: 'Source like',
    dataIndex: 'source_like',
    key: 'source_like',
    sorter: true,
  },
  {
    title: 'Source follow',
    dataIndex: 'source_follow',
    key: 'source_follow',
    sorter: true,
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
    title: 'Source last updated',
    dataIndex: 'source_last_update',
    key: 'source_last_update',
    sorter: true,
    render: (text) => moment(text).format(ISO_DATE_TIME_FORMAT)
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
          <CrawlTTVBookBtn record={record}/>
          <CrawlTTVChaptersBtn record={record}/>
          <Button><a href={`/#/chapter/list/?bookID=${record.id}`}>View chapters</a></Button>
          <MarkPublicBtn record={record}/>
        </Button.Group>
      )
    }
  }
]
