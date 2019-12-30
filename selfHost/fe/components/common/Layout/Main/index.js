import React from 'react'
import styles from './styles'
import ScrollToTopBtn from '../../ScrollToTopBtn'

const MainLayout = ({ children }) => {

  return (
    <main className={'container'}>
      {children}

      <ScrollToTopBtn/>

      <style jsx>{styles}</style>
    </main>
  )
}

export default MainLayout
