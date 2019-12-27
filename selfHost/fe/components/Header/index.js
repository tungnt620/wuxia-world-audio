import React from 'react'
import Link from 'next/link'
import styles from './styles'

const Header = () => {
  return (
    <header className={'site-header'}>
      <div className={'title-container'}>
        <div className={'site-title'}>
          <Link href='/' as={'/'}>
            <a>Demo</a>
          </Link>
        </div>
      </div>

      <style jsx>{styles}</style>
    </header>
  )
}

export default Header
