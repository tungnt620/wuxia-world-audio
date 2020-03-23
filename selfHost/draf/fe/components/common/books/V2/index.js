import React from 'react'
import styles from './styles'
import BookV2 from '../../book/V2'

const V2 = (
  {
    title = 'Truyện hot',
    icon = <i className="fa fa-fire"></i>,
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
    books = [{}]
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
          <div key={book.id} className="column is-4-mobile is-3-tablet is-2-desktop">
            <BookV2 {...book}/>
          </div>
        ))}
      </div>

      <div className={'load-more has-text-centered'}>
        <button className="button is-dark">Tải thêm</button>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default V2
