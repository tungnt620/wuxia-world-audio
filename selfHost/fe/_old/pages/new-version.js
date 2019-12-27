import React from 'react'
import MainLayout from 'components/Layout/Main'
import Header from 'components/Header'
import styles from '../../shared/styles'

export default () => {

  return (
    <>
      <MainLayout>
        <Header/>
        <div className={'new-version'}>
          <h1>Ra mắt phiên bản alpha 2.0</h1>
          <p>Chào các bạn,</p>
          <p>
            Tính đến hiện tại confession.vn đã ra đời được hơn 3 năm, với chức năng là nơi để lưu lại những bài confession
            được các bạn viết trên Facebook.
          </p>
          <p>
            Mình nhận thấy trong mỗi chúng ta 1 lúc nào đó đều có nhu cầu chia sẻ những tâm sự thầm kín, những tâm sự rất đỗi bình thường và những tâm sự này chúng ta
            viết ra để thoả lòng, để vơi đi nỗi buồn, để nhân lên niềm vui.
          </p>
          <p>
            Vì vậy sắp tới mình và nhóm sẽ nâng cấp website để có thể cung cấp nhiều tính năng và trải nghiệm cho việc chia sẻ tâm sự.
          </p>
          <p>Trong quá trình này bọn mình cũng rất mong nhận được những ý kiến, góp ý của các bạn. Những ý kiến, đóng góp đó là tiền đề để bọn mình phát triển tiếp các tính năng sau này</p>
          <p>Bọn mình cảm ơn các bạn trước</p>

          <iframe
            className={'google-form'}
            src="https://docs.google.com/forms/d/e/1FAIpQLSdV3lPrIOUkea9FfOELjlWZcYirZQseUI6CgFmRAMT9yiO-tw/viewform?embedded=true"
             height="500" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
          </iframe>
        </div>

      </MainLayout>
      <style jsx>{styles}</style>
    </>
  )
}
