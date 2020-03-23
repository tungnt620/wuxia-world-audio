import React, { useEffect, useState } from 'react'
import styles from './styles'
import V1 from '../common/book/V1'
import Chapters from './Chapters'
import Audio from './Audio'
import { gql } from 'apollo-boost'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import { DEFAULT_ITEM_PER_PAGE } from '../../shared/constants'

const GET_CHAPTERS_DATA = gql`
    query getData($IDAndSlug: String, $offset: Int, $limit: Int) {
        chapters(bookIDAndSlug: $IDAndSlug, offset: $offset, limit: $limit) {
            id
            order_no
            name
            slug
            text
            audio
        }
    }
`

const BookDetail = (
  {
    name = 'Linh vũ thiện hạ',
    img = 'https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg',
    desc = 'Desc',
    relativeBooks = [],
    total_chapter = 0,
  }
) => {
  const [chapterPage, setChapterPage] = useState(undefined)
  const [currentPlayChapterOrderNo, setCurrentPlayChapterOrderNo] = useState(1)
  const router = useRouter()
  const { IDAndSlug } = router.query

  const { loading, error, data, fetchMore } = useQuery(
    GET_CHAPTERS_DATA,
    {
      variables: {
        IDAndSlug,
        offset: 0,
        limit: DEFAULT_ITEM_PER_PAGE,
      },
    }
  )

  useEffect(() => {
    if (chapterPage) fetchData(chapterPage)
  }, [chapterPage])

  const fetchData = (page) => {
    return fetchMore({
      variables: {
        IDAndSlug,
        offset: (page - 1) * DEFAULT_ITEM_PER_PAGE,
        limit: DEFAULT_ITEM_PER_PAGE,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          chapters: fetchMoreResult.chapters
        })
      }
    })
  }

  const getCurrentChapter = () => {
    const { chapters } = data
    return chapters.find((chapter) => chapter.order_no === currentPlayChapterOrderNo)
  }

  if (loading) return 'Loading ...'
  if (error) return `Error! ${error.message}`

  const { chapters } = data
  const totalPage = parseInt(total_chapter / DEFAULT_ITEM_PER_PAGE) + (total_chapter % DEFAULT_ITEM_PER_PAGE > 0 ? 1 : 0)

  return (
    <section className="book-detail">
      <section className={'book-highlight columns'}>
        <div className={'column is-one-quarter'}>
          <figure className="image is-3by4">
            <img
              src={img}
              alt={name}
            />
          </figure>
        </div>
        <div className={'column'}>
          <h1 className={'title is-1 has-text-centered '}>{name}</h1>
          <div className={'description'}>
            <div className={'has-text-centered'} dangerouslySetInnerHTML={{ __html: desc }}/>
          </div>
        </div>
      </section>

      <Audio
        currentChapter={getCurrentChapter()}
      />

      <Chapters
        currentPlayChapterOrderNo={currentPlayChapterOrderNo}
        setCurrentPlayChapterOrderNo={setCurrentPlayChapterOrderNo}
        data={chapters}
        page={chapterPage}
        totalPage={totalPage}
        setPage={setChapterPage}
      />

      <section className={'relative-books'}>
        <h2 className={'title is-3'}>Sách liên quan</h2>
        <div className={'columns is-multiline'}>
          {
            relativeBooks.map((book) => {
              return (
                <div className="column is-one-quarter">
                  <V1 {...book} />
                </div>
              )
            })
          }
        </div>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default BookDetail
