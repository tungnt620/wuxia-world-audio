import React from 'react'
import styles from './styles'
import BookV4 from '../../book/V4'

const V4 = (
  {
    title = 'Tiên hiệp',
    icon = <i className="fa fa-fire"></i>,
    options = [
      {
        value: 'all',
        text: 'Tất cả',
      },
      {
        value: 'hot',
        text: 'Hot',
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
          <BookV4 key={index} {...book} isOdd={index % 2}/>
        ))}
      </div>

      <nav className="pagination is-small" role="navigation" aria-label="pagination">
        <a className="pagination-previous">Trang trước</a>
        <a className="pagination-next">Trang sau</a>
        <a className="pagination-next">Chọn trang</a>
        <ul className="pagination-list">
          <li><a className="pagination-link" aria-label="Goto page 1">1</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
          <li><a className="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
          <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label="Goto page 86">86</a></li>
        </ul>
      </nav>

      <style jsx>{styles}</style>
    </div>
  )
}

export default V4
