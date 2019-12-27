import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import Link from 'next/link'
import { humanFormatFromTimestamp } from '../../../shared/dateUtils'
import defaultProfileImage from 'static/images/name.png'
import commentsImage from '../../../public/images/comments.png'

const ShortConfessionInfo = ({ confession, index }) => {
  let { image, slug, title, created_at, totalComment, categories, author } = confession
  image = index === 0 ? image : null

  return (
    <article className={'confession-short-info'}>
      {
        image && (
          <div className={'featured-image'}>
            <Link href={`/confession?slug=${slug}`} as={`/${slug}/`}>
              <a>
                <img src={image} alt={title}/>
              </a>
            </Link>
          </div>
        )
      }

      <div className={'content'}>
        <h2 className={'title'}>
          <Link href={`/confession?slug=${slug}`} as={`/${slug}/`} >
            <a>
              {title}
            </a>
          </Link>
        </h2>
        <div className={'meta-data'}>
          <img className={'profile-image'} alt={author || 'admin'} src={defaultProfileImage}/>
          <a className={'profile-link'}>
            {author || 'admin'}・
            <time className={'created-at'}>{humanFormatFromTimestamp(created_at)}</time>
          </a>

          <div className={'cats'}>
            {
              categories.map(cat => (
                  <Link key={cat.slug} href={`/category?slug=${cat.slug}`} as={`/category/${cat.slug}/`}>
                    <a className={'cat'}>#{cat.name}</a>
                  </Link>
                )
              )
            }

            <Link href={`/confession?slug=${slug}#confession-detail-comments`} as={`/${slug}/#confession-detail-comments`}>
              <a className={'comment'}>
                <span className={'comment-number'}>{totalComment}</span>
                <img className={'comment-image'} alt={'comment'} src={commentsImage}/>
              </a>
            </Link>
          </div>
        </div>

      </div>
      <style jsx>{styles}</style>
    </article>
  )
}

ShortConfessionInfo.propTypes = {}

export default ShortConfessionInfo
