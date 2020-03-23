import React from 'react'
import styles from './styles'

const V2 = (
  {
    is_full = true,
    img = 'https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg',
    name = 'Linh vũ thiện hạ nguyen thanh tung',
    chapterUrl,
    url,
    chapterNo = 1,
  }
) => {
  return (
    <div className="book-v2 card" itemScope={true} itemProp={'https://schema.org/Book'}>
      <div className="card-image">
        <a href={url} itemProp={'url'} title={name}>
          <figure className="image is-3by4">
            <img
              src={img}
              alt={name}
              itemProp={'image'}
            />
          </figure>
          {is_full ? <span className="full-label"/> : null}
        </a>
      </div>
      <div className="card-content">
        <a href={url} itemProp={'url'} title={name}>
          <h3 className={'name is-clipped'} itemProp="name">{name}</h3>
        </a>
      </div>
      <footer className="card-footer">
        <a
          className="button is-link is-light is-small"
          href={chapterUrl}
          title={`${name} - chương ${chapterNo}`}
        >
          {`${is_full ? 'Full - ' : ''} C ${chapterNo}`}
        </a>
      </footer>
      <style jsx>{styles}</style>
    </div>
  )
}

export default V2
