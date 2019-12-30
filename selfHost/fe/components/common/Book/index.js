import React from 'react'
import styles from './styles'

const Book = () => {
  return (
    <div className="book card">
      <div className="card-image">
        <figure className="image is-3by4">
          <img
            src="https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <h4 className="title is-4">Hắc sơn lão quỷ</h4>

        <div className="content">
          <div className="tags">
            <span className="tag is-warning is-medium">tiên hiệp</span>
            <span className="tag is-primary is-medium">huyền huyễn</span>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}

export default Book
