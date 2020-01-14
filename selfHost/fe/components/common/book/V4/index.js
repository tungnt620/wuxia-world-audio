import React from 'react'
import styles from './styles'

const V4 = (
  {
    name = 'Linh vũ thiện hạ nguyen thanh tung',
    url,
    image = 'https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg',
    chapterUrl,
    chapterNo = 1,
    author = 'Lão quỷ',
    isOdd = false,
    tags = ['Full', 'New'],
  }
) => {
  return (
    <div
      className={`book-v4 columns is-variable is-1 is-mobile ${isOdd ? 'has-background-light' : 'has-background-grey-lighter'}`}
      itemScope={true}
      itemProp={'https://schema.org/Book'}
    >
      <div className='column is-one-quarter-mobile image-wrapper'>
        <a href={url} itemProp={'url'} title={name}>
          <figure className="image is-3by4">
            <img
              src={image}
              alt={name}
              itemProp={'image'}
            />
          </figure>
        </a>
      </div>
      <div className="column is-three-fifths-mobile">
        <h3 className={'name'} itemProp='name'>
          <a itemProp="url" href={url}><i className="fas fa-book"></i> {name}</a>
          {
            tags.map((tag) => (<>&nbsp;<span key={tag} className="tag is-warning">{tag}</span></>))
          }
        </h3>
        <a className={'author'}><i className="fas fa-at"></i> {author}</a>
      </div>
      <div className="column is-one-fifth-mobile has-text-centered">
        <a
          className='is-hidden-desktop is-hidden-tablet'
          href={chapterUrl}
          title={`${name} - chương ${chapterNo}`}
        >
          {`C${chapterNo}`}
        </a>
        <a
          className='is-hidden-mobile'
          href={chapterUrl}
          title={`${name} - chương ${chapterNo}`}
        >
          {`Chương ${chapterNo}`}
        </a>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default V4
