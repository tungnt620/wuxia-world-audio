import React from 'react'
import MainLayout from '../components/Layout/Main'
import Header from '../components/Header'
import styles from '../shared/globalStyles'
import Head from 'next/head'
import PrintTest from '../components/PrintTest'

async function loadPrintJS () {
  return require('print-js')
}

export default () => {
  const clickPrint = async () => {
    const printJS = await loadPrintJS()
    printJS({ printable: 'tung', type: 'html', css: '/print-style.css' })
  }

  return (
    <>
      <Head>
        <title>Demo</title>
      </Head>
      <MainLayout>
        <Header/>
        <div style={{ margin: '30px 0 30px 0' }}>
          <section className={'main-content'}>
            <button
              type="button"
              onClick={clickPrint}
            >
              Print
            </button>
          </section>

          <PrintTest data={'nguyen'}/>

          <aside className={'right-sidebar'}>
          </aside>
        </div>

      </MainLayout>
      <style jsx>{styles}</style>
    </>
  )
}
