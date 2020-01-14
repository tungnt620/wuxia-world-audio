import React from 'react'
import styles from './styles'
import V1 from '../common/books/V1'
import V2 from '../common/books/V2'
import V3 from '../common/books/V3'
import V4 from '../common/books/V4'
import Breadcrumb from '../common/Breadcrumb'

const Home = () => {
  return (
    <section className="home">
      <Breadcrumb />
      <V4 books={[
        {}, {}, {}, {}, {}, {}
      ]}/>
      <V3 books={[
        {}, {}, {}, {}, {}, {}
      ]}/>
      <V2 books={[
        {}, {}, {}, {}, {}, {}
      ]}/>
      <V1 books={[
        {}, {}, {}, {}, {}, {}
      ]}/>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Home
