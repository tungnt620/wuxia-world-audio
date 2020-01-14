import React, { useState } from 'react'
import Link from 'next/link'
import styles from './styles'

const Header = (
  {
    cats = [
      {
        id: 1,
        name: 'Tiên hiệp',
        slug: 'tien-hiep',
      }
    ]
  }
) => {
  const [mobileShow, setMobileShow] = useState(false)

  return (
    <header className={'header container'}>
      <nav className="navbar is-light">
        <div className="navbar-brand">
          <a className="navbar-item logo" href="/">
            AudioCuaTui
          </a>
          <div
            className={`navbar-burger burger ${mobileShow ? 'is-active' : ''}`}
            onClick={() => setMobileShow(!mobileShow)}
          >
            <span/><span/><span/>
          </div>
        </div>

        <div className={`navbar-menu ${mobileShow ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <a className="navbar-item" href="">
              Home
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="">
                Thể loại
              </a>
              <div className="navbar-dropdown is-boxed">
                {
                  cats.map((cat) => (
                    <a key={cat.id} className="navbar-item" href="">
                      {cat.name}
                    </a>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{styles}</style>
    </header>
  )
}

export default Header
