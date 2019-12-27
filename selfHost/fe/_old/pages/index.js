import React from 'react'
import MainLayout from 'components/Layout/Main'
import Header from 'components/Header'
import styles from '../../shared/styles'
import ListShortConfessionInfo from '../components/ListShortConfessionInfo'
import ListCategoryInTags from '../components/ListCategoryInTags'
import PopularListCategoryInTags from '../components/PopularListCategoryInTags'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { CATEGORY_DETAIL_DATA, CONFESSION_DETAIL_DATA } from '../../shared/graphQL/commonGPL'
import { LIMIT_CATEGORY_FETCH } from '../../shared/constants'
import Head from 'next/head'

const GET_DATA = gql`
    query getData($offset: Int, $limit: Int, $categoryLimit: Int) {
        confessions(offset: $offset, limit: $limit) {
            ...ConfessionDetailCommonField
        }
        categories (limit: $categoryLimit, offset: 0) {
            ...CategoryDetailCommonField
        }
    }
    ${CONFESSION_DETAIL_DATA}
    ${CATEGORY_DETAIL_DATA}
`

export default () => {
  const { loading, error, data, fetchMore } = useQuery(
    GET_DATA,
    {
      variables: {
        offset: 0,
        limit: 10,
        categoryLimit: LIMIT_CATEGORY_FETCH,
      },
    }
  )

  const fetchMoreConfession = (e) => {
    return fetchMore({
      variables: {
        offset: data.confessions.length,
        categoryLimit: 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          confessions: [...prev.confessions, ...fetchMoreResult.confessions]
        })
      }
    })
  }

  if (loading) return 'Loading ...'
  if (error) return `Error! ${error.message}`

  const { confessions, categories } = data

  return (
    <>
      <Head>
        <title>Confession</title>
      </Head>
      <MainLayout>
        <Header/>
        <div style={{ margin: '30px 0 30px 0' }}>
          <section className={'main-content'}>
            <PopularListCategoryInTags categories={categories}/>
            <ListShortConfessionInfo
              confessions={confessions}
              fetchMoreConfession={fetchMoreConfession}
              loading={loading}
            />
          </section>
          <aside className={'right-sidebar'}>
            <ListCategoryInTags categories={categories}/>
          </aside>
        </div>

      </MainLayout>
      <style jsx>{styles}</style>
    </>
  )
}
