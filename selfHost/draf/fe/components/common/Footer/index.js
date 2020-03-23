import React from 'react'
import styles from './styles'

const Footer = (
  {
    tags = [
      {
        name: 'tiên hiệp',
        url: '/tien-',
      }, {
        name: 'tiên hiệp',
        url: '/tien-',
      }, {
        name: 'tiên hiệp',
        url: '/tien-',
      }, {
        name: 'tiên hiệp',
        url: '/tien-',
      },
    ]
  }
) => {
  return (
    <footer className="footer">
      <div className="content columns">
        <div className='column is-half'>
          <strong>AudioCuaTui</strong> - <a href="https://truyenfull.net"
                                            title="Đọc truyện online">Nghe audio</a> online, <a
          href="https://truyenfull.net" title="Đọc truyện chữ">đọc truyện</a> chữ, <a
          href="https://truyenfull.net" title="Truyện hay">truyện hay</a>. Website luôn cập nhật những bộ <a
          href="https://truyenfull.net/danh-sach/truyen-moi/" title="Truyện mới">truyện mới</a> thuộc các thể loại đặc
          sắc như <a href="https://truyenfull.net/the-loai/tien-hiep/" title="Truyện tiên hiệp">truyện tiên
          hiệp</a>, <a href="https://truyenfull.net/the-loai/kiem-hiep/" title="Truyện kiếm hiệp">truyện kiếm
          hiệp</a>, hay <a href="https://truyenfull.net/the-loai/ngon-tinh/" title="Truyện ngôn tình">truyện ngôn
          tình</a> một cách nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính bảng.
        </div>
        <div className='column is-half'>
          <div className='tags'>
            {
              tags.map((tag) => (
                <a title={tag.name} key={tag.name} href={tag.url}><span className='tag'>{tag.name}</span></a>))
            }
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </footer>
  )
}

export default Footer
