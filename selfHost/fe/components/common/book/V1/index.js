import React from 'react'
import styles from './styles'
import Link from 'next/link'

const V1 = (
  {
    id,
    is_full = true,
    img = 'https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg',
    name = 'Linh vũ thiện hạ',
    slug,
  }
) => {
  const IDAndSlug = `${id}-${slug}`

  return (
    <div className="book-v1 card" itemScope={true} itemProp={'https://schema.org/Book'}>
      <Link href={{ pathname: '/book', query: { IDAndSlug: IDAndSlug } }} as={`/sach/${IDAndSlug}`}>
        <a itemProp={'url'} title={name}>
          <figure className="image is-3by4">
            <img
              src={img}
              alt={name}
              itemProp={'image'}
            />
          </figure>
          {is_full ? <span className="full-label"/> : null}
          <div className="name">
            <h3 itemProp="name">{name}</h3>
          </div>
        </a>
      </Link>

      <style jsx>{styles}</style>
    </div>
  )
}

export default V1
