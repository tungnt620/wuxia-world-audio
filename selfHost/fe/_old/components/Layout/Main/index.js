import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import { NoticeBar } from 'antd-mobile'
import Link from 'next/link'
import ScrollToTopBtn from '../../ScrollToTopBtn'

const MainLayout = ({ children }) => {

  return (
    <div className={'wrap-all-container'}>
      <NoticeBar
        size={'xl'}
        mode={'link'}
        action={<Link href={'/new-version'} as={'/new-version/'} ><a>Xem thêm</a></Link>}
        marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}
      >
        Chúng tôi thay đổi để phục vụ bạn tốt hơn. Phiên bản alpha 2.0 ra mắt
      </NoticeBar>

      {children}

      <ScrollToTopBtn/>

      <style jsx>{styles}</style>
    </div>
  )
}

MainLayout.propTypes = {}

export default MainLayout
