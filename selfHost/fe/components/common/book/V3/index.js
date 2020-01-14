import React from 'react'
import styles from './styles'
import dayjs from 'dayjs'
import 'dayjs/locale/vi' // load on demand
dayjs.locale('vi') // use Spanish locale globally
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const V3 = (
  {
    name = 'Linh vũ thiện hạ nguyen thanh tung Linh vũ thiện hạ nguyen thanh tung',
    url,
    chapterUrl,
    chapterNo = 1,
    isOdd = false,
    cats = [
      {
        name: 'Tiên hiệp', id: 1, slug: 'tien-hiep',
      },
      // {
      //   name: 'Huyền huyễn', id: 2, slug: 'huyen-huyen',
      // }
    ],
    updated_at = new Date()
  }
) => {
  return (
    <div className={`book-v3`}>
      <div className={`columns is-mobile ${isOdd ? 'has-background-light' : 'has-background-grey-lighter'}`}>
        <div className="column is-three-quarters-mobile">
          <h3 className={'name'}>
            <a href={url}>{name}</a>
          </h3>
        </div>
        <div className="column is-hidden-mobile">
          {
            cats.map((cat, index) => {
              return (
                <>
                  {index > 0 && ', '}
                  <a
                    key={cat.id}
                    href={`/the-loai/${cat.id}-${cat.slug}`}
                    title={cat.name}
                  >
                    {cat.name}
                  </a>
                </>
              )
            })
          }
        </div>
        <div className="column is-one-quarter-mobile has-text-centered">
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
        <div className="column is-hidden-mobile">
          {dayjs(updated_at).fromNow()}
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default V3
