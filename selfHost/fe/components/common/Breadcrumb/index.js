import React from 'react'
import styles from './styles'

const Breadcrumb = (
  {
    paths = [
      {
        link: '/',
        name: 'Truyện',
        icon: <i className="fas fa-book" aria-hidden="true"></i>
      }, {
        link: '/',
        name: 'Tiên hiệp',
        icon: <i className="fas fa-book" aria-hidden="true"></i>
      }, {
        link: '/',
        name: 'Mục thần ký',
      },
    ]
  }
) => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {
          paths.map((path, index) => {
            const isLastPath = index === paths.length - 1

            return (
              <li key={path.name} className={isLastPath ? 'is-active' : ''}>
                <a href="#">
                  {
                    path.icon && <span className="icon is-small">{path.icon}</span>
                  }
                  <span>{path.name}</span>
                </a>
              </li>
            )
          })
        }
      </ul>

      <style jsx>{styles}</style>
    </nav>

  )
}

export default Breadcrumb
