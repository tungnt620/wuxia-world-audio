import React from 'react'
import styles from './styles'
import ScrollToTopBtn from '../../ScrollToTopBtn'

const MainLayout = ({ children }) => {

  return (
    <div className={'container'}>
      {children}

      <ScrollToTopBtn/>

      <style jsx>{styles}</style>
    </div>
  )
}

export default MainLayout
