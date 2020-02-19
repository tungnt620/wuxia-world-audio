import React, { useState } from 'react'
import styles from './styles'
import V1 from '../common/books/V1'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_DATA = gql`
    query getData($offset: Int, $limit: Int) {
        books(offset: $offset, limit: $limit) {
            id
            name
            slug
            desc
            img
            is_full
        }
    }
`

const Home = () => {
  const [hasMore, setHasMore] = useState(true)
  const { loading, error, data, fetchMore } = useQuery(
    GET_DATA,
    {
      variables: {
        offset: 0,
        limit: 12,
      },
    }
  )

  const fetchMoreData = () => {
    return fetchMore({
      variables: {
        offset: data.books.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.books || !fetchMoreResult.books.length) {
          setHasMore(false)
          return prev
        }
        return Object.assign({}, prev, {
          books: [...prev.books, ...fetchMoreResult.books]
        })
      }
    })
  }

  if (loading) return 'Loading ...'
  if (error) return `Error! ${error.message}`

  const { books } = data

  return (
    <section className="home">
      <V1
        books={books}
        title={'Truyện mới cập nhật'}
        icon={<></>}
        options={null}
        hasMore={hasMore}
        fetchMore={fetchMoreData}
      />
      <style jsx>{styles}</style>
    </section>
  )
}

export default Home
