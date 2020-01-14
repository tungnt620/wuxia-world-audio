import React from 'react'
import MainLayout from '../components/common/Layout/Main'
import Header from '../components/common/Header'
import Head from 'next/head'
import Footer from '../components/common/Footer'
import BookDetail from '../components/common/book/BookDetail'

export default () => {
  return (
    <>
      <Head>
        <title>Book detail</title>
      </Head>
      <Header/>
      <MainLayout>
        <BookDetail/>
      </MainLayout>
      <Footer/>
    </>
  )
}
