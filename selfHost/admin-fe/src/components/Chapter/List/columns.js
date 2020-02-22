import React from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { ISO_DATE_TIME_FORMAT } from '../../../shared/constants'
import ConvertAudioBtn from './components/ConvertAudioBtn'
import ShowContentBtn from './components/ShowContentBtn'

export default [
  {
    title: 'Order no',
    dataIndex: 'order_no',
    key: 'order_no',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: 'Text',
    dataIndex: 'text',
    key: 'text',
    render: (text) => {
      return text.substring(0, 50) + ' ...'
    }
  },
  {
    title: 'Audio',
    dataIndex: 'audio',
    key: 'audio',
    render: (text) => {
      return text && <a href={text} target={'_blank'}>Link</a>
    }
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
          <ConvertAudioBtn record={record} />
          <ShowContentBtn record={record} />
        </Button.Group>
      )
    }
  }
]
