import React from 'react'
import styles from './styles'
import V1 from '../common/book/V1'

const Cat = () => {
  return (
    <section className="home">
      <h2 className={'title is-2 has-text-centered'}>Truyện tiên hiệp</h2>
      <div className="columns is-multiline">
        <div className="column is-one-quarter is-narrow">
          <V1/>
        </div>
        <div className="column is-one-quarter">
          <V1/>
        </div>
        <div className="column is-one-quarter">
          <V1/>
        </div>
        <div className="column is-one-quarter">
          <V1/>
        </div>

        <div className="column is-one-quarter">
          <V1/>
        </div>
        <div className="column is-one-quarter">
          <V1/>
        </div>
        <div className="column is-one-quarter">
          <V1/>
        </div>
        <div className="column is-one-quarter">
          <V1/>
        </div>
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Cat
