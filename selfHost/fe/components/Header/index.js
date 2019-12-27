import React from 'react'
import Link from 'next/link'
import styles from './styles'

const Header = props => {
  return (
    <header className={'site-header'}>
      <div className={'title-container'}>
        <div className={'site-title'}>
          <Link href='/' as={'/'}>
            <a>Confession</a>
          </Link>
        </div>
        <p className={'tagline'}>Nơi chia sẻ nhưng tâm sự thầm kín</p>
      </div>

      <style jsx>{styles}</style>
    </header>
  )
}

export default Header
