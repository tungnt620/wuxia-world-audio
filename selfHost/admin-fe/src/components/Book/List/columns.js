import MarkPublicBtn from './components/MarkPublicBtn'
import React from 'react'

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
  },
  {
    title: 'Actions',
    dataIndex: '',
    key: 'actions',
    render: (text, record) => {
      return <MarkPublicBtn record={record} />
    }
  }
]
