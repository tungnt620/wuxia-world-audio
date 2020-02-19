import React, { useState } from 'react'
import styles from './styles'

const Chapters = (
  {
    currentPlayChapterOrderNo = 1,
    setCurrentPlayChapterOrderNo,
    data,
    page = 1,
    totalPage,
    setPage = () => {}
  }
) => {
  const [showChapterText, setShowChapterText] = useState(false)
  const [currentChapterViewText, setCurrentChapterViewText] = useState({})

  const play = (order_no) => {
    setCurrentPlayChapterOrderNo(order_no)
  }

  const viewText = (chapter) => {
    setShowChapterText(true)
    setCurrentChapterViewText(chapter)
  }

  return (
    <section className="book-detail-chapters">
      <section className={'columns'}>
        <div className={'column is-full'}>
          <table className="table is-hoverable is-bordered is-striped is-fullwidth">
            <tbody>
            {
              data.map((chapter) => {
                return (
                  <tr className={`chapter ${currentPlayChapterOrderNo === chapter.order_no ? 'selected' : ''}`}>
                    <th>Chương {chapter.order_no}</th>
                    <td>
                      {chapter.name}
                    </td>
                    <td>
                      <div className="buttons">

                      {
                        !chapter.audio && <button className={'button'} disabled>Chưa có audio</button>
                      }
                      {
                        (chapter.audio && chapter.order_no !== currentPlayChapterOrderNo) && (
                          <button onClick={() => play(chapter.order_no)} className={'button'}>Nghe audio</button>
                        )
                      }
                      {
                        chapter.audio && chapter.order_no === currentPlayChapterOrderNo && <button className={'button'} disabled>Playing</button>
                      }
                      <button className={'button'} onClick={() => viewText(chapter)}>Xem truyện</button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
          <nav className="pagination" role="navigation">
            {
              page > 1 && <a onClick={() => setPage(page - 1)} className="pagination-previous">Trang trước</a>
            }
            {
              page < totalPage && <a onClick={() => setPage(page + 1)} className="pagination-next">Trang sau</a>
            }

            <ul className="pagination-list">
              {
                page > 1 && (
                  <li>
                    <a onClick={() => setPage(1)} className="pagination-link">1</a>
                  </li>
                )
              }

              {
                page - 2 > 1 && (
                  <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                )
              }
              {
                page - 1 > 1 && (
                  <li>
                    <a onClick={() => setPage(page - 1)} className="pagination-link">{page - 1}</a>
                  </li>
                )
              }
              <li>
                <a className="pagination-link is-current">{page}</a>
              </li>
              {
                page + 1 < totalPage && (
                  <li>
                    <a onClick={() => setPage(page + 1)} className="pagination-link">{page + 1}</a>
                  </li>
                )
              }
              {
                totalPage - 2 > page && (
                  <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                )
              }
              {
                page < totalPage && (
                  <li>
                    <a onClick={() => setPage(totalPage)} className="pagination-link">{totalPage}</a>
                  </li>
                )
              }
            </ul>
          </nav>
        </div>
      </section>

      <div className={`modal ${showChapterText ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => setShowChapterText(false)} />
        <div className="modal-content">
          <div className={'box'}>
            {currentChapterViewText.text}
          </div>
        </div>
        <button onClick={() => setShowChapterText(false)} className="modal-close is-large" aria-label="close"/>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Chapters
