import React from 'react'
import MainLayout from '../components/Layout/Main'
import Header from '../components/Header'
import styles from '../shared/globalStyles'
import Head from 'next/head'

export default () => {
  return (
    <>
      <Head>
        <title>Confession</title>
      </Head>
      <MainLayout>
        <Header/>
        <div style={{ margin: '30px 0 30px 0' }}>
          <section className={'main-content'}>

          </section>
          <aside className={'right-sidebar'}>
          </aside>
        </div>

      </MainLayout>
      <style jsx>{styles}</style>
    </>
  )
}
