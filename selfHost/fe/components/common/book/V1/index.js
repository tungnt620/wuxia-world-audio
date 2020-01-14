import React from 'react'
import styles from './styles'

const V1 = (
  {
    isFull = true,
    image = 'https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg',
    name = 'Linh vũ thiện hạ',
    url,
  }
) => {
  return (
    <div className="book-v1 card" itemScope={true} itemProp={'https://schema.org/Book'}>
      <a href={url} itemProp={'url'} title={name}>
        <figure className="image is-3by4">
          <img
            src={image}
            alt={name}
            itemProp={'image'}
          />
        </figure>
        {isFull ? <span className="full-label"/> : null}
        <div className="name">
          <h3 itemProp="name">{name}</h3>
        </div>
      </a>

      <style jsx>{styles}</style>
    </div>
  )
}

export default V1
