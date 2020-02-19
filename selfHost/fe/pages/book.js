import React from 'react'
import MainLayout from '../components/common/Layout/Main'
import Header from '../components/common/Header'
import Head from 'next/head'
import Footer from '../components/common/Footer'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import BookDetail from '../components/BookDetail'

const GET_DATA = gql`
    query getData($IDAndSlug: String) {
        book(IDAndSlug: $IDAndSlug) {
            id
            name
            slug
            desc
            img
            is_full
            num_vote
            sum_vote
            view
            created_at
            updated_at
            total_chapter
            author {
                id
                name
                slug
            }
            cats {
                id
                name
                slug
            }
            relativeBooks {
                id
                name
                slug
                img
                is_full
            }
        }
    }
`

export default () => {
  const router = useRouter()
  const { IDAndSlug } = router.query

  const { loading, error, data, fetchMore } = useQuery(
    GET_DATA,
    {
      variables: {
        IDAndSlug
      },
    }
  )

  if (loading) return 'Loading ...'
  if (error) return `Error! ${error.message}`

  const { book } = data

  return (
    <>
      <Head>
        <title>Book detail</title>
      </Head>
      <Header/>
      <MainLayout>
        <BookDetail {...book}/>
      </MainLayout>
      <Footer/>
    </>
  )
}
