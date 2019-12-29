import React, { useState } from 'react'
import Link from 'next/link'
import styles from './styles'

const Header = () => {

  const [mobileShow, setMobileShow] = useState(false)

  return (
    <header className={'header'}>
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
                Docs
              </a>
              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item" href="">
                  Overview
                </a>
                <a className="navbar-item" href="">
                  Modifiers
                </a>

                <hr className="navbar-divider"/>
                <div className="navbar-item">
                  Version 0.8.0
                </div>
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
