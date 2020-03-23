import React from 'react'
import MainLayout from '../components/common/Layout/Main'
import Header from '../components/common/Header'
import Head from 'next/head'
import Footer from '../components/common/Footer'
import Home from '../components/Home'
import Cat from '../components/Cat'

export default () => {
  return (
    <>
      <Head>
        <title>Cat</title>
      </Head>
      <Header/>
      <MainLayout>
        <Cat/>
      </MainLayout>
      <Footer/>
    </>
  )
}
