import React from 'react'
import styles from './styles'
import BookV3 from '../../book/V3'

const V3 = (
  {
    title = 'Mới cập nhật',
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

      <div className="books">
        {books.map((book, index) => (
          <BookV3 key={index} {...book} isOdd={index % 2} />
        ))}
      </div>

      <div className={'load-more has-text-centered'}>
        <button className="button is-dark">Tải thêm</button>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default V3
