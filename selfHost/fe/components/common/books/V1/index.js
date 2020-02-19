import React from 'react'
import styles from './styles'
import BookV1 from '../../book/V1'

const V1 = (
  {
    title = 'Truyện hot',
    icon = <i className="fa fa-fire"/>,
    options = [
      {
        value: 'all',
        text: 'Tất cả',
      },
      {
        value: 'tien-hiep',
        text: 'Tiên hiệp',
      }
    ],
    books = [{}],
    hasMore = true,
    fetchMore = () => {}
  }
) => {

  return (
    <div className="books-block">
      <div className={'header'}>
        <p className={'title is-4'}>
          {title} {icon}
        </p>
        {
          options && (
            <div className="field">
              <div className="control">
                <div className="select is-primary">
                  <select>
                    {
                      options.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)
                    }
                  </select>
                </div>
              </div>
            </div>
          )
        }
      </div>

      <div className="columns is-variable is-1-mobile is-mobile is-multiline">
        {books.map((book) => (
          <div key={book.id} className="column is-3-mobile is-2-tablet is-2-desktop">
            <BookV1 {...book}/>
          </div>
        ))}
      </div>

      <div className={'load-more has-text-centered'}>
        {
          hasMore ? (
            <button onClick={fetchMore} className="button is-dark">Tải thêm</button>
          ) : (
            <p>Không còn nữa!</p>
          )
        }

      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default V1
