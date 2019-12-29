import React from 'react'
import MainLayout from '../components/common/Layout/Main'
import Header from '../components/common/Header'
import Head from 'next/head'
import Footer from '../components/common/Footer'

export default () => {
  return (
    <>
      <Head>
        <title>Demo</title>
      </Head>
      <Header/>
      <MainLayout>
        <div style={{ margin: '30px 0 30px 0' }}>
          <section className={'main-content'}>
          </section>
          <aside className={'right-sidebar'}>
          </aside>
        </div>

      </MainLayout>
      <Footer/>
    </>
  )
}
