import React from 'react'
import styles from './styles'
import Book from '../common/Book'

const Home = () => {
  return (
    <section className="home">
      <h2 className={'title is-2 has-text-centered'}>Truyện mới cập nhật</h2>
      <div className="columns is-multiline">
        <div className="column is-one-quarter is-narrow">
          <Book/>
        </div>
        <div className="column is-one-quarter">
          <Book/>
        </div>
        <div className="column is-one-quarter">
          <Book/>
        </div>
        <div className="column is-one-quarter">
          <Book/>
        </div>

        <div className="column is-one-quarter">
          <Book/>
        </div>
        <div className="column is-one-quarter">
          <Book/>
        </div>
        <div className="column is-one-quarter">
          <Book/>
        </div>
        <div className="column is-one-quarter">
          <Book/>
        </div>
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Home
