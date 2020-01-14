import React from 'react'
import styles from './styles'
import AudioPlayer from 'react-h5-audio-player'
import V1 from '../V1'

const BookDetail = (
  {
    name = 'Linh vũ thiện hạ nguyen thanh tung',
    url,
    image = 'https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg',
    chapterUrl,
    chapterNo = 1,
    author = 'Lão quỷ',
    isOdd = false,
    tags = ['Full', 'New'],
  }
) => {
  return (
    <section className="book-detail">
      <section className={'book-highlight columns'}>
        <div className={'column is-one-quarter'}>
          <figure className="image is-3by4">
            <img
              src="https://www.nae.vn/ttv/ttv/public/images/story/ecbd8cce7d61e08f0c64c7f4cbc1fbb7bb34735c7437147f2a1d0ca02801af69.jpg"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className={'column'}>
          <h1 className={'title is-1 has-text-centered '}>Truyện tâm lỹ xã hội - Bán Trinh</h1>
          <figure className={'audio-player'}>
            <AudioPlayer
              autoPlay
              src="https://ia800107.us.archive.org/31/items/TruyentamlyxahoiBantrinh/TruyentamlyxahoiBantrinh_p02.mp3"
            />
          </figure>
          <ul className={'list-audio'}>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>
          <div className={'description'}>
            <p className={'has-text-centered'}>Lời Nguyền Ngải Đen là câu chuyện ma có thật hay được trình bày qua giọng
              đọc Quàng A Tũn. Mời quý thính giả lắng nghe</p>
          </div>
        </div>
      </section>

      <section className={'relative-books'}>
        <h2 className={'title is-3'}>Sách liên quan</h2>
        <div className={'columns is-multiline'}>
          <div className="column is-one-quarter is-narrow">
            <V1/>
          </div>
          <div className="column is-one-quarter">
            <V1/>
          </div>
          <div className="column is-one-quarter">
            <V1/>
          </div>
          <div className="column is-one-quarter">
            <V1/>
          </div>
        </div>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default BookDetail
